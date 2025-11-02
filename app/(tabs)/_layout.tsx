import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
  <Tabs>
    <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({color, focused}) => {
      return focused ? (<Entypo name="home" size={30} color={color} /> ) : (<Entypo name="home" size={30} color={"grey"} />)
    } }} />
    <Tabs.Screen name="login" options={{ title: "Login", tabBarIcon: ({color, focused}) =>{
      return focused ? (<Entypo name="login" size={24} color={color} /> ) : (<Entypo name="login" size={24} color={"grey"} />)
    } }} />
  </Tabs>
  )
}
