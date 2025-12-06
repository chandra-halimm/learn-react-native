import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Modal,
  Text,
  TextInput
} from "react-native-paper";
import { homeStyles } from "../../style/Style";

const SERIES_BY_BRAND: Record<string, string[]> = {
  Apple: ["iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12"],
  Samsung: ["Galaxy S21 Ultra", "Galaxy S22", "Galaxy A54", "Galaxy A34"],
  Xiaomi: ["Redmi Note 11", "Redmi Note 12", "Poco X3 Pro"],
  Oppo: ["Reno 8", "Reno 7", "A57"],
  Vivo: ["V27", "V25", "Y22"],
  Realme: ["Realme 10", "Realme 9 Pro", "C55"],
};

export default function Index() {
  // State sesuai JSON model
  const [brand, setBrand] = useState("Apple");
  const [series, setSeries] = useState("iPhone 15");
  const [ramGb, setRamGb] = useState("6");
  const [storageGb, setStorageGb] = useState("128");
  const [year, setYear] = useState("2023");
  const [cpu, setCpu] = useState("A16 Bionic");
  const [screenType, setScreenType] = useState("OLED");
  const [screenSizeInch, setScreenSizeInch] = useState("6.1");

  // Hasil prediksi
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [probSold, setProbSold] = useState<number | null>(null);
  const [labelSold, setLabelSold] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showSeriesModal, setShowSeriesModal] = useState(false);

  // Update series ketika brand berubah
  useEffect(() => {
    const list = SERIES_BY_BRAND[brand];
    if (list && !list.includes(series)) {
      setSeries(list[0]);
    }
  }, [brand]);

  const formatRupiah = (value: number | null) => {
    if (value == null) return "";
    return (
      "Rp " +
      value
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const payload = {
        brand,
        series,
        ram_gb: Number(ramGb),
        storage_gb: Number(storageGb),
        year: Number(year),
        cpu,
        screen_type: screenType,
        screen_size_inch: Number(screenSizeInch),
      };

      const res = await fetch(`${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/api/v1/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setPredictedPrice(data.predicted_price ?? null);
      setProbSold(data.probability_sold ?? null);
      setLabelSold(data.label_sold ?? "");
    } catch (err) {
      console.log("Predict error:", err);
      Alert.alert("Error", "Terjadi kesalahan saat memprediksi harga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerTitle}>CekHP Bekas</Text>
        <Text style={homeStyles.headerSubtitle}>Estimasi harga akurat dalam hitungan detik</Text>
      </View>

      {/* Main Form */}
      <Card style={homeStyles.formCard}>
        <Card.Content>
          {/* Brand Selection */}
          <Text style={homeStyles.label}>Brand</Text>
          <TouchableOpacity
            style={homeStyles.selectorButton}
            onPress={() => setShowBrandModal(true)}
          >
            <Text style={homeStyles.selectorText}>{brand}</Text>
          </TouchableOpacity>

          {/* Series Selection */}
          <Text style={homeStyles.label}>Series / Model</Text>
          <TouchableOpacity
            style={homeStyles.selectorButton}
            onPress={() => setShowSeriesModal(true)}
          >
            <Text style={homeStyles.selectorText}>{series}</Text>
          </TouchableOpacity>

          {/* RAM Input */}
          <Text style={homeStyles.label}>RAM (GB)</Text>
          <TextInput
            mode="outlined"
            value={ramGb}
            onChangeText={setRamGb}
            keyboardType="numeric"
            style={homeStyles.input}
            dense
          />

          {/* Storage Input */}
          <Text style={homeStyles.label}>Penyimpanan (GB)</Text>
          <TextInput
            mode="outlined"
            value={storageGb}
            onChangeText={setStorageGb}
            keyboardType="numeric"
            style={homeStyles.input}
            dense
          />

          {/* Year Input */}
          <Text style={homeStyles.label}>Tahun Rilis</Text>
          <TextInput
            mode="outlined"
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
            style={homeStyles.input}
            dense
          />

          <Divider style={homeStyles.divider} />

          {/* CPU Input */}
          <Text style={homeStyles.label}>CPU / Chipset</Text>
          <TextInput
            mode="outlined"
            value={cpu}
            onChangeText={setCpu}
            style={homeStyles.input}
            dense
          />

          {/* Screen Type */}
          <Text style={homeStyles.label}>Tipe Layar</Text>
          <View style={homeStyles.optionsContainer}>
            {["OLED", "AMOLED", "LCD"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  homeStyles.optionButton,
                  screenType === type && homeStyles.optionButtonSelected
                ]}
                onPress={() => setScreenType(type)}
              >
                <Text style={[
                  homeStyles.optionText,
                  screenType === type && homeStyles.optionTextSelected
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Screen Size */}
          <Text style={homeStyles.label}>Ukuran Layar (inci)</Text>
          <View style={homeStyles.optionsContainer}>
            {["5.8", "6.1", "6.7"].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  homeStyles.optionButton,
                  screenSizeInch === size && homeStyles.optionButtonSelected
                ]}
                onPress={() => setScreenSizeInch(size)}
              >
                <Text style={[
                  homeStyles.optionText,
                  screenSizeInch === size && homeStyles.optionTextSelected
                ]}>
                  {size}"
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Predict Button */}
          <Button
            mode="contained"
            onPress={handlePredict}
            loading={loading}
            disabled={loading}
            style={homeStyles.button}
          >
            Lihat Estimasi Harga
          </Button>

          <Button
            mode="text"
            textColor="#6CC24A"
            onPress={() => {}}
            style={homeStyles.textButton}
          >
            Riwayat Prediksi
          </Button>
        </Card.Content>
      </Card>

      {/* Result Card */}
      {predictedPrice !== null && (
        <Card style={homeStyles.resultCard}>
          <Card.Content>
            <Text style={homeStyles.resultTitle}>Estimasi Harga Jual</Text>
            <Text style={homeStyles.resultPrice}>{formatRupiah(predictedPrice)}</Text>
            
            {probSold !== null && (
              <View style={homeStyles.probContainer}>
                <View style={homeStyles.probBarContainer}>
                  <View style={[homeStyles.probBar, { width: `${probSold * 100}%` }]} />
                </View>
                <Text style={homeStyles.probText}>
                  {(probSold * 100).toFixed(1)}% peluang laku
                </Text>
              </View>
            )}

            {!!labelSold && (
              <Text style={homeStyles.resultLabel}>{labelSold}</Text>
            )}

            <Text style={homeStyles.specSummary}>
              {brand} {series} • {ramGb}GB RAM • {storageGb}GB storage • {screenSizeInch}" {screenType}
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Brand Selection Modal */}
      <Modal
        visible={showBrandModal}
        onDismiss={() => setShowBrandModal(false)}
        contentContainerStyle={homeStyles.modal}
      >
        <Text style={homeStyles.modalTitle}>Pilih Brand</Text>
        <ScrollView>
          {Object.keys(SERIES_BY_BRAND).map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                homeStyles.modalItem,
                brand === item && homeStyles.modalItemSelected
              ]}
              onPress={() => {
                setBrand(item);
                setShowBrandModal(false);
              }}
            >
              <Text style={[
                homeStyles.modalItemText,
                brand === item && homeStyles.modalItemSelectedText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>

      {/* Series Selection Modal */}
      <Modal
        visible={showSeriesModal}
        onDismiss={() => setShowSeriesModal(false)}
        contentContainerStyle={homeStyles.modal}
      >
        <Text style={homeStyles.modalTitle}>Pilih Series</Text>
        <ScrollView>
          {SERIES_BY_BRAND[brand].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                homeStyles.modalItem,
                series === item && homeStyles.modalItemSelected
              ]}
              onPress={() => {
                setSeries(item);
                setShowSeriesModal(false);
              }}
            >
              <Text style={[
                homeStyles.modalItemText,
                series === item && homeStyles.modalItemSelectedText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}