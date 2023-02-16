import { RouteProp, NavigationProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import StackParamList from "interfaces/stack";
import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

interface CustomOptions extends StackNavigationOptions {
    canGoBack: boolean
}

type Props = {
    route: RouteProp<StackParamList, 'Add'>,
    navigation: NavigationProp<StackParamList, 'Add'>
    options: CustomOptions
}



function HeaderBar({ route, navigation, options }: Props) {
    return (
        <Appbar.Header style={{ marginVertical: 5 }}>
            {
                options.canGoBack &&
                <Appbar.BackAction onPress={navigation.goBack} />
            }
            {
                options.title && !options.headerTitle &&
                <Appbar.Content style={{ }} title={options.title} />
            }
            {
                options.headerTitle &&
                <View style={{ flex: 1, paddingRight: options.canGoBack ? 20 : 0 }}>
                    {options.headerTitle}
                </View>
            }
        </Appbar.Header>
    )
}

export default HeaderBar