/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import { name as appName } from './app.json';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from "./src/hooks/useTheme";



const DarkTheme = {
    ...NavigationDarkTheme,
    ...MD3DarkTheme
}
MD3DarkTheme.colors.primary = "#F02475"
MD3DarkTheme.colors.primaryContainer = "#F02475"
MD3DarkTheme.colors.surface = "#292832"
NavigationDarkTheme.colors.background = "#292832"

export default function Main() {

    const theme = useTheme()

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <PaperProvider>
                    <NavigationContainer theme={{colors: theme}}>
                        <App />
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

AppRegistry.registerComponent(appName, () => Main);
