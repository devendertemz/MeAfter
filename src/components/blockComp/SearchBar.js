//#region import
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {appColors, appFonts, scaleXiPhone15} from '../../utils/AppConstants';
import FontIcons from '../baseComp/FontIcons';
//#endregion

//#region LoopzSearchBar
const AppSearchBarNormal = props => {
  return (
    <View style={styleLoopz.container}>
      <TextInput
        style={styleLoopz.text}
        autoCorrect={false}
        spellCheck={false}
        allowFontScaling={false}
        numberOfLines={1}
        placeholder={props.placeholder}
        placeholderTextColor="#999"
        value={props.sch}
        onChangeText={props.setSearch}
      />
      <TouchableOpacity
        onPress={props.onClearClick}
        style={styleLoopz.containerIcon}>
        <FontIcons
          name={props.icon}
          size={scaleXiPhone15.twentyFourH}
          color={appColors.appGrayBorder}
        />
      </TouchableOpacity>
    </View>
  );
};
const styleLoopz = StyleSheet.create({
  container: {
    gap: scaleXiPhone15.eightH,
    padding: scaleXiPhone15.eightH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: appColors.appGrayLight,
    borderWidth: 0.2,
    borderRadius: scaleXiPhone15.fourH,
    backgroundColor: 'white',
  },
  text: {
    width: '90%',
    paddingVertical: scaleXiPhone15.tenH,
    paddingHorizontal: scaleXiPhone15.tenH,
    borderRadius: scaleXiPhone15.eightH,
    fontSize: scaleXiPhone15.fouteenH,
    fontFamily: appFonts.regular,
    color: appColors.appBlackBtn,
    textAlign: 'left',
    // backgroundColor: 'red',
  },
  containerIcon: {
    width: '10%',
    //backgroundColor: 'yellow',
  },
});
//#endregion

export {AppSearchBarNormal};
