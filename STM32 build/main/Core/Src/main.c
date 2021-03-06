/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * <h2><center>&copy; Copyright (c) 2021 STMicroelectronics.
  * All rights reserved.</center></h2>
  *
  * This software component is licensed by ST under BSD 3-Clause license,
  * the "License"; You may not use this file except in compliance with the
  * License. You may obtain a copy of the License at:
  *                        opensource.org/licenses/BSD-3-Clause
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
#define QUEUE_CAPACITY 10
typedef struct Myqueue {
	uint32_t mCap;
	uint32_t mSize;
	uint32_t mFront;
	uint32_t mData[QUEUE_CAPACITY];
	uint32_t mSum;
	uint32_t mAvg;
} myqueue;
/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define MESSAGE_LENGHT          50
#define AUTO_MIN_HUMID_PUMP_ON  30
#define AUTO_MAX_HUMID_PUMP_OFF 70
#define AUTO_MIN_LIGHT_ON       35
#define AUTO_MAX_LIGHT_OFF      45
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
ADC_HandleTypeDef hadc1;

UART_HandleTypeDef huart1;
UART_HandleTypeDef huart2;

/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART2_UART_Init(void);
static void MX_ADC1_Init(void);
static void MX_USART1_UART_Init(void);
/* USER CODE BEGIN PFP */
void Init_MyQueue(myqueue *q);
void Myqueue_Add(myqueue *q, uint32_t value);
uint32_t Humid_Calibrate(uint32_t value);
uint32_t Light_Calibrate(uint32_t value);
uint32_t Temperature_Calibrate(uint32_t value);
uint32_t Myqueue_GetAvg(myqueue *q);
/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
char buffer[MESSAGE_LENGHT];
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{
  /* USER CODE BEGIN 1 */
  myqueue humid, light, temperature;
  uint32_t inAutoPumpOn = 0;
  uint32_t inAutoLightOn = 0;
  uint32_t analog_humid = 0;
  uint32_t analog_light = 0;
  uint32_t analog_temperature = 0;
  uint32_t calibrated_humid = 0;
  uint32_t calibrated_light = 0;
  uint32_t calibrated_temperature = 0;
  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */
  Init_MyQueue(&humid);
  Init_MyQueue(&light);
  Init_MyQueue(&temperature);
  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART2_UART_Init();
  MX_ADC1_Init();
  MX_USART1_UART_Init();
  /* USER CODE BEGIN 2 */

  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    HAL_ADC_Start(&hadc1);

	HAL_ADC_PollForConversion(&hadc1, 1);
	analog_humid = HAL_ADC_GetValue(&hadc1);

	HAL_ADC_PollForConversion(&hadc1, 1);
	analog_light = HAL_ADC_GetValue(&hadc1);

	HAL_ADC_PollForConversion(&hadc1, 1);
	analog_temperature = HAL_ADC_GetValue(&hadc1);

	HAL_ADC_Stop(&hadc1);


	Myqueue_Add(&humid, analog_humid);
	Myqueue_Add(&light, analog_light);
	Myqueue_Add(&temperature, analog_temperature);


	calibrated_humid = Humid_Calibrate(Myqueue_GetAvg(&humid));
	calibrated_light = Light_Calibrate(Myqueue_GetAvg(&light));
	calibrated_temperature = Temperature_Calibrate(Myqueue_GetAvg(&temperature));

//	calibrated_humid = Myqueue_GetAvg(&humid);
//	calibrated_light = Myqueue_GetAvg(&light);
//	calibrated_temperature = Myqueue_GetAvg(&temperature);


	if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_11) == GPIO_PIN_RESET) { //in Auto Pump Mode
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);//Auto mode LED on
	} else {
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);//Auto mode LED off
	}


