import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import MapView from "react-native-maps";
// import { ScrollView } from "react-native-keyboard-aware-scroll-view";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Stars from "../components/Stars.js";
import { MaterialIcons } from "@expo/vector-icons";

const RoomScreen = ({ route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);

  // console.log(route.params.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.meassage);
      }
    };
    fetchData();
  }, []);

  //   console.log("HELLOO", data);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <SwiperFlatList
          style={styles.container}
          index={0}
          showPagination
          data={data.photos}
          renderItem={({ item }) => (
            // console.log(item);
            <Image style={styles.pictures} source={{ uri: item.url }} />
          )}
        />
        <View>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </View>
      <View style={styles.midDiv}>
        <View style={styles.bottomPart}>
          <View style={styles.leftPart}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.divReviews}>
              <Stars nb={data.ratingValue} />
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
          <Image
            style={styles.userPicture}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
        <Text style={styles.descript} numberOfLines={showText ? null : 3}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sint
          facilis dolorem at quibusdam est incidunt, accusantium dolore quia
          eligendi rem ex esse qui ut! Aliquam odit a nostrum ad?
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowText(!showText);
          }}
        >
          {showText ? (
            <View style={styles.expand}>
              <Text style={styles.expandTxt}>Show less</Text>
              <MaterialIcons name="expand-less" size={18} color="#717171" />
            </View>
          ) : (
            <View style={styles.expand}>
              <Text style={styles.expandTxt}>Show more</Text>
              <MaterialIcons name="expand-more" size={18} color="#717171" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        <MapView.Marker
          coordinate={{
            longitude: data.location[0],
            latitude: data.location[1],
          }}
        />
      </MapView>
    </ScrollView>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    // backgroundColor: "green",
    height: 300,
    // marginTop: 10,
  },
  pictures: {
    width,
    justifyContent: "center",
    height: 300,
  },
  price: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 10,
    justifyContent: "flex-end",
    height: 42,
    width: 96,
    color: "white",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 6,
  },
  midDiv: {
    padding: 12,
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
  descript: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  expand: {
    flexDirection: "row",
    marginBottom: 10,
  },
  expandTxt: {
    fontSize: 12,
    color: "#717171",
  },
  mapView: {
    width: "100%",
    height: 260,
  },
});

export default RoomScreen;
