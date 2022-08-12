import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";
import MapView from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native-web";

export default function AroundMe() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          //   console.log(location.coords.longitude);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          //   console.log(response.data[1].location);
          setIsLoading(false);
          setCoords(response.data);
        } else {
          alert("Permission denied");
          navigation.navigate("Home");
          // const response = await axios.get(
          //   `https://express-airbnb-api.herokuapp.com/rooms/around`
          // );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, []);
  return isLoading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        style={styles.mapView}
      >
        {coords.map((elem, index) => {
          // console.log(elem._id);
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: elem.location[1],
                longitude: elem.location[0],
              }}
              onPress={() => {
                navigation.navigate("Room", { id: elem._id });
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    // backgroundColor: "green",
    //   height: 200,
    //   marginTop: 10,
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
});
