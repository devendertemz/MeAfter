//#region import
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

//utils
import {appColors, appFonts, scaleXiPhone15} from '../../utils/AppConstants';
import Header from '../../components/blockComp/Header';
//#endregion

//#region Main
export default function WebViewPage({navigation, route}) {
  const onBackBtnPress = navigation => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.safearea}>
      <Header
        title={route.params.headerTxt}
        onBackBtnPress={() => onBackBtnPress(navigation)}
      />
      <WebView
        style={styles.webView}
        originWhitelist={['*']}
        source={{
          uri: route.params.url,
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,

    backgroundColor: appColors.appWhitePageBg,
  },
  webView: {
    paddingHorizontal: scaleXiPhone15.sixteenH,
    width: '100%',
    height: '100%',
    backgroundColor: appColors.appWhitePageBg,
  },
});
//#endregion
