//#region import
import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
//baseComp
import CustomLoader from "../../components/baseComp/CustomLoader";
//block
import { AppSearchBarNormal } from "../../components/blockComp/SearchBar";
import { DearRow } from "../../components/blockComp/CustomRow";
//utils
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { stylesCommon } from "../../utils/CommonStyle";
import { DearListEmpty } from "../../utils/Helper";
//api
import { GetDearList } from "../../api/GetRequest";
import { showAPIError } from "../../api/Config";

//#endregion

//#region Main
export default function Dear({ navigation, route }) {
  //#region useState
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [sch, setSearch] = useState("");
  const [arrDear, setDear] = useState([]);
  //#endregion

  //#region api
  useEffect(() => {
    GetDearListAPICall(setDear, setLoader);
    return () => {
      console.log("\u001b[1;32mD.js : useEffect unmount ");
    };
  }, []);
  const onRefresh = React.useCallback(() => {
    GetDearListAPICall(setDear, setRefreshing);
  }, []);
  //#endregion

  //#region action
  const onSearchBarCrossClick = () => {
    setSearch("");
  };
  const onPhonePress = () => {};
  const onAddDearClick = () => {
    navigation.navigate("AddDear");
  };

  //#endregion

  //#region JSX
  const renderFlatListRow = ({ item }) => {
    return <DearRow item={item} onPhoneClick={onPhonePress} />;
  };
  const renderFlatListSep = () => {
    return <View style={{ height: scaleXiPhone15.sixteenH }} />;
  };
  const renderFlatListEmpty = () => {
    if (loader) {
      return <CustomLoader color={appColors.appBlackBtn} />;
    } else {
      return <DearListEmpty />;
    }
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <FlatListHeader
        sch={sch}
        setSearch={setSearch}
        onCrossClick={onSearchBarCrossClick}
        onAddDearClick={onAddDearClick}
      />
      <FlatList
        style={{ padding: scaleXiPhone15.sixteenH }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item, index) => index.toString()}
        data={arrDear}
        renderItem={renderFlatListRow}
        ItemSeparatorComponent={renderFlatListSep}
        ListEmptyComponent={renderFlatListEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: appColors.appWhitePageBg,
  },
  containerScroll: {
    paddingHorizontal: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.fourH,
  },
});
//#endregion

//#region FlatListHeader
const FlatListHeader = (prop) => {
  return (
    <View style={stylesFH.container}>
      <View style={stylesFH.containerTop}>
        <Text style={stylesCommon.txtSubTitle}>All Dears</Text>
        <TouchableOpacity
          style={stylesFH.containerBtn}
          onPress={prop.onAddDearClick}
        >
          <Text style={stylesFH.txtBtn}>+ Add New Dears</Text>
        </TouchableOpacity>
      </View>
      <AppSearchBarNormal
        placeholder={"Search.."}
        icon="calendar"
        sch={prop.sch}
        setSearch={prop.setSearch}
        onClearClick={prop.onCrossClick}
      />
    </View>
  );
};
const stylesFH = StyleSheet.create({
  container: {
    padding: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.sixteenH,
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerBtn: {
    borderRadius: scaleXiPhone15.fourH,
    justifyContent: "center",
    padding: scaleXiPhone15.twelveH,
    backgroundColor: appColors.appBlackBtn,
  },
  txtBtn: {
    fontSize: scaleXiPhone15.fouteenH,
    fontFamily: appFonts.regular,
    color: "white",
    textAlign: "center",
  },
});
//#endregion

//#region Api
async function GetDearListAPICall(setDear, setLoader) {
  setLoader(true);
  await GetDearList()
    .then((res) => {
      setLoader(false);
      console.log("\u001b[1;32mD.js : RES Get  = ", JSON.stringify(res.data));
      setDear(res.data);
    })
    .catch((error) => {
      setLoader(false);
      //showAPIError(error, "Error : Dear List");
    });
}
//#endregion
