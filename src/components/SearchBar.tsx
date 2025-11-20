import React, { useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { vh, vw } from '../utils/dimensions';

type Props = {
  value?: string;
  iconName?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onPressIcon?: () => void;
  placeholder?: string;
  editable?: boolean;
};

const SearchBar = ({
  value = '',
  onChangeText,
  onPress,
  onPressIcon,
  iconName,
  placeholder = 'Search...',
  editable = true,
}: Props) => {
  const showClear = Boolean(value);

  const handleClear = useCallback(() => {
    onChangeText?.('');
  }, [onChangeText]);

  // Wrapper: Pressable when not editable
  const Wrapper = editable ? View : Pressable;
  const wrapperProps = editable ? {} : { onPress };

  return (
    <Wrapper style={styles.container} {...wrapperProps}>
      {/* Left Search Icon */}
      <Pressable onPress={onPressIcon}>
        <Icon
          name={iconName || 'search-outline'}
          size={vw(20)}
          color="#666"
          style={styles.leftIcon}
        />
      </Pressable>

      {/* Text Input */}
      <TextInput
        style={styles.input}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...(!editable ? { pointerEvents: 'none' } : { autoFocus: true })}
      />

      {/* Clear Button */}
      {showClear && editable && (
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Icon name="close-circle" size={vw(18)} color="#999" />
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: vw(12),
    paddingVertical: vh(10),
    backgroundColor: '#f2f3f5',
    borderRadius: vw(20),
    height: vh(50),
    alignItems: 'center',
    margin: vw(16),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingLeft: vw(4),
    fontSize: vw(16),
    color: '#111',
  },
  leftIcon: {
    marginRight: vw(6),
  },
  clearBtn: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(4),
  },
});
