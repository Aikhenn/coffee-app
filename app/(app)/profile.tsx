import Button from "@/components/Button";
import { router } from "expo-router";
import { View } from "react-native";

export default function profile() {
  const handleLogout = () => {
    router.replace("/(auth)");
  };

  return (
    <View className="flex flex-col h-full mt-4">
      <Button title="Back to Auth Screen" onPress={handleLogout} />
    </View>
  );
}
