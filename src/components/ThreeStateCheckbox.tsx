import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const color = require('color')

import { MD3ThemeType } from '../theme/Types';

interface CheckboxProps {
  label: string;
  status: 'checked' | 'crossed' | 'unchecked';
  onPress?: () => void;
  disabled?: boolean;
  theme: MD3ThemeType;
  viewStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const ThreeStateCheckbox: React.FC<CheckboxProps> = ({
  label,
  status,
  theme,
  disabled,
  onPress,
  viewStyle,
  labelStyle,
}) => (
  <Pressable
    android_ripple={{ color: color(theme.primary).alpha(0.12).string() }}
    style={[styles.pressable, viewStyle]}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={[styles.checkbox, {
      borderColor: status !== "unchecked" ? theme.primary : theme.textColorPrimary,
      backgroundColor: status !== "unchecked" ? theme.primary : "transparent",
      
    }]}>
      {status != 'unchecked' &&
        <MaterialCommunityIcons
          name={
            status === "checked"
              ? 'check'
              : status === "crossed"
                ? 'close'
                : 'alert-circle-outline'
          }
          size={20}
          color={theme.background}
        />}
    </View>
    <Text style={[styles.defaultLabel, { color: theme.onSurface }, labelStyle]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 16 + 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: "white"
  },
  checkbox: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 3,
  },
  icon: {
    position: 'absolute',
    left: 24,
    alignSelf: 'center',
  },
  defaultLabel: {
    marginLeft: 12,
  },
});