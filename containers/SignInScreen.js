import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState(true);
  const [eye, setEye] = useState(true);
  const navigation = useNavigation();
  const [indic, setIndic] = useState(false);

  const handleSubmit = async (req, res) => {
    try {
      if ((email, password)) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        // console.log("yooo", response.data.id);
        alert("LETS GOOO");
        setToken(response.data.token, response.data.id);
      } else {
        setData("Missing parameter(s)");
      }
    } catch (error) {
      setData(true);
      setIndic(false);
      setData(error.response.data.error);
      console.log(error.response.data.error);
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={styles.headerTitle}>Sign in</Text>
        </View>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            // console.log(text);
            setEmail(text);
            setData(true);
          }}
        />
        <TextInput
          style={[styles.input, styles.pass]}
          placeholder="password"
          value={password}
          secureTextEntry={eye}
          onChangeText={(text) => {
            setPassword(text);
            setData(true);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setEye(!eye);
          }}
        >
          {eye ? (
            <FontAwesome5
              style={styles.eye}
              name="eye"
              size={24}
              color="#7A7A7A"
            />
          ) : (
            <FontAwesome5
              style={styles.eye}
              name="eye-slash"
              size={24}
              color="#7A7A7A"
            />
          )}
        </TouchableOpacity>

        {data && <Text style={styles.error}>{data}</Text>}
        {indic && <ActivityIndicator color="#7A7A7A" />}
        <View style={styles.buttonDiv}>
          <Button
            color="#7A7A7A"
            title="Sign in"
            onPress={async () => {
              handleSubmit();
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.register}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    marginVertical: 70,
  },
  logo: {
    height: 100,
    width: 94,
  },
  headerTitle: {
    color: "#7A7A7A",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: "100%",
    fontSize: 18,
    paddingBottom: 10,
    marginVertical: 16,
  },
  pass: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    bottom: 26,
    left: 138,
  },
  buttonDiv: {
    borderColor: "#F9656A",
    borderWidth: 4,
    borderRadius: 50,
    height: 60,
    width: 200,
    paddingTop: 6,
    marginTop: 80,
  },
  register: {
    color: "#7A7A7A",
    fontSize: 16,
    marginTop: 18,
  },
  error: {
    color: "#F9656A",
    fontSize: 20,
    // fontWeight: "bold",
    marginTop: 20,
    marginBottom: -30,
  },
});
