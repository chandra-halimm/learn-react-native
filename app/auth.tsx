import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
  <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"}>
    <View style={{padding: 20, marginTop: 100}}>
      <Text>{isSignUp ? "Create Account": "Welcome Back"}</Text>
      <TextInput label="Email" autoCapitalize="none" keyboardType="email-address" placeholder="exmaple@gmail.com" mode="outlined"/>

      <TextInput style={{marginTop: 20}} label="Password" mode="outlined"/>

      <Button mode="contained" style={{marginTop: 20}}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
      <Button mode="text">{ isSignUp ? "Already haven an account? Sign In" : "Don't have an account? Sign Up" }</Button>
    </View>
  </KeyboardAvoidingView>
  );
}