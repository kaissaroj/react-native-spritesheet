import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Sprite, AnimatedSprite } from '@kaizer433/react-native-spritesheet';
import SpritSheetJSON from '../assets/spritesheet/sprite/spritesheet.json';
interface SpriteRef {
  setCurrentFrameIndex: (frameIndex: number) => void;
}
interface AnimateSpriteRef {
  startAnimation: (
    animationName: string,
    loop?: boolean,
    customFrameRate?: number
  ) => void;
  getCurrentAnimationName: () => string;
}

export default function App() {
  const [active, setActive] = React.useState('ANIMATED');
  const ref = React.useRef<SpriteRef>(null);
  const animatedRef = React.useRef<AnimateSpriteRef>(null);

  return (
    <View>
      <View style={styles.container}>
        <Button onPress={() => setActive('ANIMATED')} title="Animated" />
        <Button onPress={() => setActive('SPRITE')} title="Sprite" />
      </View>
      {active === 'ANIMATED' ? (
        <View style={styles.screenContainer}>
          <AnimatedSprite
            ref={animatedRef}
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
          <View style={styles.btnContainer}>
            <Button
              onPress={() => animatedRef.current?.startAnimation('IDLE', true)}
              title="IDLE"
            />
            <Button
              onPress={() => animatedRef.current?.startAnimation('ATTACK')}
              title="ATTACK"
            />
            <Button
              onPress={() => animatedRef.current?.startAnimation('JUMP')}
              title="JUMP"
            />
            <Button
              onPress={() =>
                animatedRef.current?.startAnimation('RUN', true, 15)
              }
              title="RUN"
            />
          </View>
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <Sprite
            ref={ref}
            source={require('../assets/spritesheet/sprite/spritesheet.png')}
            width={300}
            height={300}
            spriteSheetWidth={4420}
            spriteSheetHeight={130}
            frames={SpritSheetJSON?.frames ?? []}
          />
          <Button
            title="Show 1"
            onPress={() => ref.current?.setCurrentFrameIndex(10)}
          />
          <Button
            title="Show 2"
            onPress={() => ref.current?.setCurrentFrameIndex(6)}
          />
          <Button
            title="Show 3"
            onPress={() => ref.current?.setCurrentFrameIndex(27)}
          />
          <Button
            title="Show 4"
            onPress={() => ref.current?.setCurrentFrameIndex(9)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  screenContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 50,
  },
});
