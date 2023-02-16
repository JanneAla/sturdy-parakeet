import React, { useEffect } from "react";
import { View, FlatList, Alert, ToastAndroid } from "react-native";
import { database } from "db";
import MainListItem from "./MainListItem";
import { useLibrarySettings } from "hooks/useLibrarySettings";
import { useTheme } from "hooks/useTheme";
import useLibrary from "hooks/useLibrary";
import { RefreshControl } from "react-native-gesture-handler";

type Props = {
    searchQuery: string,
}
function ProductsList(props: Props) {

    const { searchQuery } = props
    const [refreshing, setRefreshing] = React.useState<boolean>(false)

    const { library, fetchLibraryItems } = useLibrary()
    const theme = useTheme()

    const onLongPress = (name: string, id: string) => {
        Alert.alert("Delete", `Do you want to delete ${name}`, [
            {
                text: "Cancel"
            },
            {
                text: "Confirm",
                onPress: async () => {
                    await database.write(async () => {
                        await database
                            .get("igdbProducts")
                            .find(id)
                            .then(res => res.destroyPermanently())
                            .catch(e => console.error(e))
                            .finally(() => ToastAndroid.show("Deleted Succesfully", ToastAndroid.SHORT))
                    }).catch(e => console.error(e))
                }
            },
        ], { cancelable: true })
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchLibraryItems}
                    />
                }
                data={library.filter(
                    item => item.name.toUpperCase().includes(searchQuery.toUpperCase())
                )}
                extraData={[library]}
                renderItem={({ item, index }) => <MainListItem product={item} onLongPress={onLongPress} theme={theme} />}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    )
}

export default ProductsList;