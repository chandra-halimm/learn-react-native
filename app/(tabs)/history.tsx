import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";
import { historyStyles } from "../../style/Style";

export default function History({ navigation }: any) {
  const [history, setHistory] = useState<any[]>([]);

  // Data dummy untuk sementara
  const dummyHistory = [
    {
      id: 1,
      brand: "Apple",
      series: "iPhone 15",
      ram_gb: 6,
      storage_gb: 128,
      screen: "OLED 6.1\"",
      price: 15000000,
      prob: 0.85,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      brand: "Samsung",
      series: "Galaxy S22",
      ram_gb: 8,
      storage_gb: 256,
      screen: "AMOLED 6.7\"",
      price: 12000000,
      prob: 0.75,
      created_at: new Date(Date.now() - 86400000).toISOString() // 1 hari yang lalu
    },
    {
      id: 3,
      brand: "Xiaomi",
      series: "Redmi Note 12",
      ram_gb: 6,
      storage_gb: 128,
      screen: "LCD 6.1\"",
      price: 3500000,
      prob: 0.65,
      created_at: new Date(Date.now() - 172800000).toISOString() // 2 hari yang lalu
    }
  ];

  const loadHistory = async () => {
    // Untuk sementara menggunakan data dummy
    setHistory(dummyHistory);
    
    // Kode asli untuk load dari AsyncStorage (dikomentari sementara)
    // const data = JSON.parse(await AsyncStorage.getItem("history") || "[]");
    // setHistory(data);
  };

  const clearHistory = async () => {
    // Untuk sementara hanya mengosongkan state
    setHistory([]);
    
    // Kode asli untuk clear AsyncStorage (dikomentari sementara)
    // await AsyncStorage.removeItem("history");
    // setHistory([]);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Hari ini";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Kemarin";
    } else {
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };

  return (
    <ScrollView style={historyStyles.container}>
      <View style={historyStyles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#333"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={historyStyles.headerTitle}>Riwayat Prediksi</Text>
        {history.length > 0 && (
          <IconButton
            icon="delete-outline"
            iconColor="#E53935"
            size={24}
            onPress={clearHistory}
          />
        )}
      </View>

      {history.length === 0 ? (
        <View style={historyStyles.emptyContainer}>
          <Text style={historyStyles.emptyText}>Belum ada riwayat prediksi</Text>
        </View>
      ) : (
        <View style={historyStyles.historyContainer}>
          {history.map((item) => (
            <Card key={item.id} style={historyStyles.card}>
              <View style={historyStyles.cardHeader}>
                <View>
                  <Text style={historyStyles.brandText}>{item.brand}</Text>
                  <Text style={historyStyles.seriesText}>{item.series}</Text>
                </View>
                <View style={historyStyles.priceContainer}>
                  <Text style={historyStyles.priceText}>
                    Rp {item.price.toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
              
              <Divider style={historyStyles.divider} />
              
              <View style={historyStyles.specContainer}>
                <Text style={historyStyles.specText}>
                  {item.ram_gb}GB RAM • {item.storage_gb}GB • {item.screen}
                </Text>
              </View>
              
              
              <Text style={historyStyles.dateText}>
                {formatDate(item.created_at)}
              </Text>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}