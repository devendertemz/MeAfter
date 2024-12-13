import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import {appColors, appFonts, scaleXiPhone15} from '../../utils/AppConstants';

const MobileNumberField = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}> {label} </Text>

      <View style={styles.inputContainer}>
        <View style={styles.countryCodeContainer}>
          <Text style={styles.countryCode}>IN +91</Text>
          <Icon name="arrow-drop-down" size={24} color="#777" />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
  },
  labelText: {
    fontFamily: appFonts.bold,

    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlackBtn,
    paddingVertical: scaleXiPhone15.fourH,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: scaleXiPhone15.sixH,
    paddingHorizontal: scaleXiPhone15.twelveH,
    paddingVertical: scaleXiPhone15.sixH,
    borderWidth: scaleXiPhone15.oneH,
    backgroundColor: appColors.appWhiteTxtInpt,
    borderColor: appColors.appGrayBorder,
  },
  countryCodeContainer: {
    paddingRight: scaleXiPhone15.tenH,
    borderRightWidth: scaleXiPhone15.oneH,
    borderRightColor: appColors.appGrayLight,
    paddingVertical: scaleXiPhone15.tenH,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    fontFamily: appFonts.bold,

    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlackBtn,
    paddingVertical: scaleXiPhone15.fourH,
  },
  input: {
    flex: 1,
    // height: 40,
    fontSize: 16,
    padin: scaleXiPhone15.tenH,
  },
});

export default MobileNumberField;
