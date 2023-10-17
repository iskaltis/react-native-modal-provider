import React from 'react';
import {ContextInterface, ModalContextInterface, ModalState} from './types';

const Context = React.createContext({} as ContextInterface);

const initialState: ModalState = {
  isPresented: false,
  detent: 'medium',
};

export const ModalContext = ({
  children,
  debug = false,
}: ModalContextInterface): JSX.Element => {
  const [state, setState] = React.useState(initialState);

  const log = (message: string) => {
    if (debug) {
      console.log(message);
    }
  };

  return (
    <Context.Provider value={{state, setState, log}}>
      {children}
    </Context.Provider>
  );
};

export const useModal = () => {
  const {state, setState, log} = React.useContext(Context);

  const openModal = (content: ModalState) => {
    setState({
      ...state,
      ...content,
      isPresented: true,
    });
    log('[LOG] ModalProvider has opened node.');
  };

  const readModal = () => state;

  const updateModal: <K extends keyof ModalState>(update: {
    key: K;
    value: ModalState[K];
  }) => void = ({key, value}) => {
    setState({
      ...state,
      [key]: value,
    });
    log(
      `[LOG] ModalProvider state updated with value: ${value}, for key: ${key}.`,
    );
  };

  const closeModal = () => {
    setState(initialState);
    log('[LOG] ModalProvider has closed modal.');
  };

  return {state, openModal, readModal, updateModal, closeModal};
};
