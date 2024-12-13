import React from "react";
import { Alert } from "react-native";

export const showMsgAlert = (msg, title = "Message") => {
  Alert.alert(title, msg + "", [{ text: "OK" }]);
};

export const showAlertForMediaSourceTypeSel = (callBackfn) => {
  Alert.alert(
    "Select Media Source",
    "",
    [
      {
        text: "Gallery",
        onPress: () => callBackfn(1),
      },
      {
        text: "Camera",
        onPress: () => callBackfn(2),
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "destructive",
      },
    ],
    { cancelable: true }
  );
};
