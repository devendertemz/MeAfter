import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {appColors, scaleXiPhone15} from '../../utils/AppConstants';

const RadioButton = ({selected, item, onPress}) => {
  //selected = true;
  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => onPress(item)}>
      <View style={[selected ? styles.radioSelCircle : styles.radioCircle]}>
        {selected ? <View style={styles.selectedCircle} /> : null}
      </View>
      <Text style={styles.radioText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: scaleXiPhone15.twentyFourH,
    height: scaleXiPhone15.twentyFourH,
    backgroundColor: appColors.appGrayBorder,
    borderRadius: scaleXiPhone15.twentyFourH / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelCircle: {
    width: scaleXiPhone15.twentyFourH,
    height: scaleXiPhone15.twentyFourH,
    borderColor: appColors.appBlackTitleTxt,
    borderRadius: scaleXiPhone15.twentyFourH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  selectedCircle: {
    width: scaleXiPhone15.twelveH,
    height: scaleXiPhone15.twelveH,
    borderRadius: scaleXiPhone15.twelveH / 2,
    backgroundColor: appColors.appBlackTitleTxt,
  },

  radioText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default RadioButton;
