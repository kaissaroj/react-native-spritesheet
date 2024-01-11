import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Sprite } from '@kaizer433/react-native-spritesheet';
import SpritSheetJSON from '../assets/spritesheet/sprite/spritesheet.json';
interface SpriteRef {
  setCurrentFrameIndex: (frameIndex: number) => void;
}
export default function App() {
  const ref = React.useRef<SpriteRef>(null);
  return (
    <View style={styles.container}>
      <Sprite
        ref={ref}
        source={require('../assets/spritesheet/sprite/spritesheet.png')}
        frameWidth={200}
        frameHeight={200}
        spriteSheetWidth={4420}
        spriteSheetHeight={130}
        frames={SpritSheetJSON?.frames ?? []}
      />
      <Button
        title="Play 1"
        onPress={() => ref.current?.setCurrentFrameIndex(1)}
      />
      <Button
        title="Play 2"
        onPress={() => ref.current?.setCurrentFrameIndex(2)}
      />
      <Button
        title="Play 3"
        onPress={() => ref.current?.setCurrentFrameIndex(3)}
      />
      <Button
        title="Play 4"
        onPress={() => ref.current?.setCurrentFrameIndex(4)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
