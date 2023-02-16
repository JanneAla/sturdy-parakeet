import React from "react"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LibraryScreen from "screens/main_list";
import { useTheme } from "hooks/useTheme";
import SettingsScreen from "screens/settings/SettingsScreen";
import StatisticsScreen from "screens/StatisticsScreen";
const Color = require('color')

export type BottomTabsParamList = {
    Library: undefined,
    Settings: undefined,
    Statistics: undefined
}

const BottomTabs = createMaterialBottomTabNavigator<BottomTabsParamList>()

function BottomTabsNav() {
    const theme = useTheme()

    return (

        <BottomTabs.Navigator
            barStyle={{
                backgroundColor: Color(theme.surface)
                    .mix(Color(theme.primary), 0.08)
                    .rgb()
                    .string(),
            }}
            theme={{ colors: theme }}
            activeColor={theme.onSecondaryContainer}
        >
            <BottomTabs.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarIcon: 'book-variant-multiple'
                }}
            />
            <BottomTabs.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    tabBarIcon: 'chart-bar'
                }}
            />
            <BottomTabs.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: 'cog'
                }}
            />
        </BottomTabs.Navigator>

    )
}

export default BottomTabsNav