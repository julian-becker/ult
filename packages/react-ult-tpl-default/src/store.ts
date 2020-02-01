import {App, configureStore} from 'react-ult';
import {PRODUCTION} from 'config';
import app, {actions} from 'app';

export const store = configureStore({
  devTools: !PRODUCTION,
  middleware: [],
  reducer: {
    app,
  },
});

App.activationStateChangedEvent.subscribe(state => {
  const payload = {active: state === 1};
  store.dispatch(actions.activate({payload}));
});
