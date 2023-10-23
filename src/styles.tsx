import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DetentProps} from './types';

const useStyle = (detent: DetentProps, backgroundColor: string = 'black') => {
  const safeAreaInsets = useSafeAreaInsets();
  return StyleSheet.create({
    containerStyle: {flex: 1, backgroundColor: backgroundColor},
    bufferStyle: {flex: detent === 'small' ? 1 : 0},
    safeAreaDefault: {
      flex: 1,
    },
    safeAreaPresented: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    safeAreaModal: {
      flex: detent === 'small' ? 'auto' : 1,
      marginTop: detent === 'medium' ? safeAreaInsets.top + 12 : 0,
    },
    maskStyle: {
      flex: 1,
    },
  });
};

export default useStyle;
