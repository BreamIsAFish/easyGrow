import Axios from 'axios';

export const netpie = Axios.create({
  baseURL: 'https://api.netpie.io/v2/device',
});
