//#region import
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, SafeAreaView, Image} from 'react-native';
import {appColors} from '../../utils/AppConstants';
const {height, width} = Dimensions.get('window');
//assets
const meafter_White_log = require('../../assets/images/meafter_logo/meafter_White_log.png');
//#endregion

//#region Main
export default function SplashScreen({navigation, route}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);
  return (
    <SafeAreaView
      flex={1}
      style={{
        backgroundColor: appColors.appBlackBtn,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={meafter_White_log} resizeMode="cover" />
    </SafeAreaView>
  );
}
//#endregion
