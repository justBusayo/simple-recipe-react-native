import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Image,
} from "react-native";
import Ellipse from "../../assets/images/Ellipse.png";
import { StoreContext } from "../../store/StoreContext";
import { SET_IS_LOGIN } from "../../store/userStore";

const WelcomeScreen = ({ navigation }) => {
  const { userStore } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (userStore && userStore.data) {
      setUserInfo(userStore.data.userDetails);
    }
  }, [userStore]);

  const onPress = () => {
    userStore.dispatchUser({
      type: SET_IS_LOGIN,
      payload: true,
    });
    // if (email === userInfo.email && pass === userInfo.password) {
    //   userStore.dispatchUser({
    //     type: SET_IS_LOGIN,
    //     payload: true,
    //   });
    // } else {
    //   setError("Incorrect email or password");
    // }
  };
  const signupRouting = () => {
    navigation.push("Signup");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperElement}>
        <Image source={Ellipse} style={{}} />
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "700",
          }}
        >
          Log In
        </Text>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "400",
          }}
        >
          Please sign in to your existing account
        </Text>
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.welcomeTextWrap}>
          {!error ? (
            <Text style={styles.welcomeText}>Welcome Back</Text>
          ) : (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              {error}
            </Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <Text
            style={{
              color: "#32343E",
              marginBottom: 10,
              fontSize: 13,
              fontWeight: "400",
              textTransform: "uppercase",
            }}
          >
            Email
          </Text>
          <TextInput
            style={styles.inputText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Email Here"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text
            style={{
              color: "#32343E",
              marginBottom: 10,
              fontSize: 13,
              fontWeight: "400",
              textTransform: "uppercase",
            }}
          >
            Password
          </Text>
          <TextInput
            style={styles.inputText}
            value={pass}
            onChangeText={setPass}
            keyboardType="visible-password"
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={onPress}>
          <Text style={styles.ButtonText}>Log In</Text>
        </Pressable>

        <View style={{ marginBottom: 40, marginTop: 40, flexDirection: "row" }}>
          <View>
            <Text>Doesn’t have an account ?</Text>
          </View>
          <View>
            <Text
              style={{ color: "#FF7622", paddingLeft: 5 }}
              onPress={signupRouting}
            >
              Create here
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121223",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  upperElement: {
    // flex: 1,
    width: "100%",
    height: "40%",
    position: "absolute",
    top: 0,
  },
  imageBg: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  formWrapper: {
    // flex: 0.8,
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    bottom: 0,
  },
  welcomeTextWrap: {
    marginBottom: 40,
  },
  welcomeText: {
    color: "#555",
    fontSize: 20,
    fontWeight: "700",
  },

  inputWrapper: {},
  inputText: {
    width: 371,
    height: 61,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFF",
    marginBottom: 35,
    paddingLeft: 10,
  },
  submitButton: {
    width: 268,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#FF7622",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
