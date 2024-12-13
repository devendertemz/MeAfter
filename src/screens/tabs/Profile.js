//#region import
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';

//#endregion

export default function Profile({navigation, route}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
      }}>
      <Text>Profile.js screen</Text>
    </SafeAreaView>
  );
}
