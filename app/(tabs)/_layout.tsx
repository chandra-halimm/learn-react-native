import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import { tabLayoutstyles } from "../../style/Style";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: tabLayoutstyles.tabBar,
        tabBarActiveTintColor: "#6CC24A",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarLabelStyle: tabLayoutstyles.tabBarLabel,
        tabBarShowLabel: true,
        headerStyle: tabLayoutstyles.header,
        headerTitleStyle: tabLayoutstyles.headerTitle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <Entypo 
              name="home" 
              size={24} 
              color={focused ? "#6CC24A" : "#9E9E9E"} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ color, focused }) => (
            <Entypo 
              name="back-in-time" 
              size={24} 
              color={focused ? "#6CC24A" : "#9E9E9E"} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <Entypo 
              name="user" 
              size={24} 
              color={focused ? "#6CC24A" : "#9E9E9E"} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

