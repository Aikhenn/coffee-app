import Button from "@/components/Button";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function index() {
  const handleLogIn = () => {
    router.replace("/(app)");
  };

function OrDivider() {
  return (
    <View
     style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      paddingHorizontal: 40
     }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: '#ccc',
        }}
      />

      <Text style={{ marginHorizontal:10, color: '#714620'}}>
        or
      </Text>
      
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: '#ccc',
        }}
      />
    </View>
  );
}

  return (
    <SafeAreaView className="flex-1 bg-[#EFE9E2]">
      <View className="flex-1 items-center">
        <View className="p-16 mb-10">
          <Image
            source={{ uri: 'https://jojzgmgtkagxkpoiqsvo.supabase.co/storage/v1/object/public/Systema/Sample%20Cafe%20Image%20(1).png' }}
            style={{ width: 350, height: 500}}
            borderRadius={60}
          />
        </View>
        <GoogleSignInButton onPress={handleLogIn} />
        <OrDivider />
        <Button title="Log in your account" variant="primary" textColor="text-white" textSize="text-base" onPress={handleLogIn} />
        <Button title="Create an account" variant="ghost" textColor="text-[#714620]" textSize="text-base" onPress={handleLogIn} />
      </View>
    </SafeAreaView>
  );
}
