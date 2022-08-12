import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import RoomScreen from "./containers/RoomScreen";
// import { useNavigation } from "@react-navigation/native";

//
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Image } from "react-native";
import AroundMeScreen from "./containers/AroundMeScreen";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // const navigation = useNavigation();

  const setToken = async (token, id) => {
    console.log(id);
    if (token && id) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }

    setUserToken(token);
    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setUserId(userId);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: () => (
                          <Image
                            style={styles.logo}
                            source={require("./assets/logo.png")}
                          />
                        ),
                      }}
                    >
                      <Stack.Screen
                        name="Home"
                        // options={{
                        //   headerShown: false,
                        //   title: "",
                        //   headerStyle: { backgroundColor: "red" },
                        //   headerTitle: () => (
                        //     <Image
                        //       style={styles.logo}
                        //       source={require("./assets/logo.png")}
                        //     />
                        //   ),
                        // }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        // component={RoomScreen}
                        // options={{
                        //   title: "",
                        //   headerBackground: () => (
                        //     <Image
                        //       style={styles.logo}
                        //       source={require("./assets/logo.png")}
                        //     />
                        //   ),
                        // }}

                        // options={{
                        //   headerLeft: () => (
                        //     <AntDesign
                        //       name="arrowleft"
                        //       size={24}
                        //       color="black"
                        //       onPress={() => {
                        //         navigation.goBack();
                        //       }}
                        //     />
                        //   ),
                        // }}
                      >
                        {(props) => <RoomScreen {...props} />}
                        {/* {() => <RoomScreen />} */}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-location-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="AroundMe" optin={{ title: "" }}>
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        // options={{
                        //   title: "",
                        //   headerBackground: () => (
                        //     <Image
                        //       style={styles.logo}
                        //       source={require("./assets/logo.png")}
                        //     />
                        //   ),
                        // }}
                      >
                        {(props) => <RoomScreen {...props} />}
                        {/* {() => <RoomScreen />} */}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  // name="TabSettings"
                  name="TabProfile"
                  options={{
                    // tabBarLabel: "Settings",
                    tabBarLabel: "Profile",

                    tabBarIcon: ({ color, size }) => (
                      // <Ionicons
                      //   name={"ios-options"}
                      //   size={size}
                      //   color={color}
                      // />
                      <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: () => (
                          <Image
                            style={styles.logo}
                            source={require("./assets/logo.png")}
                          />
                        ),
                      }}
                    >
                      <Stack.Screen
                        // name="Settings"
                        name="Profile"
                        options={{
                          // title: "Settings",
                          title: "",
                        }}
                      >
                        {/* {() => <SettingsScreen setToken={setToken} />} */}
                        {() => (
                          <ProfileScreen
                            setToken={setToken}
                            token={userToken}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 32,
    width: 30,
    // marginTop: 58,
    // marginLeft: "47%",
  },
});
