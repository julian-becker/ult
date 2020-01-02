import {Dispatch} from 'redux';
import {ViewOnLayoutEvent} from 'react-ult/dist/common/Types';
import {actions} from 'app';

export function onLayout(dispatch: Dispatch) {
  return (e: ViewOnLayoutEvent) => {
    const {width, height} = e;
    const payload = {width, height};
    dispatch(actions.resize({payload}));
  }
}
