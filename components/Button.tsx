import React from "react";
import { ButtonProps, Button as PaperButton } from "react-native-paper";

export default function Button(props : ButtonProps) {
    return(
        <PaperButton
            mode="contained"
            {...props}
        />   
    )
}