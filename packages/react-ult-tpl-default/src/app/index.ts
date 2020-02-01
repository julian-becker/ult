import {createReducer, createAction} from 'react-ult';
import {Store} from 'types';
import * as App from 'app/lib/types';
import * as reducers from 'app/lib/reducers';
import * as events from 'app/lib/events';
import * as utils from 'app/lib/utils';

export const initial: App.Store = {
  active: false,
  viewport: {
    width: -1,
    height: -1,
  },
};

export const selectors = {
  isActive: (store: Store) => store.app.active,
  getViewport: (store: Store) => store.app.viewport,
};

export const actions = {
  activate: createAction('app/activate', (action: App.Activate) => action),
  resize: createAction('app/resize', (action: App.Resize) => action),
};

export const reducer = createReducer(initial, {
  [actions.activate.type]: reducers.activate,
  [actions.resize.type]: reducers.resize,
});

export {events, utils};
export default reducer;