//	if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12) == GPIO_PIN_RESET) {
//		sprintf(buffer, "PIN_12_RESET\n\r");
//		HAL_UART_Transmit(&huart2, buffer, strlen(buffer), 1000);
//		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_RESET);
//	} else {
//		sprintf(buffer, "PIN_12_SET\n\r");
//		HAL_UART_Transmit(&huart2, buffer, strlen(buffer), 1000);
//		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_SET);
//	}
	if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12) == GPIO_PIN_SET) {//if force Pump on
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_RESET);// Pump on
	} else {
		if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_11) == GPIO_PIN_SET) { //in Auto Pump Mode
			if ((inAutoPumpOn == 1) || (calibrated_humid <= AUTO_MIN_HUMID_PUMP_ON)) {
				HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_RESET);// Pump on
				inAutoPumpOn = 1;
				if (calibrated_humid >= AUTO_MAX_HUMID_PUMP_OFF) {
					HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_SET);// Pump off
					inAutoPumpOn = 0;
				}
			} else {
				HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_SET);// Pump off
				inAutoPumpOn = 0;
			}
		} else {
			HAL_GPIO_WritePin(GPIOA, GPIO_PIN_7, GPIO_PIN_SET); // force Pump off
		}
	}


	if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_8) == GPIO_PIN_SET) {
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_6, GPIO_PIN_RESET);// Lamp on
	} else {
		if ((inAutoLightOn == 1) || (calibrated_light <= AUTO_MIN_LIGHT_ON)) {//normally auto mode
			HAL_GPIO_WritePin(GPIOA, GPIO_PIN_6, GPIO_PIN_RESET);// Lamp on
			inAutoLightOn = 1;
			if (calibrated_light >= AUTO_MAX_LIGHT_OFF) {
				HAL_GPIO_WritePin(GPIOA, GPIO_PIN_6, GPIO_PIN_SET);// Lamp off
				inAutoLightOn = 0;
			}
		} else {
			HAL_GPIO_WritePin(GPIOA, GPIO_PIN_6, GPIO_PIN_SET);// Lamp off
			inAutoLightOn = 0;
		}
	}


	sprintf(buffer, "start\n");
	HAL_UART_Transmit(&huart1, buffer, strlen(buffer), 1000);
	HAL_Delay(10);

	sprintf(buffer, "Percent Humid = %d\n\r",calibrated_humid);
	HAL_UART_Transmit(&huart2, buffer, strlen(buffer), 1000);
	sprintf(buffer, "%d\n",calibrated_humid);
	HAL_UART_Transmit(&huart1, buffer, strlen(buffer), 1000);
	HAL_Delay(10);

	sprintf(buffer, "Percent Light = %d\n\r",calibrated_light);
	HAL_UART_Transmit(&huart2, buffer, strlen(buffer), 1000);
	sprintf(buffer, "%d\n",calibrated_light);
	HAL_UART_Transmit(&huart1, buffer, strlen(buffer), 1000);
	HAL_Delay(10);

	sprintf(buffer, "Temperature = %d\n\r",calibrated_temperature);
	HAL_UART_Transmit(&huart2, buffer, strlen(buffer), 1000);
	sprintf(buffer, "%d\n",calibrated_temperature);
	HAL_UART_Transmit(&huart1, buffer, strlen(buffer), 1000);

	//int tmp = temperature->mSum;
