import * as App from 'app/lib/types';

export function activate(state: App.Store, action: App.Activate) {
  const {active} = action.payload;
  state.active = active;
}

export function resize(state: App.Store, action: App.Resize) {
  const {width, height} = action.payload;
  state.viewport = {width, height};
}
