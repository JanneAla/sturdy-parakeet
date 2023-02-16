import React, { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, StatusBar, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import ExpandableText from "components/ExpandableText";
import { database } from "db";
import GradientImage from "components/GradientImage";
import { useTheme } from "hooks/useTheme";
import IgdbProduct from "models/IgdbProduct";
import { Company, MetaGame } from "interfaces/IgdbProduct";


type Props = {
    route: { params: { id: number } },
    navigation: any
}

function ProductInfoScreen({ route, navigation }: Props) {

    const { id } = route.params
    const [product, setProduct] = React.useState<IgdbProduct>()
    const theme = useTheme()

    function getPlatforms() {
        return product?.platforms
            .map((platform: any) => platform.name)
            .sort((a: any, b: any) => {
                if (a > b) return 1
                if (a < b) return -1
                return 0
            })
            .join("\n")
    }
    function getCover(url: string) {
        const hash = url?.split("/").pop()
        const size = "cover_big"
        const uri = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}`

        return uri
    }

    const fetchProduct = React.useCallback(async () => {
        const product = await database.get<IgdbProduct>("igdbProducts").find(id.toString())
        setProduct(product)
    }, [])

    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                position: "absolute",
                zIndex: 1,
                height: StatusBar.currentHeight + 54,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "flex-end",

            }} >
                <IconButton
                    icon={"arrow-left"}
                    onPress={navigation.goBack}
                />
                <View style={{
                    borderRadius: 50,
                    width: 10,
                    height: 10,
                    backgroundColor: product?.owned ? "green" : "red",
                    marginBottom: 20,
                    marginRight: 20
                }} />
            </View>

            {!product &&
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />}
            <ScrollView>
                <GradientImage uri={getCover(product?.cover)} theme={theme}>
                    <View style={{ margin: 20, marginTop: StatusBar.currentHeight + 54 + 20, flexDirection: "row" }} >
                        <View style={{ marginRight: 20 }}>
                            {product && product.cover && <Image
                                source={{ uri: getCover(product?.cover) }}
                                resizeMode="contain"
                                style={{ width: 100, height: 125 }}
                            />}
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text variant={"titleMedium"} style={{ marginVertical: 4 }}>{product?.name}</Text>
                            <Text style={{ marginVertical: 4 }}>{new Date(Number(product?.releaseDate)).toLocaleDateString()}</Text>
                            <Text style={{ marginVertical: 4 }}>
                                {getPlatforms()}
                            </Text>
                        </View>
                    </View>
                </GradientImage>

                <View style={{ margin: 20 }}>
                    <View style={{ flex: 1, marginBottom: 20 }}>
                        <ExpandableText style={{ marginVertical: 4 }} numOfLines={4} value={product?.summary || ""} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexBasis: "50%" }} >
                            <Text variant="titleMedium" style={{ marginVertical: 4, flexBasis: "50%", textAlign: "center" }}>
                                Publishers:
                            </Text>
                            <Text style={{ textAlign: "center" }}>
                                {product?.publishers.map((p: Company) => p.company.name).join("\n")}
                            </Text>
                        </View>
                        <View style={{ flexBasis: "50%" }} >
                            <Text variant="titleMedium" style={{ marginVertical: 4, flexBasis: "50%", textAlign: "center" }}>
                                Developers:
                            </Text>
                            <Text style={{ textAlign: "center" }}>
                                {product?.developers.map((d: Company) => d.company.name).join("\n")}
                            </Text>
                        </View>
                    </View>

                    <Divider bold={true} style={{ marginVertical: 20 }} />

                    <View>
                        {product?.remakes &&
                            <View>
                                <Text variant="titleMedium">Remakes:</Text>
                                {product?.remakes?.map((rmk: MetaGame) => (
                                    <View key={rmk.id} style={{ flexDirection: "row" }} >
                                        <Image
                                            source={{ uri: getCover(rmk.cover.url) }}
                                            resizeMode="contain"
                                            style={{ width: 50, height: 75, marginHorizontal: 20, marginVertical: 5 }}
                                        />
                                        <View style={{ justifyContent: "center" }} >
                                            <Text>{rmk.name}</Text>
                                            <Text>{rmk.platforms.map(p => p.name).join(", ")}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        }

                        {product?.remasters &&
                            <View>
                                <Text variant="titleMedium">Remasters:</Text>
                                {product?.remasters.map((rms: MetaGame) => (
                                    <View key={rms.id} style={{ flexDirection: "row" }} >
                                        <Image
                                            source={{ uri: getCover(rms.cover.url) }}
                                            resizeMode="contain"
                                            style={{ width: 50, height: 75, marginHorizontal: 20, marginVertical: 5 }}
                                        />
                                        <View style={{ justifyContent: "center" }} >
                                            <Text>{rms.name}</Text>
                                            <Text>{rms.platforms.map(p => p.name).join(", ")}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        }
                    </View>

                    <View>
                        {Object.keys(product?.platformSpecificPrices || {}).map((key) => (
                            <>
                                {product?.platformSpecificPrices[key].paid != 0 &&
                                    <View>
                                        <Text>{product?.platforms.find(e => e.id == key).name}</Text>
                                        <Text>Release: {product?.platformSpecificPrices[key].release}</Text>
                                        <Text>Paid: {product?.platformSpecificPrices[key].paid}</Text>
                                    </View>
                                }
                            </>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}

export default ProductInfoScreen;