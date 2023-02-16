import { Appearance } from 'react-native';
import { defaultTheme } from '../theme/themes';
import { MD3ThemeType } from 'theme/Types';
import { useMemo } from 'react';
import useAsyncStorage from './useAsyncStorage';

export const useTheme = (): MD3ThemeType => {
    const { getItem } = useAsyncStorage()

    let appTheme: MD3ThemeType
    getItem<MD3ThemeType>("APP_THEME").then(e => appTheme = e)

    const theme: MD3ThemeType = useMemo(() => {
        let colors =
            appTheme ||
            ((Appearance.getColorScheme() === 'dark'
                ? defaultTheme.dark
                : defaultTheme.light) as MD3ThemeType);
        return colors;
    }, [appTheme?.id]);

    return theme;
};