import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });

  // Edit user info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Update password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const parsed = JSON.parse(data);
        setUser(parsed);
        setName(parsed.name);
        setEmail(parsed.email);
        setPhone(parsed.phone ?? "");
      }
    } catch (e) {
      console.log("Load user error:", e);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Save updated info
  const saveProfile = async () => {
    const updatedUser = {
      ...user,
      name,
      email,
      phone,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    Alert.alert("Berhasil ✔", "Profil berhasil diperbarui!");
  };

  const updatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "Password tidak boleh kosong!");
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Password baru tidak cocok!");
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://YOUR_API/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        Alert.alert("Gagal", result.message || "Update password gagal");
      } else {
        Alert.alert("Berhasil!", "Password telah diubah 👍");
      }
    } catch (e) {
      Alert.alert("Error", "Server error!");
    }
    setLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    router.replace("/"); // back to landing/login
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F3F6FA" }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Profil</Text>
      </View>

      {/* Avatar + Info */}
      <Card
        mode="elevated"
        style={{
          padding: 20,
          borderRadius: 18,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Avatar.Text
          size={80}
          label={name?.charAt(0)?.toUpperCase() || "U"}
          style={{ backgroundColor: "#6CC24A" }}
        />
        <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 10 }}>
          {name || "Nama User"}
        </Text>
        <Text style={{ fontSize: 14, color: "#777" }}>{email}</Text>
      </Card>

      {/* FORM USER INFO */}
      <Card
        mode="elevated"
        style={{
          padding: 20,
          borderRadius: 18,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 10 }}>
          Informasi Pengguna
        </Text>

        <TextInput
          label="Nama Lengkap"
          mode="outlined"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="No. Telepon"
          mode="outlined"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={{ marginBottom: 10 }}
        />

        <Button
          mode="contained"
          onPress={saveProfile}
          style={{ backgroundColor: "#6CC24A", borderRadius: 10 }}
        >
          Simpan Profil
        </Button>
      </Card>

      <Divider style={{ marginVertical: 10 }} />

      {/* UPDATE PASSWORD */}
      <Card mode="elevated" style={{ padding: 20, borderRadius: 18 }}>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 16 }}>
          Ubah Password
        </Text>

        <TextInput
          label="Password saat ini"
          secureTextEntry
          mode="outlined"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Password baru"
          secureTextEntry
          mode="outlined"
          value={newPassword}
          onChangeText={setNewPassword}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Konfirmasi password"
          secureTextEntry
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ marginBottom: 20 }}
        />

        <Button
          mode="contained"
          loading={loading}
          onPress={updatePassword}
          style={{ backgroundColor: "#6CC24A", borderRadius: 10 }}
        >
          Simpan Password Baru
        </Button>
      </Card>

      {/* Logout Button */}
      <Button
        mode="text"
        textColor="red"
        onPress={logout}
        style={{ marginTop: 20 }}
      >
        Logout
      </Button>
    </ScrollView>
  );
}
