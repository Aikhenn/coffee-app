import FeedCard from "@/components/FeedCard";
import { COLORS } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <LinearGradient
      colors={["#FAD8B3", "#EFE9E2"]}
      locations={[0, 0.2]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 mx-8 mt-6">
        <View className="flex-row justify-between">
          <Text className="mb-3 text-4xl font-bold text-secondary">
            For You
          </Text>
          <Ionicons
            name="notifications-circle-outline"
            size={40}
            color={COLORS.secondary}
          />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <FeedCard />
          <FeedCard />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
