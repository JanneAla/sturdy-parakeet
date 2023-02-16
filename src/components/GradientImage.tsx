import React from "react";
import { ImageBackground, View } from "react-native";
import { easeGradient } from "react-native-easing-gradient";
import LinearGradient from "react-native-linear-gradient";
import { MD3ThemeType } from "theme/Types";

type Props = {
    uri: string
    theme: MD3ThemeType
    children: any
}

function GradientImage(props: Props) {
    const { uri, theme, children } = props

    const { colors, locations } = easeGradient({
        colorStops: {
            0: { color: `${theme.background}B4` },
            1: { color: theme.background },
        },
    });

    return (
        <ImageBackground source={{ uri }} style={{
            height: '100%',
            width: '100%',
            flex: 1,
        }}>
            {uri ? (
                <LinearGradient
                    colors={colors}
                    locations={locations}
                    style={{ flex: 1 }}
                >
                    {children}
                </LinearGradient>
            ) : (
                children
            )}
        </ImageBackground>
    )
}

export default GradientImage