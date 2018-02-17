import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

const REDUX_PERSIST = {
  storage,
  debug: true,
  blacklist: ['router'],
};

export default REDUX_PERSIST;
