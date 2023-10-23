import React, {useRef, useEffect} from 'react';
import {
  StatusBar,
  Modal,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ModalProviderProps, RoundedProps} from './types';
import useStyle from './styles';
import {ModalContext, useModal} from './context';
import MaskedView from '@react-native-masked-view/masked-view';
import Squircle from 'react-native-squircle';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const Rounded = ({children, radius, style}: RoundedProps) => {
  return (
    <MaskedView style={style} maskElement={<Squircle borderRadius={radius} />}>
      {children}
    </MaskedView>
  );
};

const Provider = ({children, backgroundColor}: ModalProviderProps) => {
  const {readModal, closeModal} = useModal();
  const modalState = readModal();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = useStyle(modalState.detent, backgroundColor);

  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue:
        modalState.isPresented && modalState.detent === 'medium' ? 0.88 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [modalState.detent, modalState.isPresented, opacity]);

  const scaleX = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(scaleX, {
      toValue:
        modalState.isPresented && modalState.detent !== 'small'
          ? (1 / WINDOW_WIDTH) * (WINDOW_WIDTH - 24 * 2)
          : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [modalState.detent, modalState.isPresented, scaleX]);

  const scaleY = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(scaleY, {
      toValue:
        modalState.isPresented && modalState.detent !== 'small'
          ? (1 / WINDOW_HEIGHT) * (WINDOW_HEIGHT - safeAreaInsets.top * 2)
          : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [scaleY, safeAreaInsets.top, modalState.isPresented, modalState.detent]);

  const renderAnimatedView = () => (
    <Animated.View
      style={
        modalState.isPresented && modalState.detent !== 'small'
          ? styles.safeAreaPresented
          : styles.safeAreaDefault
      }>
      <Animated.View
        style={{
          transform: [{scaleX: scaleX}, {scaleY: scaleY}],
          opacity,
        }}>
        <Rounded radius={8}>{children}</Rounded>
      </Animated.View>
    </Animated.View>
  );

  return (
    <View style={styles.containerStyle}>
      {renderAnimatedView()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalState.isPresented}>
        <SafeAreaView style={styles.safeAreaModal}>
          <StatusBar animated barStyle={modalState.statusBarColor} />
          <TouchableOpacity onPress={closeModal} style={styles.bufferStyle} />
          <Rounded radius={8} style={styles.maskStyle}>
            {modalState.node}
          </Rounded>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export const ModalProvider = ({
  children,
  backgroundColor,
  debug,
}: ModalProviderProps) => {
  return (
    <ModalContext debug={debug}>
      <Provider children={children} backgroundColor={backgroundColor} />
    </ModalContext>
  );
};

export {useModal};
