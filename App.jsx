/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//#region import

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//baseComp
import FontIcons from './src/components/baseComp/FontIcons';
//utils
import {appColors, appFonts, scaleXiPhone15} from './src/utils/AppConstants';
//files import
//auth
import SplashScreen from './src/screens/auth/SplashScreen';
import Login from './src/screens/auth/Login';
import Reg from './src/screens/auth/Reg';
import ProfileUpdate from './src/screens/auth/ProfileUpdate';
import VerifyCode from './src/screens/auth/VerifyCode';
import ForgetPassword from './src/screens/auth/ForgetPassword';
import SetNewPassword from './src/screens/auth/SetNewPassword';
//import Purchase from "./src/screens/auth/Purchase";

//tabs
import Home from './src/screens/tabs/Home';
import Dear from './src/screens/tabs/Dear';
import Setting from './src/screens/tabs/Setting';
import Profile from './src/screens/tabs/Profile';
//dear
import AddDear from './src/screens/dear/AddDear';
import VideoCall from './src/screens/dear/VideoCall';
//setting
import ChangePassword from './src/screens/setting/ChangePassword';
import WebViewPage from './src/screens/setting/WebViewPage';
//assets
const meafter_nav_white = require('./src/assets/images/meafter_nav_white/meafter_nav_white.png');
//#endregion

//#region Main
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reg"
          component={Reg}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyCode"
          component={VerifyCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetNewPassword"
          component={SetNewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileUpdate"
          component={ProfileUpdate}
          options={{
            headerLeft: () => <NavBarLeftHeader />,
            title: null,
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: appColors.appBlackBtn,
            },
          }}
        />
        <Stack.Screen
          name="AddDear"
          component={AddDear}
          options={{
            headerShown: true,
            title: null,
            headerTintColor: 'white', // Change back button color
            headerBackTitle: 'Add Dear',
            headerStyle: {
              backgroundColor: appColors.appBlackBtn,
            },
          }}
        />
        {/* <Stack.Screen
          name="Purchase"
          component={Purchase}
          options={{
            headerShown: true,
            title: null,
            headerTintColor: "white", // Change back button color
            headerBackTitle: "Unlock",
            headerStyle: {
              backgroundColor: appColors.appBlackBtn,
            },
          }}
        /> */}
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: true,
            title: 'Change Password',
            headerTintColor: 'white', // Change back button color
            headerBackTitle: 'Change Password',
            headerStyle: {
              backgroundColor: appColors.appBlackBtn,
            },
          }}
        />
        <Stack.Screen
          name="WebViewPage"
          component={WebViewPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BtmTabs"
          component={BtmTabs}
          options={{
            headerLeft: () => <NavBarLeftHeader />,
            title: null,
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: appColors.appBlackBtn,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//#endregion

//#region NavBarLeftHeader
const NavBarLeftHeader = () => {
  return (
    <Image source={meafter_nav_white} tintColor={'white'} resizeMode="cover" />
  );
};
//#endregion

//#region BtmTabs
const tabBarStyle = {
  tabBarShowLabel: true,
  tabBarLabelPosition: 'beside-icon',
  tabBarActiveTintColor: appColors.appWhiteTxtInpt,
  tabBarInactiveTintColor: appColors.appBlackTitleTxt,
  tabBarInactiveBackgroundColor: appColors.appWhiteTxtInpt,
};
function BtmTabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        ...tabBarStyle,
        tabBarItemStyle: {
          margin: scaleXiPhone15.eightH,
          borderRadius: scaleXiPhone15.fourH,
          backgroundColor: appColors.appBlackBtn,
        },
        tabBarStyle: {
          backgroundColor: appColors.appWhiteTxtInpt,
        },
        tabBarLabelStyle: {
          fontSize: scaleXiPhone15.fouteenH,
          fontFamily: appFonts.regular,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconColor = focused
            ? appColors.appWhiteTxtInpt
            : appColors.appBlackTitleTxt;
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Dear') {
            iconName = focused ? 'dear' : 'dear';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          return (
            <FontIcons
              color={iconColor}
              name={iconName}
              size={scaleXiPhone15.sixteenH}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Dear" component={Dear} />
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
//#endregion

export default App;
