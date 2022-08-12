import {
  StyleSheet,
  ScrollView,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen({ setToken, token, userId }) {
  // const [data, setData] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPicture, setSelectedPicture] = useState();
  const [takenPicture, setTakenPicture] = useState();

  const navigation = useNavigation();

  // console.log("ID : ", userId);
  // console.log("token : ", token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        // setData(response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setSelectedPicture(response.data.photo.url);
        setIsLoading(false);
      } catch (error) {
        console.log(error.meassage);
      }
    };
    fetchData();
  }, []);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(status);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.cancelled === false) {
        setSelectedPicture(result.uri);
        console.log(result.uri);
      }
    } else {
      console.log("Permission denied");
    }
  };

  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (result.cancelled === false) {
        setTakenPicture(result.uri);
      } else {
        console.log("canceled");
      }
    } else {
      console.log("Permission denied");
    }
  };

  const sendPicture = async () => {
    try {
      // setIsLoading(true);
      const tab = selectedPicture.split(".");
      const imageType = tab[tab.length - 1];

      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `my-picture.${imageType}`,
        type: `image/${imageType}`,
      });
      console.log(selectedPicture);
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("description", description);
      formData.append("username", username);

      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update`,
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return token === null ? (
    navigation.navigate("Signin")
  ) : (
    // isLoading ? (
    //   <ActivityIndicator />
    // ) : (
    <KeyboardAwareScrollView style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topDiv}>
            <Image style={styles.picture} source={{ uri: selectedPicture }} />
            <View style={styles.rightPart}>
              <TouchableOpacity onPress={getPermission}>
                <MaterialIcons name="photo-library" size={34} color="#717171" />
              </TouchableOpacity>
              <MaterialIcons name="photo-camera" size={34} color="#717171" />
            </View>
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              console.log(text);
              setEmail(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={(text) => {
              console.log(text);
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.inputDiv}
            multiline={true}
            // numberOfLines={4}
            placeholder="describe yourself in a few words"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <View style={styles.buttonDiv}>
            <Button
              color="#7A7A7A"
              title="Update"
              onPress={() => {
                sendPicture();
                updateData();
              }}
            />
          </View>
          <View style={[styles.buttonDiv, styles.logout]}>
            <Button
              color="#7A7A7A"
              title="Log Out"
              onPress={() => {
                setToken(null);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    padding: 28,
  },
  topDiv: {
    flexDirection: "row",
  },
  picture: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderRadius: 100,
    height: 160,
    width: 160,
    marginRight: 20,
    marginBottom: 20,
  },
  rightPart: {
    // backgroundColor: "red",
    justifyContent: "space-evenly",
  },
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: "100%",
    fontSize: 18,
    paddingBottom: 10,
    marginVertical: 16,
  },
  inputDiv: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    width: "100%",
    fontSize: 18,
    // paddingBottom: 10,
    marginVertical: 16,
    height: 80,
  },
  buttonDiv: {
    borderColor: "#F9656A",
    borderWidth: 4,
    borderRadius: 50,
    height: 60,
    width: 200,
    paddingTop: 6,
    marginTop: 30,
  },
  logout: {
    backgroundColor: "#E7E7E7",
  },
});
