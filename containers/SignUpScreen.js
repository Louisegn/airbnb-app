import { useNavigation } from "@react-navigation/core";

import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [data, setData] = useState(true);
  const [validPass, setValidPass] = useState(false);
  const [eye, setEye] = useState(true);
  const [indic, setIndic] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async (req, res) => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          usermane: username,
          description: description,
          password: password,
        }
      );
      // console.log(response.data.token);
      setToken(response.data.token);
    } catch (error) {
      setValidPass(false);
      setIndic(false);
      setData(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.headerTitle}>Sign up</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              console.log(text);
              setEmail(text);
            }}
          />
          <TextInput
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
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={eye}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            secureTextEntry={eye}
            value={password2}
            onChangeText={(text) => {
              setPassword2(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setEye(!eye);
            }}
          >
            {eye ? (
              <FontAwesome5 name="eye" size={24} color="#7A7A7A" />
            ) : (
              <FontAwesome5 name="eye-slash" size={24} color="#7A7A7A" />
            )}
          </TouchableOpacity>
          {data && <Text style={styles.error}>{data}</Text>}
          {validPass && (
            <Text style={styles.error}>Passwords must be the same</Text>
          )}
          {indic && <ActivityIndicator color="#7A7A7A" />}
          <View style={styles.buttonDiv}>
            <Button
              color="#7A7A7A"
              title="Sign up"
              onPress={async () => {
                if (password === password2) {
                  setIndic(true);
                  handleSubmit();
                } else {
                  setValidPass(true);
                  setData(true);
                }
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.register}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
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
  header: {
    marginVertical: 20,
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
  register: {
    color: "#7A7A7A",
    fontSize: 16,
    marginTop: 16,
  },
  error: {
    color: "#F9656A",
    fontSize: 20,
    // fontWeight: "bold",
    marginTop: 10,
  },
});
