import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackArrow from "../../assets/images/arrow-left.png";
import userIcon from "../../assets/images/user-icon.png";
import EmailIcon from "../../assets/images/email-icon.png";
import { SET_IS_LOGIN } from "../../store/userStore";
import { StoreContext } from "../../store/StoreContext";

const UserProfile = ({ navigation }) => {
const {userStore} = useContext(StoreContext)
const [userInfo, setUserInfo] = useState({})
  const onPressFn = () => {
    navigation.goBack();
  };

  const logOutFn = () => {
    userStore.dispatchUser({
      type: SET_IS_LOGIN,
      payload: false
    })
  };

  useEffect(() => {
    if (userStore && userStore.data) {
      setUserInfo(userStore.data.userDetails);
    }
  }, [userStore]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
          height: 70,
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={onPressFn}
          style={{
            backgroundColor: "#ECF0F4",
            padding: 10,
            borderRadius: 12.5,
          }}
        >
          <Image source={BackArrow} style={{ width: 15, height: 15 }} />
        </TouchableOpacity>
        <Text
          style={{
            color: "#000",
            fontSize: 17,
            fontWeight: "400",
          }}
        >
          Personal Info
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", width: 100, height: 100, borderRadius: "50%", backgroundColor: "#FFBF6D",marginRight: 20 }}>
        <Image
          source={userIcon}
          style={{ marginBottom: 5,}}
        />
        </View>
        
        <View>
          <Text
            style={{
              color: "#181C2E",
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 5,
              textTransform: "capitalize"
            }}
          >
            {userInfo.name}
          </Text>
          <Text
            style={{
              color: "#A0A5BA",
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            View your profile
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          width: "90%",
          marginTop: 30,
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#F6F8FA",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image source={userIcon} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: "#32343E",
                fontSize: 14,
                fontWeight: "400",
                textTransform: "uppercase",
              }}
            >
              Full Name
            </Text>
            <Text
              style={{
                color: "#6B6E82",
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              {userInfo.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Image source={EmailIcon} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: "#32343E",
                fontSize: 14,
                fontWeight: "400",
                textTransform: "uppercase",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: "#6B6E82",
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              {userInfo.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ position: "absolute", bottom: 100, left: "40%" }}>
        <TouchableOpacity onPress={logOutFn}>
        <Text
          style={{
            color: "#181C2E",
            fontSize: 20,
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          Log out
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
});
