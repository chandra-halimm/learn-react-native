import Entypo from '@expo/vector-icons/Entypo';
import { router, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";


export default function TabsLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkToken = async () => {
      const savedToken = await SecureStore.getItemAsync("token");
      // const savedToken = null

      if (!savedToken) {
        router.replace("/auth");
      } else {
        setToken(savedToken);
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) {
    return null; // or loading screen
  }

  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            <Entypo name="home" size={30} color={focused ? color : "grey"} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) =>
            <Entypo name="folder" size={24} color={focused ? color : "grey"} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            <Entypo name="user" size={24} color={focused ? color : "grey"} />
        }}
      />
    </Tabs>
  );
}
