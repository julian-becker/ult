import React from 'react';
import {App, UserInterface} from 'react-ult';
import {Provider} from 'react-redux';
import {PRODUCTION} from 'config';
import {store} from 'store';
import {AppFrame} from 'app/ui/AppFrame';

App.initialize(!PRODUCTION, !PRODUCTION);
UserInterface.useCustomScrollbars(true);
UserInterface.setMainView(
  <Provider store={store}>
    <AppFrame/>
  </Provider>
);
