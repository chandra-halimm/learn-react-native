import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";


export default function RootLayout() {
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('token');
      if(!token){
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []); 

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} /> 
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}