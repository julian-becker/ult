import * as App from 'app/lib/types';

export function resize(state: App.Store, action: App.Resize) {
  const {width, height} = action.payload;
  state.viewport = {width, height};
}
