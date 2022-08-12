import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import axios from "axios";
import Stars from "../components/Stars.js";

export default function HomeScreen() {
  const [data, setData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.meassage);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.main}>
      {/* <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}
      <FlatList
        data={data}
        keyExtractor={(elem, index) => {
          return index;
        }}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <Image
                  style={styles.pictures}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={styles.price}>{item.price} €</Text>
                <View style={styles.bottomPart}>
                  <View style={styles.leftPart}>
                    <Text numberOfLines={1} style={styles.title}>
                      {item.title}
                    </Text>
                    <View style={styles.divReviews}>
                      <Stars nb={item.ratingValue} />
                      <Text style={styles.reviews}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                  <Image
                    style={styles.userPicture}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  container: {
    // backgroundColor: "green",
    height: 300,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 2,
    marginVertical: 12,
  },
  pictures: {
    height: 200,
    width: "100%",
    position: "relative",
  },
  price: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 110,
    justifyContent: "flex-end",
    height: 42,
    width: 96,
    color: "white",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 6,
  },
  title: {
    fontSize: 18,
    marginTop: 14,
  },
  leftPart: {
    width: "80%",
  },
  divReviews: {
    // backgroundColor: "green",
    flexDirection: "row",
    marginVertical: 14,
  },
  reviews: {
    color: "#BBBCBB",
  },
  bottomPart: {
    flexDirection: "row",
  },
  userPicture: {
    height: 66,
    width: 66,
    borderRadius: 50,
    marginVertical: 16,
  },
});
