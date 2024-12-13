//#region import
import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FontIcons from '../baseComp/FontIcons';
//utils
import {stylesCommon} from '../../utils/CommonStyle';
import {appColors, appFonts, scaleXiPhone15} from '../../utils/AppConstants';
//#endregion

//#region DearRow
const DearRow = ({item, onPhoneClick}) => {
  const {relatedUser} = item;
  return (
    <View style={stylesDR.container}>
      <Image style={stylesDR.img} source={null} resizeMode={'cover'} />
      <View style={{flex: 1}}>
        <Text style={stylesDR.txtUserName}>{relatedUser?.firstName}</Text>
        <Text style={stylesDR.txtRelation}> {item?.relationship}</Text>
      </View>
      <TouchableOpacity onPress={onPhoneClick}>
        <FontIcons
          name={'phone'}
          size={scaleXiPhone15.eightteenH}
          color={appColors.appBlackBtn}
        />
      </TouchableOpacity>
    </View>
  );
};
const stylesDR = StyleSheet.create({
  container: {
    gap: scaleXiPhone15.tenH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleXiPhone15.tenH,
    borderRadius: scaleXiPhone15.fourH,
    backgroundColor: 'white',
    ...stylesCommon.shadow,
  },
  img: {
    width: scaleXiPhone15.sixtyH,
    height: scaleXiPhone15.sixtyH,
    borderRadius: scaleXiPhone15.sixtyH * 0.5,
    backgroundColor: appColors.appGrayBorder,
  },
  txtUserName: {
    fontSize: scaleXiPhone15.fouteenH,
    fontFamily: appFonts.bold,
    color: appColors.appBlackTitleTxt,
  },
  txtRelation: {
    fontSize: scaleXiPhone15.twelveH,
    fontFamily: appFonts.regular,
    color: appColors.appBlackBtn,
  },
});
//#endregion

//#region SettingRow
const SettingRow = ({item, onRowClick}) => {
  return (
    <TouchableOpacity
      style={stylesSR.container}
      onPress={() => onRowClick(item)}>
      <FontIcons
        name={item.leftIcon}
        size={scaleXiPhone15.twentyFourH}
        color={appColors.appBlackTitleTxt}
      />
      <View style={{flex: 1}}>
        <Text style={stylesSR.title}>{item.title}</Text>
      </View>
      <FontIcons
        name={'arrow-right'}
        size={scaleXiPhone15.twentyFourH}
        color={appColors.appBlackBtn}
      />
    </TouchableOpacity>
  );
};
const stylesSR = StyleSheet.create({
  container: {
    gap: scaleXiPhone15.tenH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleXiPhone15.sixteenH,
    borderRadius: scaleXiPhone15.fourH,
    backgroundColor: 'white',
    ...stylesCommon.shadow,
  },

  title: {
    fontSize: scaleXiPhone15.fouteenH,
    fontFamily: appFonts.bold,
    color: appColors.appBlackTitleTxt,
  },
});
//#endregion

export {DearRow, SettingRow};
