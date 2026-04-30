import { STORIES } from "@/constants/constants";
import { COLORS } from "@/constants/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackCardItem from "./StackCardItem";
const AnimationStackCard = () => {
  const [actualIndex, setActualIndex] = useState(STORIES.length - 1);

  return (
    <View className="flex-1 pt-60 my-12">
      <GestureHandlerRootView className=" flex-1">
        <View className="flex-1 justify-center items-center ">
          {[...STORIES].reverse().map((item, index) => (
            <StackCardItem
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              actualIndex={actualIndex}
              setActualIndex={setActualIndex}
            />
          ))}
        </View>
      </GestureHandlerRootView>

      <View className="flex-1 items-center mt-32 mx-12 gap-4  ">
        <View className="items-center bg-white w-full  py-8 justify-center  rounded-3xl">
          <Text className="font-bold text-3xl text-secondary">
            Review Title Goes here.
          </Text>
          <Text className=" text-lg text-secondary">
            Juan Dela Cruz • April 6, 2026
          </Text>
        </View>
        <View className=" flex-2 flex-row justify-between items-center bg-white w-full  py-3 px-8 rounded-3xl">
          <View>
            <Text className="text-lg">Name</Text>
            <View className="flex-row gap-2">
              <Ionicons name="star" size={16} color={COLORS.primary} />
              <Text>4.1 (9k+)</Text>
            </View>
          </View>

          <View className="flex-row gap-4">
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={COLORS.secondary}
            />
            <FontAwesome5 name="share" size={24} color={COLORS.secondary} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnimationStackCard;
