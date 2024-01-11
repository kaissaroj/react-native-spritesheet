# Sprite Component Library

## Description

This library provides a `Sprite` component for React Native applications, utilizing `react-native-reanimated` and `expo-image` for smooth and efficient sprite animations. It's designed to be easy to use and highly performant, making it suitable for various applications, including games and dynamic UIs.

## Installation

To use the Sprite component in your project, you'll need to have React Native set up. You can then install the library via npm:

```bash
npm install react-native-spritesheet
```

Or via yarn:

```bash
yarn add react-native-spritesheet
```

## Usage

Import the `Sprite` component from the library and use it in your React Native app:

```javascript
import Sprite from 'react-native-spritesheet';

// Your component
function MyComponent() {
  return (
    <Sprite
      source={require('./path-to-your-spritesheet.png')}
      frameWidth={200}
      frameHeight={200}
      spriteSheetWidth={4420}
      spriteSheetHeight={130}
      frames={yourFrameData}
    />
  );
}
```

## Props

The `Sprite` component accepts the following props:

- `source` (ImageSourcePropType): The source of the sprite sheet image.
- `frameWidth` (number): The width of a single frame in the sprite sheet.
- `frameHeight` (number): The height of a single frame in the sprite sheet.
- `spriteSheetWidth` (number): The total width of the sprite sheet.
- `spriteSheetHeight` (number): The total height of the sprite sheet.
- `frames` (Frame[]): An array of frame data, where each frame has a `filename`, `x`, `y`, `w`, and `h`.

## Methods

The `Sprite` component exposes the following method via a ref:

- `setCurrentFrameIndex(frameIndex: number)`: Sets the current frame to be displayed based on the frame index.

## Example

Here is a basic example of how to use the `Sprite` component:

```javascript
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import Sprite from 'react-native-spritesheet';
import SpritSheetJSON from './path-to-your-spritesheet.json';

export default function App() {
  const spriteRef = useRef(null);

  const handlePress = () => {
    spriteRef.current?.setCurrentFrameIndex(1);
  };

  return (
    <View>
      <Sprite
        ref={spriteRef}
        source={require('./path-to-your-spritesheet.png')}
        frameWidth={200}
        frameHeight={200}
        spriteSheetWidth={4420}
        spriteSheetHeight={130}
        frames={SpritSheetJSON.frames}
      />
      <Button title="Change Frame" onPress={handlePress} />
    </View>
  );
}
```

## Contributing

Contributions to the library are welcome. Please read the contributing guidelines before submitting your pull request.

## License

This library is licensed under MIT.
