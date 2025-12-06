import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";

export default function InputText(props : TextInputProps) {
    return(
        <TextInput
            mode="outlined"
            theme={{ colors: { primary: '#6CC24A' } }}
            {...props}
        />   
    )
}