import { useContext, useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/WelcomeScreen";
import Signup from "./screens/WelcomeScreen/Signup";
import HomeScreen from "./screens/WelcomeScreen/HomeScreen";
import UserProfile from "./screens/WelcomeScreen/UserProfile";
import RecipeDetails from "./screens/WelcomeScreen/RecipeDetails";
import { StoreContext } from "./store/StoreContext";

const Stack = createNativeStackNavigator();
export default function Main() {
  const { userStore } = useContext(StoreContext);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (userStore && userStore.data) {
      setIsAuth(userStore.data.isLogin);
    }
  }, [userStore]);
  
  const [loaded] = useFonts({
    SenBold: require('./assets/fonts/Sen-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        {isAuth ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="User Profile"
              component={UserProfile}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Recipe Details"
              component={RecipeDetails}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signup"
              component={Signup}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
