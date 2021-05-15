import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { netpie } from '../axiosConfig';

export default function App() {
  const [humid, setHumid] = useState<number>(1);
  const [light, setLight] = useState<number>(1);
  const [temp, setTemp] = useState<number>(1);

  const fetchData = useCallback(() => {
    netpie
      .get<any>('/shadow/data')
      .then(({ data }) => {
        setHumid(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
