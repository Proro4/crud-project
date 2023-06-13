import React, {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import {THEME} from '../assets/theme';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant: 'small' | 'primary' | 'redSmall';
  disabled?: boolean;
}

const AppButton: FC<AppButtonProps> = ({
  title,
  variant,
  disabled = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        !disabled && variant === 'primary'
          ? styles.buttonPrimary
          : styles.buttonLight,
        disabled && styles.buttonDisabled,
        variant === 'small' && styles.small,
        variant === 'redSmall' && styles.redSmall,
      ]}>
      <Text
        style={[
          styles.buttonText,
          disabled && styles.textDisabled,
          variant === 'small' && styles.textSmall,
          variant === 'redSmall' && styles.textRedSmall,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 14,
    color: THEME.color.white,
    lineHeight: 17.64,
  },
  buttonPrimary: {
    backgroundColor: THEME.color.lightGreen,
    color: THEME.color.white,
    minHeight: 50,
    maxHeight: 50,
  },
  buttonLight: {
    backgroundColor: THEME.color.lightGreen,
  },
  buttonDisabled: {
    backgroundColor: THEME.color.transparentLight,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textDark: {
    color: THEME.color.dark,
  },
  textDisabled: {
    color: THEME.color.black,
  },
  textSmall: {
    fontWeight: '400',
    color: THEME.color.black,
    fontSize: 12
  },
  redSmall: {
    backgroundColor: THEME.color.red10,
    minHeight: 27,
    maxWidth: '30%',
  },
  small: {
    minHeight: 27,
    maxWidth: '30%',
  },
  textRedSmall: {
    color: THEME.color.red,
    lineHeight: 14,
    fontSize: 12,
  },
});

export default AppButton;
