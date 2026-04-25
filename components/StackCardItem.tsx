import { STORIES } from "@/constants/constants";
import { ImageBackground } from "expo-image";
import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_SIZE = width - 100;

const StackCardItem = ({ item, index, actualIndex, setActualIndex }: any) => {
  const position = useSharedValue({ x: 0, y: 0 });

  const value = useSharedValue(STORIES.length);
  const flip = useSharedValue(0);
  const isFinalCard = index === actualIndex && actualIndex === 0;

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {
      // flip instead of going next
      if (isFinalCard) {
        flip.value = withTiming(flip.value === 0 ? 1 : 0, {
          duration: 500,
        });

        return;
      }

      // existing behavior
      if (index === actualIndex && actualIndex > 0) {
        position.value = withTiming(
          {
            x: -width * 1.5,
            y: 0,
          },
          {},
          () => {
            runOnJS(setActualIndex)(actualIndex - 1);
          },
        );
      }
    });
  const panGestureHandler = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({ translationX, translationY }) => {
      const isActive = index === actualIndex;

      if (!isActive) return;

      // Allow current card to move only when swiping left
      if (translationX < 0) {
        position.value = {
          x: translationX,
          y: translationY,
        };
      } else {
        position.value = {
          x: 0,
          y: 0,
        };
      }
    })
    .onEnd(({ translationX }) => {
      const swipeLeft = translationX < -100;
      const swipeRight = translationX > 100;

      if (swipeLeft && index === actualIndex && actualIndex > 0) {
        position.value = withTiming(
          {
            x: -width * 1.5,
            y: position.value.y,
          },
          {},
          () => {
            runOnJS(setActualIndex)(actualIndex + 1);
          },
        );

        return;
      }

      if (
        swipeRight &&
        index === actualIndex &&
        actualIndex < STORIES.length - 1
      ) {
        runOnJS(setActualIndex)(actualIndex + 1);
        return;
      }

      position.value = withSpring({ x: 0, y: 0 });
    });

  const gesture = Gesture.Exclusive(panGestureHandler, tapGesture);

  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 8, -8, 0],
      Extrapolation.CLAMP,
    );
  });

  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 30, -30, 0],
      Extrapolation.CLAMP,
    );
  });

  const scale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolation.CLAMP,
    );
  });

  const rnStyle = useAnimatedStyle(() => {
    const isActive = index === actualIndex;
    const isPrevious = index === actualIndex + 1;

    return {
      zIndex: isActive ? 100 : index,
      opacity: index <= actualIndex + 1 ? 1 : 0,
      transform: [
        {
          rotateZ: `${rotate.value}deg`,
        },
        {
          translateX: isPrevious
            ? -width * 1.5
            : isActive
              ? position.value.x + additionalTranslate.value
              : additionalTranslate.value,
        },
        {
          translateY: isActive ? position.value.y : 0,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flip.value, [0, 1], [0, 180]);

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flip.value, [0, 1], [180, 360]);

    return {
      position: "absolute",
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  useEffect(() => {
    value.value = withSpring(actualIndex, {
      damping: 10,
      stiffness: 100,
    });

    if (index === actualIndex) {
      position.value = withSpring({ x: 0, y: 0 });
    }
  }, [actualIndex]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[{ zIndex: actualIndex + 1 }, rnStyle]}
        className="absolute flex-1 items-center justify-center px-6 py-6"
      >
        <View
          className="rounded-2xl overflow-hidden shadow-md"
          style={{ width: CARD_SIZE, height: CARD_SIZE }}
        >
          {/* FRONT */}
          <Animated.View style={frontStyle}>
            <ImageBackground
              source={item.image}
              style={{ width: CARD_SIZE, height: CARD_SIZE }}
              imageStyle={{ borderRadius: 16 }}
            >
              <View className="flex-1 justify-end">
                <View className="py-4 px-3">
                  <Text className="text-white font-semibold">{item.title}</Text>
                </View>
              </View>
            </ImageBackground>
          </Animated.View>

          {/* BACK (WHITE CARD) */}
          <Animated.View
            style={[
              {
                width: CARD_SIZE,
                height: CARD_SIZE,
                backgroundColor: "white",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
              },
              backStyle,
            ]}
          >
            <Text className="text-black font-semibold">Card Back</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default StackCardItem;
