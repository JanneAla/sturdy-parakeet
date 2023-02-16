import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import AddItem from "screens/add_item";
import FindGameModal from "screens/FindGameModal";
import ProductInfoScreen from "screens/ProductInfoScreen";
import BottomTabsNav from "./BottomTabs";

export type StackParamList = {
    BottomNav: undefined;
    Add: {
      id: number
    };
    Product: {
      id: string
    };
    FindGameModal: {};
  };

const Stack = createStackNavigator<StackParamList>()

function LibraryStack() {
    return (

        <Stack.Navigator
            initialRouteName="BottomNav"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Group>
                <Stack.Screen
                    name="BottomNav"
                    component={BottomTabsNav}
                />
                <Stack.Screen
                    name="Add"
                    component={AddItem}
                />
                <Stack.Screen
                    name="Product"
                    component={ProductInfoScreen}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="FindGameModal"
                    component={FindGameModal}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default LibraryStack