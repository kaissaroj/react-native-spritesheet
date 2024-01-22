import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Sprite, AnimatedSprite } from '@kaizer433/react-native-spritesheet';
import SpritSheetJSON from '../assets/spritesheet/ninja/spritesheet.json';
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
            source={require('../assets/spritesheet/ninja/spritesheet.png')}
            spriteSheetWidth={14670}
            spriteSheetHeight={601}
            width={524 * 0.5}
            height={565 * 0.5}
            frames={SpritSheetJSON?.frames ?? []}
            defaultAnimationName="ATTACK"
            animations={{
              ATTACK: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              CLIMB: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
              DEAD: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            }}
            inLoop={false}
            autoPlay={true}
          />
          <View style={styles.btnContainer}>
            <Button
              onPress={() =>
                animatedRef.current?.startAnimation('ATTACK', false)
              }
              color={'white'}
              title="ATTACK"
            />
            <Button
              onPress={() => animatedRef.current?.startAnimation('CLIMB')}
              title="CLIMB"
              color={'white'}
            />
            <Button
              onPress={() => animatedRef.current?.startAnimation('DEAD')}
              title="DEAD"
              color={'white'}
            />
            <Button
              onPress={() =>
                animatedRef.current?.startAnimation('RUN', true, 15)
              }
              title="RUN"
              color={'white'}
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
    backgroundColor: 'gray',
  },
  btnContainer: {
    marginTop: 50,
  },
});
