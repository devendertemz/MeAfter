//#region import
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import FontIcons from '../baseComp/FontIcons';
import {scaleXiPhone15, appColors, appFonts} from '../../utils/AppConstants';
//#endregion

const DobField = ({icon, placeholder, value, onChangeText, label, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}> {label} </Text>
      <View style={styles.containerTxtInput}>
        <TextInput
          editable={false}
          style={styles.txtinput}
          placeholder={placeholder}
          placeholderTextColor={appColors.appGrayLight}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onPress}>
          <FontIcons
            color={appColors.appGrayLight}
            name={icon}
            size={scaleXiPhone15.twentyH}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
  },
  containerTxtInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleXiPhone15.fourH,
    paddingHorizontal: scaleXiPhone15.twelveH,
    paddingVertical: scaleXiPhone15.twelveH,
    borderWidth: scaleXiPhone15.oneH,
    backgroundColor: appColors.appWhiteTxtInpt,
    borderColor: appColors.appGrayBorder,
  },
  txtinput: {
    flex: 1,
    fontFamily: appFonts.regular,
    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlack,
  },
  labelText: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlackBtn,
    paddingVertical: scaleXiPhone15.fourH,
  },
});

export default DobField;
