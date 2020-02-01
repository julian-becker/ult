import {Platform, UserInterface} from 'react-ult';

const _platformOS = Platform.getType();
const _isRetinaScreen = UserInterface.isHighPixelDensityScreen();

export function isTouch() {
  switch (_platformOS) {
    case 'android': return true;
    case 'ios': return true;
    case 'macos': return false;
    case 'windows': return false;
    case 'web': return navigator && navigator.maxTouchPoints > 0;
    default: return false;
  }
}

export function isWeb() {
  return _platformOS === 'web';
}

export function isAndroid() {
  return _platformOS === 'android';
}

export function isIOS() {
  return _platformOS === 'ios';
}

export function isMacOS() {
  return _platformOS === 'macos';
}

export function isWindows() {
  return _platformOS === 'windows';
}

export function isNative() {
  return isAndroid() || isIOS() || isMacOS() || isWindows();
}

export function isRetinaScreen() {
  return _isRetinaScreen;
}
