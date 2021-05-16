import Axios from 'axios';

const NETPIE_URL=`https://api.netpie.io/v2/device`
const CLIENT_ID=`e97157c7-82cb-47af-818f-a51a7ea9412d`
const TOKEN=`iNjQcUqzU7KkYZooRa2pgdxXwCLRjV46`

export const netpie = Axios.create({
  baseURL: NETPIE_URL,
});

netpie.interceptors.request.use(
  (req) => {
    if (!req.headers.Authorization) {
      req.headers.Authorization = `Device ${CLIENT_ID}:${TOKEN}`
      return req
    } else return req
  },
  (error) => Promise.reject(error)
)