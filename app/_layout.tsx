import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({children}: {children: React.ReactNode}) {
    const route = useRouter();
    const isAuthenticated = false;

    useEffect(() => {
        
        if (!isAuthenticated) {
            route.replace("/auth");
        }
    });

    return <>{children}</>;
}

export default function RootLayout() {
  return (
    <RouteGuard>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </RouteGuard>
  )
}
