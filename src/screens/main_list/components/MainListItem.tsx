import { useNavigation } from "@react-navigation/native";
import IgdbProduct from "models/IgdbProduct";
import React from "react";
import { View, Image } from "react-native";
import { Button, overlay, Text } from "react-native-paper";
import { MD3ThemeType } from "theme/Types";

type Props = {
    product: IgdbProduct,
    onLongPress: (name: string, id: string) => void,
    theme: MD3ThemeType
}

function MainListItem(props: Props) {

    const { product, onLongPress, theme } = props
    const { navigate } = useNavigation();

    function getCover() {
        const hash = product.cover.split("/").pop()
        const size = "cover_big"
        const url = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}`

        return url
    }

    return (
        <View style={
            {
                flexDirection: "row",
                paddingHorizontal: 16,
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
                alignContent: "center",
                alignItems: "center",
                backgroundColor: overlay(5, theme.background),
            }
        }>
            <Image
                source={{ uri: getCover() }}
                resizeMode="contain"
                style={{ width: 63, height: 112, marginRight: 20 }}
            />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text style={{ marginVertical: 4 }}>{product.name}</Text>
                <Text style={{ marginVertical: 4 }}>{new Date(Number(product.releaseDate)).toLocaleDateString()}</Text>
                <Text style={{ marginVertical: 4 }}>{product.platforms.map((p: any) => p.name).join(", ")}</Text>
            </View>
            <Button
                onPress={() => navigate("Product", { id: product.id })}
                onLongPress={() => onLongPress(product.name, product.id)}
                theme={theme}
            >
                More
            </Button>
        </View>
    )
}

export default MainListItem;