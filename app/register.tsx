import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function RegisterScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }

    // ====== call API register ======
    const response = await fetch("https://api-hpd.padek.tech/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data)

    if (response.status !== 200 && response.status !== 201) {
      alert("Register Failed: " + data.message);
      return;
    }

    alert("Register Success! Silakan login.");
    router.replace("/auth");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"}>
      <View style={{ padding: 20, marginTop: 100 }}>

        <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 30 }}>
          Sistem Prediksi Penjualan Barang Bekas
        </Text>

        <TextInput
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={{ marginTop: 20 }}
          label="Email"
          mode="outlined"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TextInput
          style={{ marginTop: 20 }}
          label="Password"
          mode="outlined"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <TextInput
          style={{ marginTop: 20 }}
          label="Confirm Password"
          mode="outlined"
          secureTextEntry={!confirmVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          right={
            <TextInput.Icon
              icon={confirmVisible ? "eye-off" : "eye"}
              onPress={() => setConfirmVisible(!confirmVisible)}
            />
          }
        />

        <Button 
          mode="contained" 
          style={{ marginTop: 20 }}
          onPress={handleRegister}
        >
          Sign Up
        </Button>

        <Button 
          mode="text" 
          onPress={() => router.push("/auth")}
        >
          Already have an account? Sign In
        </Button>

      </View>
    </KeyboardAvoidingView>
  );
}
