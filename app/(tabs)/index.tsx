import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

const API_URL = "http://localhost:5000/predict"; // ganti dengan URL Flask kamu

const BRAND_OPTIONS = ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme"];

const SERIES_BY_BRAND: Record<string, string[]> = {
  Apple: ["iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12"],
  Samsung: ["Galaxy S21 Ultra", "Galaxy S22", "Galaxy A54", "Galaxy A34"],
  Xiaomi: ["Redmi Note 11", "Redmi Note 12", "Poco X3 Pro"],
  Oppo: ["Reno 8", "Reno 7", "A57"],
  Vivo: ["V27", "V25", "Y22"],
  Realme: ["Realme 10", "Realme 9 Pro", "C55"],
};

export default function Index() {
  // === state sesuai JSON model ===
  const [brand, setBrand] = useState("Apple");
  const [series, setSeries] = useState("iPhone 15");
  const [ramGb, setRamGb] = useState("6"); // string utk segmented, kirim Number()
  const [storageGb, setStorageGb] = useState("128");
  const [year, setYear] = useState("2023");
  const [cpu, setCpu] = useState("A16 Bionic");
  const [screenType, setScreenType] = useState("OLED");
  const [screenSizeInch, setScreenSizeInch] = useState("6.1");

  // === hasil prediksi dari Flask ===
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [probSold, setProbSold] = useState<number | null>(null);
  const [labelSold, setLabelSold] = useState<string>("");

  const [loading, setLoading] = useState(false);

  // update pilihan series ketika brand berubah
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

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // sesuaikan dengan response Flask kamu
      setPredictedPrice(data.predicted_price ?? null);
      setProbSold(data.probability_sold ?? null);
      setLabelSold(data.label_sold ?? "");
    } catch (err) {
      console.log("Predict error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F3F6FA" }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      {/* HEADER NAV */}
      <Card
        style={{
          padding: 18,
          backgroundColor: "#22345F",
          borderRadius: 18,
          marginBottom: 14,
        }}
        mode="elevated"
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton icon="arrow-left" iconColor="white" size={22} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "white",
              marginLeft: 4,
            }}
          >
            CekHP Bekas
          </Text>
          <IconButton
            icon="menu"
            iconColor="white"
            size={22}
            style={{ marginLeft: "auto" }}
          />
        </View>
      </Card>

      {/* GREETING */}
      <Card
        style={{
          padding: 16,
          borderRadius: 18,
          marginBottom: 18,
        }}
        mode="elevated"
      >
        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon
            icon="emoticon-happy-outline"
            size={40}
            style={{ backgroundColor: "#E8F5E9", marginRight: 10 }}
            color="#43A047"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: "#1C1C1C" }}
            >
              Halo! Cek harga HP bekasmu sekarang
            </Text>
            <Text style={{ fontSize: 13, color: "#6F6F6F", marginTop: 2 }}>
              Dapatkan estimasi akurat dalam hitungan detik.
            </Text>
          </View>
        </View>
      </Card>

      {/* MAIN SPEC CARD */}
      <Card
        style={{
          padding: 18,
          borderRadius: 20,
        }}
        mode="elevated"
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            marginBottom: 12,
            color: "#1C1C1C",
          }}
        >
          Spesifikasi Utama
        </Text>

        {/* BRAND */}
        <Text style={{ fontSize: 13, marginBottom: 4, color: "#555" }}>
          Brand
        </Text>
        <TextInput
          mode="outlined"
          value={brand}
          onChangeText={setBrand}
          right={<TextInput.Icon icon="chevron-down" />}
          style={{ marginBottom: 10 }}
        />
        {/* opsi brand bisa diubah ke dropdown lib lain kalau mau */}

        {/* SERIES */}
        <Text style={{ fontSize: 13, marginBottom: 4, color: "#555" }}>
          Series / Model
        </Text>
        <TextInput
          mode="outlined"
          value={series}
          onChangeText={setSeries}
          right={<TextInput.Icon icon="chevron-down" />}
          style={{ marginBottom: 16 }}
        />

        {/* RAM */}
        <Text style={{ fontSize: 13, marginBottom: 6, color: "#555" }}>
          RAM
        </Text>
        <SegmentedButtons
          value={ramGb}
          onValueChange={setRamGb}
          buttons={[
            { value: "4", label: "4 GB" },
            { value: "6", label: "6 GB" },
            { value: "8", label: "8 GB" },
          ]}
          style={{ marginBottom: 14 }}
        />

        {/* STORAGE */}
        <Text style={{ fontSize: 13, marginBottom: 6, color: "#555" }}>
          Penyimpanan Internal
        </Text>
        <SegmentedButtons
          value={storageGb}
          onValueChange={setStorageGb}
          buttons={[
            { value: "64", label: "64 GB" },
            { value: "128", label: "128 GB" },
            { value: "256", label: "256 GB" },
          ]}
          style={{ marginBottom: 18 }}
        />

        {/* EXTRA INFO TITLE */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            marginBottom: 10,
            color: "#1C1C1C",
          }}
        >
          Detail Tambahan
        </Text>

        {/* YEAR */}
        <Text style={{ fontSize: 13, marginBottom: 4, color: "#555" }}>
          Tahun Rilis
        </Text>
        <TextInput
          mode="outlined"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          style={{ marginBottom: 10 }}
        />

        {/* CPU */}
        <Text style={{ fontSize: 13, marginBottom: 4, color: "#555" }}>
          CPU / Chipset
        </Text>
        <TextInput
          mode="outlined"
          value={cpu}
          onChangeText={setCpu}
          style={{ marginBottom: 10 }}
        />

        {/* SCREEN TYPE */}
        <Text style={{ fontSize: 13, marginBottom: 6, color: "#555" }}>
          Tipe Layar
        </Text>
        <SegmentedButtons
          value={screenType}
          onValueChange={setScreenType}
          buttons={[
            { value: "OLED", label: "OLED" },
            { value: "AMOLED", label: "AMOLED" },
            { value: "LCD", label: "LCD" },
          ]}
          style={{ marginBottom: 14 }}
        />

        {/* SCREEN SIZE */}
        <Text style={{ fontSize: 13, marginBottom: 4, color: "#555" }}>
          Ukuran Layar (inci)
        </Text>
        <SegmentedButtons
          value={screenSizeInch}
          onValueChange={setScreenSizeInch}
          buttons={[
            { value: "5.8", label: '5.8"' },
            { value: "6.1", label: '6.1"' },
            { value: "6.7", label: '6.7"' },
          ]}
          style={{ marginBottom: 20 }}
        />

        {/* CTA BUTTON */}
        <Button
          mode="contained"
          onPress={handlePredict}
          loading={loading}
          disabled={loading}
          style={{
            backgroundColor: "#6CC24A",
            borderRadius: 10,
            paddingVertical: 6,
          }}
        >
          Lihat Estimasi Harga
        </Button>

        <Button mode="text" style={{ marginTop: 6 }}>
          Riwayat Prediksi
        </Button>
      </Card>

      {/* RESULT CARD */}
      {predictedPrice !== null && (
        <Card
          style={{
            marginTop: 20,
            padding: 18,
            borderRadius: 18,
          }}
          mode="elevated"
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 10,
              color: "#1C1C1C",
            }}
          >
            Estimasi Harga Jual
          </Text>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              marginBottom: 6,
              color: "#1C1C1C",
            }}
          >
            {formatRupiah(predictedPrice)}
          </Text>

          {probSold !== null && (
            <Text style={{ fontSize: 14, color: "#555", marginBottom: 4 }}>
              Peluang laku:{" "}
              <Text style={{ fontWeight: "700" }}>
                {(probSold * 100).toFixed(1)}%
              </Text>
            </Text>
          )}

          {!!labelSold && (
            <Text
              style={{
                marginTop: 4,
                fontSize: 14,
                fontWeight: "600",
                color: "#43A047",
              }}
            >
              {labelSold}
            </Text>
          )}

          <Text style={{ marginTop: 10, fontSize: 12, color: "#777" }}>
            {brand} {series} • {ramGb}GB RAM • {storageGb}GB storage • layar{" "}
            {screenSizeInch}" {screenType}
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}
