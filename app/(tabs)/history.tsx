import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

export default function History({ navigation }: any) {
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("history") || "[]");
    setHistory(data);
  };

  const clearHistory = async () => {
    await AsyncStorage.removeItem("history");
    setHistory([]);
  };

useFocusEffect(
  useCallback(() => {
    loadHistory();
  }, [])
);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F3F6FA" }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Riwayat Prediksi
        </Text>
        {history.length > 0 && (
          <IconButton
            icon="delete"
            iconColor="red"
            style={{ marginLeft: "auto" }}
            onPress={clearHistory}
          />
        )}
      </View>

      {history.length === 0 ? (
        <Text style={{ marginTop: 20, color: "#555" }}>
          Belum ada history prediksi 📭
        </Text>
      ) : (
        history.map((item) => (
          <Card
            key={item.id}
            style={{
              padding: 16,
              marginBottom: 14,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {item.brand} {item.series}
            </Text>
            <Text style={{ marginTop: 2, color: "#666" }}>
              {item.ram_gb}GB RAM • {item.storage_gb}GB • {item.screen}
            </Text>
            <Text style={{ marginTop: 6, fontSize: 16, fontWeight: "800" }}>
              Rp {item.price.toLocaleString("id-ID")}
            </Text>

            <Text style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
              {(item.prob * 100).toFixed(1)}% peluang laku
            </Text>

            <Text style={{ fontSize: 11, color: "#AAA", marginTop: 8 }}>
              {new Date(item.created_at).toLocaleString("id-ID")}
            </Text>
          </Card>
        ))
      )}
    </ScrollView>
  );
}
