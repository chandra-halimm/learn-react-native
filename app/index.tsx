import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./style/Style";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Link style={styles.Button} href={'/login'}>Login Page</Link>
    </View>
  );
}
