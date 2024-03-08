import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import React, { useState } from 'react';

interface CheckBoxWithTitleProps {
  disabled: boolean
  onToggle: (isChecked: boolean) => void
}

const CheckBoxWithTitle = ({ disabled, onToggle }: CheckBoxWithTitleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheckbox() {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  const content = (
    <View style={styles.rootContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={toggleCheckbox}
        style={styles.touchableContainer}
      >
        <View style={styles.checkboxContainer}>
          <CheckBox
            boxType='square'
            value={isChecked}
            disabled={disabled}
          />
        </View>
        <Text>Only show caught Pokemon</Text>
      </TouchableOpacity>
    </View>
  )

  return content
}

export default CheckBoxWithTitle

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    marginHorizontal: 26,
    alignItems: 'center',
    paddingBottom: 24,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    marginRight: 2,
  },
})