import React from "react";
import { View } from "react-native";
import { FAB, overlay, Portal } from "react-native-paper";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ProductsList from "screens/main_list/components/ProductList";
import StackParamList from "interfaces/stack";
import useSearch from "hooks/useSearch";
import Searchbar from "components/SearchBar";
import { useTheme } from "hooks/useTheme";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import LibraryBottomSheet from "./components/LibraryBottomSheet";

type Props = {
    route: RouteProp<StackParamList, 'Main'>,
    navigation: NavigationProp<any, any>
}

function LibraryScreen({ route, navigation }: Props) {

    const [fabVisible, setFabVisible] = React.useState(true)
    const { searchText, setSearchText, clearSearchbar } = useSearch();
    const bottomSheetRef = React.useRef<BottomSheet | null>(null)
    const theme = useTheme()

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                searchText={searchText}
                onChangeText={setSearchText}
                clearSearchbar={clearSearchbar}
                placeholder="Search"
                leftIcon="magnify"
                theme={theme}
                rightIcons={[{
                    iconName: 'filter-variant',
                    onPress: () => bottomSheetRef.current?.expand(),
                }]}
            />
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: overlay(5, theme.background)
            }} />
            <ProductsList searchQuery={searchText} />
            {fabVisible && <FAB
                icon={"plus"}
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                }}
                onPress={() => navigation.navigate("FindGameModal")}
                theme={theme}
            />}
            <Portal>
                <LibraryBottomSheet bottomSheetRef={bottomSheetRef} />
            </Portal>
        </View>
    )
}

export default LibraryScreen;