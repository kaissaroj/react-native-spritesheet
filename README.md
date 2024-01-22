# Sprite Component Library

## Description

This library provides `Sprite` and `AnimatedSprite` components for React Native applications, utilizing `react-native-reanimated` and `expo-image` for smooth and efficient sprite animations. It's designed to be user-friendly and performant (60FPS), making it ideal for various applications like games and dynamic UIs.

<div style="display: flex; justify-content: space-around; align-items: center;">
  <figure>
    <img src='https://i.imgur.com/7LKbiQ2.gif' width='225' alt='Sprite Animation'>
    <figcaption>Animated Sprite Example</figcaption>
  </figure>
  
  <figure>
    <img src='https://i.imgur.com/kmste9n.gif' width='225' alt='Animated Sprite'>
    <figcaption>Sprite Example</figcaption>
  </figure>
</div>

## Installation

To use the components in your project, ensure you have React Native set up. Install the library via npm:

```bash
npm install @kaizer433/react-native-spritesheet
```

Or via yarn:

```bash
yarn add @kaizer433/react-native-spritesheet
```

## Usage

### Sprite Component

Import the `Sprite` component from the library and use it in your React Native app:

```javascript
import { Sprite } from '@kaizer433/react-native-spritesheet';

// Your component
function MyComponent() {
  return (
    <Sprite
      source={require('./path-to-your-spritesheet.png')}
      width={200}
      height={200}
      spriteSheetWidth={4420}
      spriteSheetHeight={130}
      frames={yourFrameData}
    />
  );
}
```

### AnimatedSprite Component

Import the `AnimatedSprite` component for more complex animations:

```javascript
import { AnimatedSprite } from '@kaizer433/react-native-spritesheet';

function MyAnimatedComponent() {
  return (
    <AnimatedSprite
      source={require('../assets/spritesheet/sprite/spritesheet.png')}
      spriteSheetWidth={4420}
      spriteSheetHeight={130}
      width={250}
      height={250}
      frames={SpritSheetJSON?.frames ?? []}
      defaultAnimationName="IDLE"
      animations={{
        IDLE: [10, 11, 12, 13, 14, 15, 16],
        ATTACK: [0, 1, 2, 3, 4, 5, 6],
        JUMP: [17, 18, 19, 20, 21, 22, 23, 24, 25],
        RUN: [27, 28, 29, 30, 31, 32, 33, 34],
        DIE: [7, 8, 9],
      }}
      inLoop={true}
      autoPlay={true}
    />
  );
}
```

## Props

### Sprite Component

- `source` (ImageSourcePropType): The source of the sprite sheet image.
- `width` (number): The width of a single frame in the sprite sheet.
- `height` (number): The height of a single frame in the sprite sheet.
- `spriteSheetWidth` (number): The total width of the sprite sheet.
- `spriteSheetHeight` (number): The total height of the sprite sheet.
- `frames` (Frame[]): An array of frame data, where each frame has a `filename`, `x`, `y`, `w`, and `h`.

### AnimatedSprite Component

- Inherits all props from the Sprite component.
- `defaultAnimationName` (string): The name of the default animation to play.
- `animations` (Record<string, number[]>): Object mapping animation names to frame indices.
- `inLoop` (boolean): Whether the animation should loop.
- `autoPlay` (boolean): Whether the animation should start automatically.
- `frameRate (number)`: Speed at which the animation frames are displayed.

## Methods

### Sprite Component

- `setCurrentFrameIndex(frameIndex: number)`: Sets the current frame to be displayed based on the frame index.

### AnimatedSprite Component

- `startAnimation(animationName: string, loop?: boolean, frameRate?: number)`: Starts the animation with the given name. `loop` determines if the animation should loop.
- `getCurrentAnimationName()`: Returns the name of the current animation.

## Example

For example check this [expo project](https://github.com/kaissaroj/react-native-spritesheet/tree/main/example)

```

## Contributing

Contributions to the library are welcome. Please read the contributing guidelines before submitting your pull request.

## License

This library is licensed under the MIT License.
```
