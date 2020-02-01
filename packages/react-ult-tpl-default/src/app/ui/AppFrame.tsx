import React, {useCallback} from 'react';
import {Styles, View, Text} from 'react-ult';
import {useDispatch} from 'react-redux';
import {Colors} from 'theme';
import {events} from 'app';

export function AppFrame() {
  const dispatch = useDispatch();
  const layout = useCallback(events.onLayout(dispatch), []);
  return (
    <View style={styles.root} onLayout={layout}>
      <Text>It works!</Text>
    </View>
  );
}

export const styles = {
  root: Styles.View({
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
  }),
};
