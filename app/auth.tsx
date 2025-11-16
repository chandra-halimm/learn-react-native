import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("https://api-hpd.padek.tech/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      alert("Login Failed: " + data.message);
      return;
    }

    await SecureStore.setItemAsync("token", String(data.data.access_token));
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"}>
      <View style={{ padding: 20, marginTop: 100 }}>

        <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 30 }}>
          Sistem Prediksi Penjualan Barang Bekas
        </Text>

        <TextInput 
          label="Email" 
          mode="outlined"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          style={{ marginTop: 20 }}
          label="Password"
          mode="outlined"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          value={password}
          onChangeText={setPassword}
        />

        <Button 
          mode="contained" 
          onPress={handleLogin} 
          style={{ marginTop: 20 }}
        >
          Sign In
        </Button>

        <Button 
          mode="text" 
          onPress={() => router.push("/register")}
        >
          Don’t Have an Account? Sign Up
        </Button>

      </View>
    </KeyboardAvoidingView>
  );
}
