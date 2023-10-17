# React Native Modal Provider

React Native Modal Provider is a flexible and customizable modal provider for React Native applications. It allows you to easily manage modals with different detents (small, medium, large) while providing a smooth and visually appealing user experience.

![Animated photo of the Modal Provider.](gif.gif)

## Installation

To install the React Native Modal Provider in your project, follow these steps:

1. Add the package to your project using:

```bash
npm install git+https://github.com/thordotcomputer/react-native-modal-provider.git
```

or

```bash
yarn add git+https://github.com/thordotcomputer/react-native-modal-provider.git
```

2. Import and use the Modal Provider in your React Native code:

```javascript
import { ModalProvider } from 'react-native-modal-provider';

// Wrap your app with the ModalProvider component
<ModalProvider>
    {/* Your app content goes here */}
</ModalProvider>
```

## Usage

The Modal Provider allows you to easily manage modals in your React Native application. You can control the presentation and behavior of modals using the provided hooks and components.

**Opening a Modal**
To open a modal with custom content and a specific detent, you can use the `openModal` function as shown in the example above. Replace `CustomModalContent` with your actual modal content component.

```javascript
import { useModal } from 'react-native-modal-provider';

// Example of opening a modal
const { openModal } = useModal();

// Open a modal with custom content and detent
openModal({
isPresented: true,
detent: 'medium',
node: <CustomModalContent />,
});
```

**Retrieving the Current Modal State**
To retrieve the current modal state, you can use the readModal function as follows:

```javascript
import { useModal } from 'react-native-modal-provider';

// Example of reading the current modal state
const { readModal } = useModal();

// Get the current modal state
const modalState = readModal();

// You can now access properties of the modal state like modalState.isPresented, modalState.detent, etc.
```

**Updating the Modal State**
To update the modal state with a provided key-value pair, you can use the `updateModal` function like this:

```javascript
import { useModal } from 'react-native-modal-provider';

// Example of updating the modal state
const { updateModal } = useModal();

// Update the modal state with a new value for a specific key
updateModal({ key: 'detent', value: 'large' });

// This will update the 'detent' property of the modal state to 'large'
```

**Closing the Current Modal**
To close the currently open modal, you can use the `closeModal` function as shown below:

```javascript
import { useModal } from 'react-native-modal-provider';

// Example of closing the current modal
const { closeModal } = useModal();

// Close the currently open modal
closeModal();
```

These examples demonstrate how to use each function provided by the React Native Modal Provider. You can adapt them to your specific use case and component names.

## Customization

The Modal Provider is highly customizable. You can adjust the appearance and behavior of modals by modifying the provided styles, or by creating your own components and using the context.

## API Reference

### ModalProvider

#### Properties

| Name              | Description                                                                 | Optional |
| ----------------- | --------------------------------------------------------------------------- | -------- |
| `backgroundColor` | Customize the background color of the area behind the modal when presented. | Optional |
| `debug`           | Enable debugging logs for methods in the Modal Provider.                    | Optional |

### useModal

A hook for managing modals. Provides functions to open, read, update, and close modals.

#### Methods

| Name                                               | Description                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| `openModal(content: ModalState)`                   | Opens a modal with the specified content and detent.      |
| `readModal()`                                      | Retrieves the current modal state.                        |
| `updateModal(update: { key: string; value: any })` | Updates the modal state with the provided key-value pair. |
| `closeModal()`                                     | Closes the currently open modal.                          |