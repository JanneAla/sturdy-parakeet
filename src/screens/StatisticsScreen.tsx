import useLibrary from 'hooks/useLibrary'
import { useTheme } from 'hooks/useTheme'
import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { overlay, Text } from 'react-native-paper'

function StatisticsScreen() {
    const { library } = useLibrary()
    const theme = useTheme()
    
    const [paid, setPaid] = useState(0)
    const [release, setRelease] = useState(0)

    useEffect(() => {
        setPaid(0)
        setRelease(0)
        library.forEach((item) => {
            setRelease(old => old + item.releasePrice)
            setPaid(old => old + item.pricePaid)
        })
    }, [library])

    return (
        <View style={{
            flex: 1,
            marginHorizontal: 20,
        }}>
            <View style={{
                zIndex: 1,
                height: StatusBar.currentHeight + 54,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "flex-end",
            }}>
                <Text variant='headlineSmall'>Statistics</Text>
            </View>

            <View style={[styles.column, {
                backgroundColor: overlay(5, theme.background)
            }]}>
                <View style={styles.columnItem}>
                    <Text>{library.length}</Text>
                    <Text variant='titleMedium'>Items in Library</Text>
                </View>
            </View>

            <View style={[styles.column, {
                backgroundColor: overlay(5, theme.background)
            }]}>
                <View style={[styles.columnItem,]}>
                    <Text>{release} €</Text>
                    <Text variant='titleMedium'>Total Release Price</Text>
                </View>
                <View style={[styles.columnItem,]}>
                    <Text>{paid} €</Text>
                    <Text variant='titleMedium'>Total Paid</Text>
                </View>
            </View>

            <View style={[styles.column, {
                backgroundColor: overlay(5, theme.background)
            }]}>
                <View style={styles.columnItem}>
                    <Text>{paid / library.length} €</Text>
                    <Text variant='titleMedium'>Average Paid</Text>
                </View>
            </View>
        </View>
    )
}

export default StatisticsScreen

const styles = StyleSheet.create({
    column: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 5
    },
    columnItem: {
        alignItems: "center",
        flex: 1
    },
})