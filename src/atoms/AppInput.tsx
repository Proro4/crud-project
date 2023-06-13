import React, {FC, useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import {THEME} from '../assets/theme';

interface AppInputProps extends TextInputProps {
  onTextChange: Function;
  type: 'text' | 'textarea';
  value: string;
  placeholder: string;
  touched?: boolean;
}

export type Error = {
  exists: boolean;
  message: string;
};

const AppInput: FC<AppInputProps> = ({
  onTextChange,
  value,
  type,
  placeholder,
  touched,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const [error, setError] = useState<Error>({exists: false, message: ''});

  const inputRef = useRef<TextInput>(null);
  const top = useRef(new Animated.Value(14)).current;
  const left = useRef(new Animated.Value(26)).current;

  const onInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    const text: string = event.nativeEvent.text;
    onTextChange(text);
    if (isTouched) {
      validate(text);
    }
  };

  useEffect(() => {
    touched && setIsTouched(touched);
    touched && validate(value);
  }, [touched]);

  const validate = (text: string): void => {
    if (text.length === 0) {
      setError({
        exists: true,
        message: 'This input can`t be empty!',
      });
    } else {
      setError({exists: false, message: ''});
    }
  };

  const isFocusedOrDirty = (): boolean => {
    const textValue = value ? value : '';
    return isFocused || textValue.trim() !== '';
  };
  const getActiveFieldColor = (): string => {
    return error.exists ? THEME.color.red : THEME.color.dark;
  };

  const onInputFocus = (): void => {
    setIsFocused(true);
    setIsTouched(true);
    animateOnFocus();
  };

  useEffect(() => {
    isFocusedOrDirty() && animateOnFocus();
  }, [value]);

  const animateOnFocus = (): void => {
    Animated.timing(top, {
      toValue: -18,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(left, {
      toValue: 16,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const onInputBlur = (): void => {
    setIsFocused(false);
    animateOnBlurIfEmpty();
  };

  const animateOnBlurIfEmpty = (): void => {
    const textValue = value ? value : '';
    if (textValue.trim() === '') {
      Animated.timing(top, {
        toValue: 14,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(left, {
        toValue: 26,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View>
      <TextInput
        value={value}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        multiline={type === 'textarea'}
        style={[
          type !== 'textarea' ? styles.input : styles.textarea,
          isFocused && styles.focusedInput,
          error.exists && styles.error,
          type !== 'textarea' ? {maxHeight: 42} : {textAlignVertical: 'top'},
        ]}
      />

      <Animated.Text
        selectable={false}
        style={[
          styles.placeholder,
          isFocusedOrDirty() && styles.placeholderActive,
          {
            color: isFocusedOrDirty()
              ? getActiveFieldColor()
              : THEME.color.white,
            top: top,
            left: left,
          },
        ]}
        onPress={() => {
          inputRef.current?.focus();
        }}>
        {placeholder}
      </Animated.Text>
      {error.exists && <Text style={styles.textError}>{error.message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: THEME.spacing.spacing10,
    borderRadius: 10,
    paddingVertical: THEME.spacing.spacing12,
    color: THEME.color.black,
    backgroundColor: THEME.color.darkGray,
    borderBottomColor: THEME.color.dark,
    lineHeight: 21,
    minHeight: 50,
  },
  focusedInput: {
    backgroundColor: THEME.color.darkGray,
  },
  placeholder: {
    position: 'absolute',
    color: THEME.color.dark,
    fontSize: 16,
    lineHeight: 21,
  },
  placeholderActive: {
    fontSize: 12,
  },
  error: {
    backgroundColor: THEME.color.red10,
  },
  textError: {
    color: THEME.color.red,
    fontSize: 11,
    lineHeight: 12,
  },
  textarea: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: THEME.spacing.spacing10,
    borderRadius: 10,
    paddingVertical: THEME.spacing.spacing12,
    color: THEME.color.black,
    backgroundColor: THEME.color.darkGray,
    lineHeight: 21,
    minHeight: 100,
    maxHeight: 120,
  },
});

export default AppInput;
