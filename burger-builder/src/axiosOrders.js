import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-d06d2.firebaseio.com/'
});

export default instance;