import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import BackIcon from "../../assets/images/back-icon.png";
import { StoreContext } from "../../store/StoreContext";
import YoutubeIframe from "react-native-youtube-iframe";

const RecipeDetails = ({ navigation }) => {
  const { userStore } = useContext(StoreContext);
  const [menu, setMenu] = useState({});
  const [playing, setPlaying] = useState(false);
  const url = menu.strYoutube ? menu.strYoutube.split("=")[1] : null;

  useEffect(() => {
    if (userStore && userStore.data) {
      setMenu(userStore.data.menuDetails);
    }
  }, [userStore]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 321,
          backgroundColor: "#98A8B8",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Image
          source={{ url: menu.strMealThumb }}
          style={{
            height: "100%",
            width: "100%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.push("Home")}
          style={{ position: "absolute", top: 40, left: 20 }}
        >
          <Image source={BackIcon} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: "#181C2E",
          fontSize: 20,
          fontWeight: "700",
          textTransform: "capitalize",
          marginTop: 40,
          marginBottom: 20,
          paddingLeft: 20,
        }}
      >
        {menu.strMeal}
      </Text>

      <ScrollView>
        <Text
          style={{
            color: "#A0A5BA",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 24,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {menu.strInstructions}
        </Text>

        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[menu.strCategory, menu.strArea, menu.strTags].map((snack) => (
            <View
              key={snack}
              style={{
                color: "#181C2E",
                fontSize: 16,
                fontWeight: "400",
                marginRight: 20,
                borderWidth: 2,
                borderColor: "#EDEDED",
                borderRadius: 20,
                padding: 15,
              }}
            >
              <Text>{snack}</Text>
            </View>
          ))}
        </View>

        <View
          style={{
            marginBottom: 30,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <YoutubeIframe height={200} play={playing} videoId={url} />
        </View>

        <View
          style={{
            shadowColor: "#EFE6E1",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 1,
            elevation: 5,
            paddingLeft: 50,
            paddingRight: 50,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "#32343E",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              Ingredient
            </Text>
            <Text
              style={{
                color: "#32343E",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              Measure
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              marginBottom: 5,
            }}
          >
            <View>
              {[
                menu.strIngredient1,
                menu.strIngredient2,
                menu.strIngredient3,
                menu.strIngredient4,
                menu.strIngredient5,
              ].map((ingredient, key) => (
                <Text
                  key={key}
                  style={{
                    color: "#646982",
                    fontSize: 13,
                    fontStyle: "normal",
                    fontWeight: "400",
                    textTransform: "capitalize",
                    marginBottom: 15,
                  }}
                >
                  {ingredient}
                </Text>
              ))}
            </View>

            <View>
              {[
                menu.strMeasure1,
                menu.strMeasure2,
                menu.strMeasure3,
                menu.strMeasure4,
                menu.strMeasure5,
              ].map((measurement, key) => (
                <Text
                  key={key}
                  style={{
                    color: "#646982",
                    fontSize: 13,
                    fontStyle: "normal",
                    fontWeight: "400",
                    textTransform: "capitalize",
                    marginBottom: 15,
                  }}
                >
                  {measurement}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
