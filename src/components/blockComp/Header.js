//#region import
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//package
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors, appFonts, scaleXiPhone15} from '../../utils/AppConstants';
import {stylesCommon} from '../../utils/CommonStyle';
import FontIcons from '../baseComp/FontIcons';
//#endregion

const Header = ({isBackDisable = false, title, onBackBtnPress}) => {
  if (isBackDisable) {
    return (
      <View style={styles.headerContainer}>
        <Text style={[styles.title, {flex: 1}]}>{title}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{flex: 0.2}} onPress={onBackBtnPress}>
          <FontIcons
            name={'back'}
            size={scaleXiPhone15.twentyH}
            color={appColors.appWhiteTxtInpt}
          />
        </TouchableOpacity>
        <Text style={[styles.title, {flex: 0.8}]}>{title}</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleXiPhone15.sixteenH,
    paddingVertical: scaleXiPhone15.sixteenH,
    backgroundColor: appColors.appBlackBtn,
  },
  title: {
    fontSize: scaleXiPhone15.eightteenH,
    fontFamily: appFonts.bold,
    color: appColors.appWhiteTxtInpt,
    textAlign: 'left',
  },
});

export default Header;
