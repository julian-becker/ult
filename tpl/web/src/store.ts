import {configureStore} from 'react-ult';
import {PRODUCTION} from 'config';
import app from 'app';

export const store = configureStore({
  devTools: !PRODUCTION,
  middleware: [],
  reducer: {
    app,
  },
});
