import {createReducer, createAction} from 'react-ult';
import {Store} from 'types';
import * as App from 'app/lib/types';
import * as reducers from 'app/lib/reducers';
import * as events from 'app/lib/events';
import * as utils from 'app/lib/utils';

export const initial: App.Store = {
  viewport: {
    width: -1,
    height: -1,
  },
};

export const selectors = {
  getViewport: (store: Store) => store.app.viewport,
};

export const actions = {
  resize: createAction('app/resize', (e: App.Resize) => e),
};

export const reducer = createReducer(initial, {
  [actions.resize.type]: reducers.resize,
});

export {events, utils};
export default reducer;
