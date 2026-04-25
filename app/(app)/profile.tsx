import Button from "@/components/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function profile() {
  const handleLogout = () => {
    router.replace("/(auth)");
  };

  return (
    <SafeAreaView className="flex flex-col h-full mt-4">
      <Button title="Back to Auth Screen" onPress={handleLogout} />
    </SafeAreaView>
  );
}
