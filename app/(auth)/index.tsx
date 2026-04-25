import Button from "@/components/Button";
import { router } from "expo-router";
import { View } from "react-native";

export default function index() {
  const handleLogIn = () => {
    router.replace("/(app)");
  };

  return (
    <View>
      <Button title="Log In" variant="secondary" onPress={handleLogIn} />
    </View>
  );
}
