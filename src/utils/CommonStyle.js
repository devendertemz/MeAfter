import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import {
  scaleXiPhone15,
  appColors,
  appFonts,
  checkForTablet,
} from './AppConstants';

const stylesCommon = StyleSheet.create({
  txtTitle: {
    fontSize: scaleXiPhone15.twentyFourH,
    fontFamily: appFonts.bold,
    color: appColors.appBlackTitleTxt,
    textAlign: 'left',
    width: '100%',
    textTransform: 'uppercase',
  },
  txtSubTitle: {
    fontSize: scaleXiPhone15.eightteenH,
    fontFamily: appFonts.regular,
    color: appColors.appBlackBtn,
    textAlign: 'left',
  },
  txtLblTitle: {
    fontSize: scaleXiPhone15.sixteenH,
    fontFamily: appFonts.regular,
    color: appColors.appBlackBtn,
    textAlign: 'left',
  },
  txtHomeLbl: {
    fontSize: scaleXiPhone15.fouteenH,
    fontFamily: appFonts.regular,
    color: appColors.appBlackBtn,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: scaleXiPhone15.oneH},
    shadowOpacity: scaleXiPhone15.oneH * 0.25,
    shadowRadius: scaleXiPhone15.oneH,
    elevation: scaleXiPhone15.oneH,
  },
});

export {stylesCommon};
