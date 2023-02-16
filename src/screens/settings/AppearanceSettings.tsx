import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, Text } from 'react-native-paper'
import { useTheme } from 'hooks/useTheme'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

function SettingsScreen({ route, navigation }) {

    const theme = useTheme()
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            margin: 20
        }}>

            <Divider bold={true} />
            
            <View
                style={styles.item}
            >
                <MaterialCommunityIcon name='palette' size={24} style={styles.icon} color={theme.primary} />
                <Text variant='bodyLarge'>Appearance</Text>
            </View>
            <View
                style={styles.item}
            >
                <MaterialCommunityIcon name='cog' size={24} style={styles.icon} color={theme.primary} />
                <Text variant='bodyLarge'>Settings</Text>
            </View>

        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 16,
        // borderWidth: 1,
        // borderColor: "white"
    },
    icon: {
        marginRight: 20
    }
})