import React, { useEffect } from "react";
import { View, Image, ToastAndroid, Keyboard, ScrollView, StatusBar, StyleSheet } from "react-native";
import { Text, ActivityIndicator, FAB, TextInput, IconButton, Chip, Switch } from "react-native-paper";
import { NavigationProp, RouteProp, StackActions } from "@react-navigation/native";
import ExpandableText from "components/ExpandableText";
import { database } from "db";
import { Q } from '@nozbe/watermelondb'
import { useTheme } from "hooks/useTheme";
import useIGDBApi from "hooks/useIGDBApi";
import { StackParamList } from "navigators/LibraryStack";
import { PlatformPrices, RawIgdpProduct } from "interfaces/IgdbProduct";
import { IgdbApiContext } from "contexts/IGDBAuth";
import GradientImage from "components/GradientImage";
import IgdbProduct from "models/IgdbProduct";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

type Props = {
    route: RouteProp<StackParamList, 'Add'>,
    navigation: NavigationProp<StackParamList, 'Add'>
}

enum PlatformLogos {
    "Nintendo Switch" = "nintendo-switch",
    "Nintendo Wii" = "nintendo-wii",
    "Wii U" = "nintendo-wiiu",
    "Playstation 1" = "sony-playstation",
    "Playstation 2" = "sony-playstation",
    "Playstation 3" = "sony-playstation",
    "Playstation 4" = "sony-playstation",
    "Playstation 5" = "sony-playstation",
    "Xbox Series X|S" = "microsoft-xbox",
    "PC (Microsoft Windows)" = "laptop",
}

