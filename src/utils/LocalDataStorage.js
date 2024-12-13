import AsyncStorage from "@react-native-async-storage/async-storage";

const accessTokenKey = "ACCESSTOKEN";
const emailKey = "EMAIL";
const FCMToken = "FCMTOKEN";

//#region access token
export const saveAccessToken = async (accessToken) => {
  try {
    await AsyncStorage.setItem(accessTokenKey, String(accessToken));
  } catch (error) {
    console.error("Error : While saving accessTokenKey :" + error);
  }
};
export const getAccessToken = async () => {
  try {
    let value = await AsyncStorage.getItem(accessTokenKey);
    return value;
  } catch (error) {
    console.error("Error : While retrieving accessTokenKey :" + error);
  }
};
export const removeAccessToken = async () => {
  await AsyncStorage.removeItem(accessTokenKey);
};
//#endregion

//#region user Email
export const saveEmail = async (email) => {
  try {
    await AsyncStorage.setItem(emailKey, String(email));
  } catch (error) {
    console.error("Error : While saving accessTokenKey :" + error);
  }
};
export const getEmail = async () => {
  try {
    let value = await AsyncStorage.getItem(emailKey);
    return value;
  } catch (error) {
    console.error("Error : While retrieving accessTokenKey :" + error);
  }
};
export const removeEmail = async () => {
  await AsyncStorage.removeItem(emailKey);
};
//#endregion

//#region FCM Token
export const saveFCMTOken = async (fcm_token) => {
  try {
    await AsyncStorage.setItem(FCMToken, String(fcm_token));
  } catch (error) {
    console.error("Error : While saving fcm_token :" + error);
  }
};
export const getFCMToken = async () => {
  try {
    let value = await AsyncStorage.getItem(FCMToken);
    return value;
  } catch (error) {
    console.error("Error : While retrieving fcm_token :" + error);
  }
};
export const removeFCMToken = async () => {
  await AsyncStorage.removeItem(FCMToken);
};
//#endregion
