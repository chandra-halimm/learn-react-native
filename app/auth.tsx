import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { authStyles } from "../style/Style";

export default function AuthScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      alert("Login Failed: " + data.message);
      return;
    }

    await AsyncStorage.setItem("token", String(data.data.access_token));
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={authStyles.container}
    >
      <View style={authStyles.innerContainer}>
        <Image 
          source={require('../assets/images/android-icon-foreground.png')}
          style={authStyles.logo}
        />
        
        {/* Judul Aplikasi */}
        <Text style={authStyles.title}>
          Sistem Prediksi Penjualan
        </Text>
        <Text style={authStyles.subtitle}>
          Barang Bekas
        </Text>

        {/* Card Form */}
        <View style={authStyles.card}>
          {/* <InputText /> */}
          <TextInput 
            label="Email" 
            mode="outlined"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            style={authStyles.input}
            theme={{ colors: { primary: '#6CC24A' } }}
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={!passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
                color="#6CC24A"
              />
            }
            value={password}
            onChangeText={setPassword}
            style={authStyles.input}
            theme={{ colors: { primary: '#6CC24A' } }}
          />

          <Button 
            mode="contained" 
            onPress={handleLogin} 
            style={authStyles.button}
            labelStyle={authStyles.buttonLabel}
          >
            Sign In
          </Button>

          <Button
            mode="text"
            textColor="#6CC24A"
            onPress={() => router.push("/register")}
            style={authStyles.textButton}
          >
            Don't Have an Account? Sign Up
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