function AddItem({ route, navigation }: Props) {

    const [product, setProduct] = React.useState<Partial<RawIgdpProduct>>({})
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false)
    const [refreshing, setRefreshing] = React.useState<boolean>(false)
    const [releasePrice, setReleasePrice] = React.useState<string>("60")
    const [paidPrice, setPaidPrice] = React.useState<string>("0")
    const [kbShown, setkbShown] = React.useState<boolean>(false)
    const [isSwitchOn, setIsSwitchOn] = React.useState(false)
    const [chips, setChips] = React.useState<number[]>([])
    const [prices, setPrices] = React.useState<PlatformPrices>({})

    const theme = useTheme()
    const igdbApi = useIGDBApi()
    const auth = React.useContext(IgdbApiContext)

    const fetchData = React.useCallback(async () => {
        const token = await auth.login()
        setRefreshing(true)

        igdbApi.queryById(token, route.params.id)
            .then(res => {
                setProduct(res)
                const map = {}
                res.platforms?.forEach(value => {
                    map[value.id] = {
                        release: 60,
                        paid: 0
                    }
                })
                setPrices(map)
            })
            .catch(err => console.error(err))
            .finally(() => {
                setRefreshing(false)
                setIsLoaded(true)
            })
    }, [])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => setkbShown(true))
        Keyboard.addListener("keyboardDidHide", () => setkbShown(false))

        fetchData()

        return () => {
            Keyboard.removeAllListeners("keyboardDidShow")
            Keyboard.removeAllListeners("keyboardDidHide")
        }
    }, [])

    // if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
    function validateReleasePrice(input: string, id: number) {
        if (input.match(/^([0-9]{1,})?(\.)?([0-9]{0,2})?$/))
            setPrices(old => {
                const newObj = { ...old }
                newObj[id].release = Number(input)
                return newObj
            })
        setReleasePrice(input)
    }

    function validatePaidPrice(input: string, id: number) {
        if (input.match(/^([0-9]{1,})?(\.)?([0-9]{0,2})?$/))
            setPrices(old => {
                const newObj = { ...old }
                newObj[id].paid = Number(input)
                return newObj
            })
        setPaidPrice(input)
    }
    function getCover() {
        const hash = product.cover?.url.split("/").pop()
        const size = "cover_big"
        const url = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}`

        return url
    }
    function getDevelopers() {
        const developers = product.involved_companies?.filter((company) => company.developer).map(dev => dev.company.name).join("\n")
        return developers
    }
    function getPublishers() {
        const publishers = product.involved_companies?.filter((company) => company.publisher).map(pub => pub.company.name).join("\n")
        return publishers
    }

    function handleChipPress(id: number) {
        const index = chips.findIndex((val) => val == id)

        if (index > -1)
            setChips(old => {
                return old.filter(value => value !== id)
            })
        else
            setChips(old => [...old, id])
    }

    const saveData = async () => {

        const existsCount = await database.get<IgdbProduct>("igdbProducts").query(
            Q.where("igdb_id", Q.eq(product.id))
        ).fetchCount()

        if (existsCount > 0) {
            const pop = StackActions.popToTop()
            navigation.dispatch(pop)
            ToastAndroid.show("Item already exists in library", ToastAndroid.SHORT)
            return;
        }

        const newProduct = await database.write(async () => {
            return await database.get<IgdbProduct>("igdbProducts").create(item => {
                item.name = product.name
                item.igdbId = product.id
                item.platforms = product.platforms
                item.platformSpecificPrices = prices
                item.releaseDate = (product.first_release_date * 1000).toString()
                item.cover = product.cover?.url || ""
                item.genres = product.genres
                item.remakes = product.remakes
                item.remasters = product.remasters
                item.summary = product.summary
                item.publishers = product.involved_companies?.filter((company) => company.publisher)
                item.developers = product.involved_companies?.filter((company) => company.developer)
                item.owned = isSwitchOn
                item.pricePaid = Number(paidPrice)
                item.releasePrice = Number(releasePrice)
            })
        }).catch(err =>
            console.error(err)
        ).finally(() => {
            const pop = StackActions.popToTop()
            navigation.dispatch(pop)
            ToastAndroid.show("Added Succesfully", ToastAndroid.SHORT)
        })
    }

    function Header() {
        return (
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
            </View>
        )
    }
    function BaseInfo() {
        return (
            <GradientImage uri={getCover()} theme={theme}>
                <View style={[styles.wrapper, { marginTop: StatusBar.currentHeight + 54 + 20 }]} >
                    <View style={{ marginRight: 20 }}>
                        {product && product.cover && <Image
                            source={{ uri: getCover() }}
                            resizeMode="contain"
                            style={{ width: 100, height: 125 }}
                            onError={(e) => console.log(e.nativeEvent.error + product.cover?.url)}
                        />}
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text variant={"titleMedium"} style={{ marginVertical: 4 }}>{product.name}</Text>
                        <Text style={{ marginVertical: 4 }}>{new Date(product.first_release_date * 1000).toLocaleDateString()}</Text>
                        <Text style={{ marginVertical: 4 }}>
                            {product.platforms?.map(e => e.name)
                                .sort((a, b) => {
                                    if (a > b) return 1
                                    if (a < b) return -1
                                    return 0
                                })
                                .join("\n")}
                        </Text>
                    </View>
                </View>
            </GradientImage>
        )
    }

    function Description() {
        return (
            <View style={[styles.wrapper]}>
                <ExpandableText numOfLines={4} value={product.summary || ""} />
            </View>
        )
    }
    function Platforms() {
        return (
            <View style={[styles.wrapper, { flexWrap: "wrap" }]}>
                {product.platforms?.map(platform => (
                    <Chip
                        key={platform.id}
                        mode={chips.includes(platform.id) ? "outlined" : "flat"}
                        icon={PlatformLogos[platform.name] || "sony-playstation"}
                        style={{ margin: 4 }}
                        onPress={() => handleChipPress(platform.id)}
                    >
                        {platform.name}
                    </Chip>
                ))}
            </View>
        )
    }
    function Companies() {
        return (
            <View style={[styles.wrapper]}>
                <View style={{flexBasis: "50%"}}>
                    <Text variant="titleMedium" style={{ marginVertical: 4, flexBasis: "50%", textAlign: "center" }}>
                        Publishers:
                    </Text>
                    <Text style={{ textAlign: "center" }}>
                        {getPublishers()}
                    </Text>
                </View>
                <View style={{flexBasis: "50%"}}>
                    <Text variant="titleMedium" style={{ marginVertical: 4, flexBasis: "50%", textAlign: "center" }}>
                        Developers:
                    </Text>
                    <Text style={{ textAlign: "center" }}>
                        {getDevelopers()}
                    </Text>
                </View>
            </View>
        )
    }

    function Owned() {
        return (
            <View style={[styles.wrapper, { justifyContent: "space-between" }]}>
                <Text>Owned</Text>
                <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header />

            {!isLoaded &&
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />}

            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }>
                <BaseInfo />
                <Description />
                <Platforms />
                <Companies />
                <Owned />
                {chips.map(id => (
                    <View key={id} style={[styles.wrapper, { flexDirection: "column" }]}>
                        <Text>{product.platforms?.find(e => e.id === id)?.name}</Text>

                        <View style={[styles.wrapper, { marginHorizontal: 0, justifyContent: "space-between" }]} >
                            <TextInput
                                label={"Release"}
                                mode="outlined"
                                keyboardType="decimal-pad"
                                right={<TextInput.Icon icon={"currency-eur"} />}
                                value={prices[id].release.toString()}
                                onChangeText={(input) => validateReleasePrice(input, id)}
                                style={{ width: "45%" }}
                            />
                            <TextInput
                                label={"Paid"}
                                mode="outlined"
                                keyboardType="decimal-pad"
                                right={<TextInput.Icon icon={"currency-eur"} />}
                                value={prices[id].paid.toString()}
                                onChangeText={(input) => validatePaidPrice(input, id)}
                                style={{ width: "45%" }}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            {!kbShown && isLoaded &&
                <FAB
                    icon={"content-save"}
                    style={{ position: "absolute", bottom: 20, right: 20 }}
                    onPress={() => saveData()}
                />
            }
        </View>
    )
}


export default AddItem;

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row"
    }
})