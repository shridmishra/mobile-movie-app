import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-5xl text-white font-bold mb-4">Welcome</Text>
      <Link href="/onboarding" className="text-blue-500 text-lg">Onboarding</Link>
      <Link href="/movie/avenger">Avenger Movie</Link>
    </View>
  );
}
