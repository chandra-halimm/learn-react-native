import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native"; // Atau gunakan Splash Screen

export default function RootLayout() {
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // const token = await AsyncStorage.getItem('token');
      // if (token) {
      //   setIsAuthenticated(true);
      // } else {
      //   setIsAuthenticated(false);
      // }
      
      setIsAuthenticated(false); 
      setIsLoading(false); 
    };

    checkAuth();
  }, []); 

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/auth");
    }  else {
        router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]); 

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} /> 
    </Stack>
  );
}