//	sprintf(buffer, "TemperatureSum = %d\n\r", tmp);
//	HAL_UART_Transmit(&huart2, buffer, strlen(buffer), 1000);
	HAL_Delay(1000);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);
  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSI;
  RCC_OscInitStruct.PLL.PLLM = 16;
  RCC_OscInitStruct.PLL.PLLN = 336;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV4;
  RCC_OscInitStruct.PLL.PLLQ = 4;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }
  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief ADC1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_ADC1_Init(void)
{

  /* USER CODE BEGIN ADC1_Init 0 */

  /* USER CODE END ADC1_Init 0 */

  ADC_ChannelConfTypeDef sConfig = {0};

  /* USER CODE BEGIN ADC1_Init 1 */

  /* USER CODE END ADC1_Init 1 */
  /** Configure the global features of the ADC (Clock, Resolution, Data Alignment and number of conversion)
  */
  hadc1.Instance = ADC1;
  hadc1.Init.ClockPrescaler = ADC_CLOCK_SYNC_PCLK_DIV4;
  hadc1.Init.Resolution = ADC_RESOLUTION_12B;
  hadc1.Init.ScanConvMode = ENABLE;
  hadc1.Init.ContinuousConvMode = ENABLE;
  hadc1.Init.DiscontinuousConvMode = DISABLE;
  hadc1.Init.ExternalTrigConvEdge = ADC_EXTERNALTRIGCONVEDGE_NONE;
  hadc1.Init.ExternalTrigConv = ADC_SOFTWARE_START;
  hadc1.Init.DataAlign = ADC_DATAALIGN_RIGHT;
  hadc1.Init.NbrOfConversion = 3;
  hadc1.Init.DMAContinuousRequests = DISABLE;
  hadc1.Init.EOCSelection = ADC_EOC_SINGLE_CONV;
  if (HAL_ADC_Init(&hadc1) != HAL_OK)
  {
    Error_Handler();
  }
  /** Configure for the selected ADC regular channel its corresponding rank in the sequencer and its sample time.
  */
  sConfig.Channel = ADC_CHANNEL_0;
  sConfig.Rank = 1;
  sConfig.SamplingTime = ADC_SAMPLETIME_480CYCLES;
  if (HAL_ADC_ConfigChannel(&hadc1, &sConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /** Configure for the selected ADC regular channel its corresponding rank in the sequencer and its sample time.
  */
  sConfig.Channel = ADC_CHANNEL_1;
  sConfig.Rank = 2;
  if (HAL_ADC_ConfigChannel(&hadc1, &sConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /** Configure for the selected ADC regular channel its corresponding rank in the sequencer and its sample time.
  */
  sConfig.Channel = ADC_CHANNEL_TEMPSENSOR;
  sConfig.Rank = 3;
  if (HAL_ADC_ConfigChannel(&hadc1, &sConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN ADC1_Init 2 */

  /* USER CODE END ADC1_Init 2 */

}

/**
  * @brief USART1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART1_UART_Init(void)
{

  /* USER CODE BEGIN USART1_Init 0 */

  /* USER CODE END USART1_Init 0 */

  /* USER CODE BEGIN USART1_Init 1 */

  /* USER CODE END USART1_Init 1 */
  huart1.Instance = USART1;
  huart1.Init.BaudRate = 9600;
  huart1.Init.WordLength = UART_WORDLENGTH_8B;
  huart1.Init.StopBits = UART_STOPBITS_1;
  huart1.Init.Parity = UART_PARITY_NONE;
  huart1.Init.Mode = UART_MODE_TX_RX;
  huart1.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart1.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart1) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART1_Init 2 */

  /* USER CODE END USART1_Init 2 */

}

/**
  * @brief USART2 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART2_UART_Init(void)
{

  /* USER CODE BEGIN USART2_Init 0 */

  /* USER CODE END USART2_Init 0 */

  /* USER CODE BEGIN USART2_Init 1 */

  /* USER CODE END USART2_Init 1 */
  huart2.Instance = USART2;
  huart2.Init.BaudRate = 115200;
  huart2.Init.WordLength = UART_WORDLENGTH_8B;
  huart2.Init.StopBits = UART_STOPBITS_1;
  huart2.Init.Parity = UART_PARITY_NONE;
  huart2.Init.Mode = UART_MODE_TX_RX;
  huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart2.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart2) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART2_Init 2 */

  /* USER CODE END USART2_Init 2 */

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOH_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOA, LD2_Pin|GPIO_PIN_6|GPIO_PIN_7, GPIO_PIN_RESET);

  /*Configure GPIO pin : B1_Pin */
  GPIO_InitStruct.Pin = B1_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(B1_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pins : LD2_Pin PA6 PA7 */
  GPIO_InitStruct.Pin = LD2_Pin|GPIO_PIN_6|GPIO_PIN_7;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

  /*Configure GPIO pins : PA8 PA11 PA12 */
  GPIO_InitStruct.Pin = GPIO_PIN_8|GPIO_PIN_11|GPIO_PIN_12;
  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

}

/* USER CODE BEGIN 4 */
void Init_MyQueue(myqueue *q)
{
	q->mCap = QUEUE_CAPACITY;
	q->mSize = 0;
	q->mFront = 0;
	q->mSum = 0;
	q->mAvg = 0;
}
void Myqueue_Add(myqueue *q, uint32_t value)
{
	if (q->mSize < q->mCap) {
		q->mData[q->mSize] = value;
		q->mSize += 1;
		q->mSum += value;
		q->mAvg = (q->mSum) / (q->mSize);
		return;
	}
	q->mSum -= q->mData[q->mFront];
	q->mSum += value;
	q->mData[q->mFront] = value;
	q->mFront = (q->mFront + 1) % (q->mCap);
	q->mAvg = (q->mSum) / (q->mCap);
}
uint32_t Myqueue_GetAvg(myqueue *q)
{
	return q->mAvg;
}
uint32_t Humid_Calibrate(uint32_t value)
{
	uint32_t max = 3700;
	uint32_t min = 3300;
	uint32_t range = max - min;
	if (value < min) value = min;
	if (value > max) value = max;
	return (max - value) * 100 / range;
}
uint32_t Light_Calibrate(uint32_t value)
{
	uint32_t max = 2700;
	uint32_t min = 300;
	uint32_t range = max - min;
	if (value < min) value = min;
	if (value > max) value = max;
	return (max - value) * 100 / range;
}
uint32_t Temperature_Calibrate(uint32_t value)
{
	uint32_t max = 4095;
	uint32_t min = 0;
	float tem_cons = 3.3/4095;
	if (value < min) value = min;
	if (value > max) value = max;
	return ((value*tem_cons - .76)/.0025) + 25;
}
/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */

/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
