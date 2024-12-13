//#region import
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
const { height, width } = Dimensions.get("window");
import {
  initConnection,
  isIosStorekit2,
  endConnection,
  getProducts,
  requestPurchase,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
} from "react-native-iap";
const productIds = ["com.pa.meafterpremium"];
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
//blockComp
import { ImageView } from "../../components/blockComp/ImageView";
import TextInputField from "../../components/blockComp/TextInputField";
import PasswordInputField from "../../components/blockComp/PasswordInputField";
//utils
import { stylesCommon } from "../../utils/CommonStyle";
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { showMsgAlert } from "../../utils/Alert";
//api
import GlobalValue from "../../api/GlobalVar";
import { showAPIError } from "../../api/Config";
//assets
const meafter_logo = require("../../assets/images/meafter_logo/meafter_logo.png");
const login_Img = require("../../assets/images/login/login_Img.png");
//#endregion

//#region Main
export default function Purchase({ navigation, route }) {
  const [products, setProducts] = useState([]);

  //#region useEffect
  useEffect(() => {
    // Initialize the IAP module
    const initIAP = async () => {
      try {
        await initConnection();
        console.log("\u001b[1;33mP.js | isIosStorekit2 = ", isIosStorekit2());
        const availableProducts = await getProducts({ skus: productIds });
        console.log(
          "\u001b[1;33mP.js | availableProducts = ",
          JSON.stringify(availableProducts)
        );
        setProducts(availableProducts);
      } catch (err) {
        console.error("initIAP Error = ", err);
      }
    };

    // Add purchase listeners
    const purchaseUpdateSubscription = purchaseUpdatedListener((purchase) => {
      console.log("Purchase updated", purchase);
      if (purchase.transactionReceipt) {
        // Process the receipt and confirm purchase
        finishTransaction(purchase);
        Alert.alert("Purchase successful!", "Thank you for your purchase.");
      }
    });

    const purchaseErrorSubscription = purchaseErrorListener((error) => {
      console.warn("Purchase error", error);
      Alert.alert("Purchase failed", error.message);
    });

    initIAP();

    // Cleanup listeners on unmount
    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
      endConnection();
      console.log("\u001b[1;33mP.js | unmount endConnection()");
    };
  }, []);
  //#endregion

  //#region action
  const onPurchaseClick = async () => {
    if (products.length === 1) {
      const prodId = products[0].productId;
      console.log("\u001b[1;33mP.js | purchase prodId  = ", prodId);
      try {
        await requestPurchase({
          sku: prodId,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof PurchaseError) {
          console.error({
            message: `[${error.code}]: ${error.message}`,
            error,
          });
        } else {
          console.error({ message: "handlePurchase", error });
        }
      }
    } else {
      showMsgAlert("No purchase product found");
    }
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <ImageView imgName={login_Img} marginTop={"20%"} />
      <ImageView imgName={meafter_logo} marginTop={"10%"} />
      <Text style={[stylesCommon.txtTitle, { textAlign: "center" }]}>
        {"Unlock Premium Features"}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <Text style={stylesCommon.txtHomeLbl}>
          Unlock all premium features forever with a one-time payment of&nbsp;
        </Text>
        <Text style={[stylesCommon.txtHomeLbl, { fontFamily: appFonts.black }]}>
          $9.00.
        </Text>
      </Text>
      <BtnApp title={"Continue to Checkout"} onPress={onPurchaseClick} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    margin: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.sixteenH,
    alignItems: "center",
    backgroundColor: appColors.appWhitePageBg,
  },
});
//#endregion
