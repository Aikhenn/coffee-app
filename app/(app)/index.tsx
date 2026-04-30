import AnimationStackCard from "@/components/AnimationStackCard";
import { COLORS } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export default function Index() {
  const { height } = Dimensions.get("window");

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  return (
    <LinearGradient
      colors={["#FAD8B3", "#EFE9E2"]}
      locations={[0, 0.2]}
      className="flex-1 "
    >
      <View className="top-20 left-10 right-10 absolute z-10 flex-row justify-between items-center">
        <Text className="text-4xl font-bold text-secondary">For You</Text>

        <Ionicons
          name="notifications-circle-outline"
          size={40}
          color={COLORS.secondary}
        />
      </View>

      <Animated.ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate={0.6}
        snapToAlignment="center"
        disableIntervalMomentum
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={{ height }}>
          <AnimationStackCard />
        </View>
        <View style={{ height }}>
          <AnimationStackCard />
        </View>

        <View style={{ height }}>
          <AnimationStackCard />
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}
