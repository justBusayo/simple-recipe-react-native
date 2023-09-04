import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import Logo from "../../assets/images/logo.png";
import UserWhite from "../../assets/images/single-user-white.png";
import SearchIcon from "../../assets/images/search-icon.png";
import {
  filterByCategories,
  listAllCategories,
  listAllMeal,
} from "../../services";
import { StoreContext } from "../../store/StoreContext";
import { SET_MENU_DETAILS } from "../../store/userStore";

const HomeScreen = ({ navigation }) => {
  const { userStore } = useContext(StoreContext);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    listAllMealsFn();
    listAllCategoryFn();
  }, []);

  const navToProfile = (data, name) => {
    if (data) {
      userStore.dispatchUser({
        type: SET_MENU_DETAILS,
        payload: data,
      });
    }
    navigation.push(name);
  };

  const listAllCategoryFn = async () => {
    try {
      const res = await listAllCategories();
      setListCategory(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const listAllMealsFn = async () => {
    try {
      const res = await listAllMeal(search);
      setRecipeList(res.data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  const setCatStateFn = async (catId, catName) => {
    try {
      const res = await filterByCategories(catName);
      if (res.data.meals) {
        setRecipeList(res.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
    setCategory(catId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
        <TouchableOpacity
          onPress={() => navigation.push("User Profile")}
          style={styles.profileButton}
        >
          <Image source={UserWhite} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greetingText}>Hey User, Good Afternoon!</Text>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search meal..."
        />
        <TouchableOpacity onPress={listAllMealsFn}>
          <Image source={SearchIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>All Categories</Text>

      <ScrollView horizontal style={styles.categories}>
        {listCategory.map((el) => (
          <TouchableOpacity
            key={el.idCategory}
            onPress={() => setCatStateFn(el.idCategory, el.strCategory)}
            style={[
              styles.categoryItem,
              {
                backgroundColor:
                  el.idCategory === category ? "#FFD27C" : "#fff",
              },
            ]}
          >
            <View style={styles.categoryImageContainer}>
              <ImageBackground
                style={styles.categoryImage}
                source={{ url: el.strCategoryThumb }}
                resizeMode="center"
              />
            </View>
            <Text style={styles.categoryText}>{el.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionHeader}>Recipe List</Text>
      <ScrollView>
        <View style={styles.recipeList}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            recipeList?.map((recipe) => (
              <TouchableOpacity
                onPress={() => navToProfile(recipe, "Recipe Details")}
                key={recipe.idMeal}
                style={styles.recipeItem}
              >
                <View style={styles.recipeImageContainer}>
                  <ImageBackground
                    source={{ url: recipe.strMealThumb }}
                    style={styles.recipeImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeName}>{recipe.strMeal}</Text>
                  <Text style={styles.recipeTags}>{recipe.strTags}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 10,
  },
  profileButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22.5,
    backgroundColor: "black",
  },
  greetingText: {
    color: "#1E1D1D",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 26,
    textTransform: "capitalize",
    paddingLeft: 20,
  },
  searchBar: {
    height: 62,
    marginLeft: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F6F6F6",
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    marginRight: 10,
  },
  sectionHeader: {
    color: "#1E1D1D",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
    textTransform: "capitalize",
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  categories: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  categoryItem: {
    minWidth: 103,
    height: 60,
    borderRadius: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 18,
    shadowColor: "#EFE6E1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 5,
    marginRight: 10,
    marginBottom: 50,
    marginLeft: 20,
  },
  categoryImageContainer: {
    borderRadius: 22,
    width: 44,
    height: 44,
    marginRight: 10,
  },
  categoryImage: {
    width: 44,
    height: 44,
  },
  categoryText: {
    color: "#32343E",
    fontSize: 14,
    fontWeight: "700",
  },
  recipeList: {
    paddingLeft: 20,
    marginRight: 20,
  },
  recipeItem: {
    marginBottom: 40,
  },
  recipeImageContainer: {
    height: 214.927,
    borderRadius: 15,
    backgroundColor: "#98A8B8",
  },
  recipeImage: {
    height: 214.927,
    width: "100%",
  },
  recipeInfo: {},
  recipeName: {
    color: "#181C2E",
    fontSize: 20,
    fontWeight: "400",
    textTransform: "capitalize",
    marginTop: 10,
    marginBottom: 5,
  },
  recipeTags: {
    color: "#A0A5BA",
    fontSize: 14,
    fontWeight: "400",
    textTransform: "capitalize",
  },
});

export default HomeScreen;
