import { Pressable, Text, Image } from 'react-native';
import { useFonts, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function GoogleSignInButton({ onPress }: { onPress: () => void }) {
  
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 30,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1F1F1F',
      }}
    >
      <Image
        source={{
          uri: 'https://developers.google.com/identity/images/g-logo.png',
        }}
        style={{ width: 20, height:20, marginRight: 10}}
      />

      <Text style={{ fontSize: 14,lineHeight: 20, fontFamily: 'Roboto_500Medium'}}>
        Continue with Google
      </Text>
    </Pressable>
  );
}