import React from "react";
import { Image } from "react-native";

export default function Logo() {
    return(
        <Image 
            source={require('../assets/images/android-icon-foreground.png')}
            style={{ width: 100, height: 100, marginBottom: 20 }}
        />
    )
}