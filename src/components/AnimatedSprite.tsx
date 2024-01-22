import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { View, type ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface Frame {
  filename: string;
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface AnimatedSprite {
  startAnimation: (
    animationName: string,
    loop?: boolean,
    customFrameRate?: number
  ) => void;
  getCurrentAnimationName: () => string;
}
interface AnimatedSpriteProps {
  source: ImageSourcePropType;
  spriteSheetWidth: number;
  spriteSheetHeight: number;
  frameRate?: number;
  width: number;
  height: number;
  frames: Frame[];
  defaultAnimationName: string;
  animations: Record<string, number[]>;
  inLoop?: boolean;
  autoPlay?: boolean;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const AnimatedSprite = forwardRef<AnimatedSprite, AnimatedSpriteProps>(
  (props, ref) => {
    const {
      source,
      spriteSheetWidth,
      spriteSheetHeight,
      frameRate = 10,
      width,
      height,
      frames,
      inLoop = false,
      autoPlay = false,
      animations,
      defaultAnimationName,
    } = props;
    const currentAnimationName = useSharedValue(defaultAnimationName);
    const frameIndex = useSharedValue<any>(0);

    const ToggleAnimation = useCallback(
      (animationName: string, loop = false, customFrameRate = 10) => {
        if (!animations[animationName]) {
          console.warn(`Invalid animation name: ${animationName}`);
          return;
        }
        currentAnimationName.value = animationName;
        const selectedFramesIndices = animations[animationName] ?? [];
        console.log(
          'selectedFramesIndices',
          selectedFramesIndices,
          animationName,
          currentAnimationName.value
        );

        const animationsSequence = selectedFramesIndices.map((_, index) =>
          withTiming(index, {
            duration: 1000 / customFrameRate,
            easing: Easing.linear,
          })
        ) as unknown as Parameters<typeof withSequence>;

        const numberOfReps = loop ? -1 : 1;
        frameIndex.value = withRepeat(
          withSequence(...animationsSequence),
          numberOfReps,
          false
        );
      },
      [animations, currentAnimationName, frameIndex]
    );
    useImperativeHandle(
      ref,
      () => ({
        startAnimation: (
          animationName: string,
          loop = false,
          customFrameRate = 10
        ) => {
          ToggleAnimation(animationName, loop, customFrameRate);
        },
        getCurrentAnimationName: () => currentAnimationName.value,
      }),
      [ToggleAnimation, currentAnimationName.value]
    );

    useEffect(() => {
      if (autoPlay) {
        ToggleAnimation(defaultAnimationName, inLoop, frameRate);
      }
    }, [
      ToggleAnimation,
      autoPlay,
      defaultAnimationName,
      frameRate,
      inLoop,
      ref,
    ]);
    const animatedStyle = useAnimatedStyle(() => {
      const selectedFrames =
        animations[currentAnimationName.value]?.map((index) => frames[index]) ??
        [];
      const index = Math.floor(frameIndex.value ?? 0);
      const frame = selectedFrames[index]?.frame;
      if (!frame) {
        return {};
      }

      // Calculate the scale factors
      const scaleX = width / frame.w;
      const scaleY = height / frame.h;

      const positionX = frame.x * scaleX;
      const positionY = frame.y * scaleY;

      return {
        width: spriteSheetWidth * scaleX, // The scaled sprite sheet width
        height: spriteSheetHeight * scaleY, // The scaled sprite sheet height
        transform: [
          // Translate to the position of the frame
          { translateX: -positionX },
          { translateY: -positionY },
        ],
      };
    });
    return (
      <View
        style={[
          {
            width,
            height,
          },
          styles.container,
        ]}
      >
        <AnimatedImage
          source={source}
          style={animatedStyle}
          contentFit="cover"
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default React.memo(AnimatedSprite);
