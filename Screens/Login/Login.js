import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react';
import globalCSS from "../../utils/GlobalCSS";
import HostName from "../../utils/HostName";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      checkLogin()
    }, [])
  )

  const checkLogin = async () => {
    const jwtToken = await AsyncStorage.getItem("jwtToken");
    if (jwtToken) {
      const bearer = jwtToken.split(" ")[0];
      if (bearer === "Bearer-Owner") {
        navigation.navigate("SellerHome")
      }
      else if (bearer === "Bearer") {
        navigation.navigate("UserHome")
      }
      else {
        BackHandler.exitApp();
      }
    }
  }

  const handleSignIn = async (event) => {
    if (!email || !password) {
      setError("Fill all fields");
      return;
    }
    try {
      const res = await fetch(`${HostName}users/login-user`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        const token = data.token;
        await AsyncStorage.setItem('jwtToken', `Bearer ${token}`);
        setError("");
        setEmail("");
        setPassword("");
        navigation.navigate("UserHome")
      }
      else {
        setError("Login failed. Please check your credentials.");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInOwner = async () => {
    if (!email || !password) {
      setError("Fill all fields");
      return;
    }
    try {
      const res = await fetch(`${HostName}users/login-owner`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        const token = data.tokenOwner;
        await AsyncStorage.setItem('jwtToken', `Bearer-Owner ${token}`);
        console.log("Bearer-Owner " + token);
        setError("");
        setEmail("");
        setPassword("");
        navigation.navigate("SellerHome")
      }
      else {
        setError("Owner Login failed. Please check your credentials.");
        Alert.alert("Failure!", "Owner Login failed. Please check your credentials.")
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
      <View style={[styles.main_center_container, globalCSS.bgcZero]}>
        <View style={styles.signup_link}>
          <Text style={globalCSS.font25}>Hostel Information System</Text>
        </View>
        <View style={[styles.centered_box, globalCSS.bgcOne]}>
          <TextInput
            placeholder="Email"
            style={globalCSS.inputStyle1}
            value={email}
            onChangeText={(newValue) => setEmail(newValue)}
          />
          <TextInput
            placeholder="Password"
            style={globalCSS.inputStyle1}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
          />
          <Pressable
            onPress={handleSignIn}
            style={[styles.signin_btn, globalCSS.bgcTwo]}
          >
            <Text style={globalCSS.font15}>Login</Text>
          </Pressable>

          <Pressable
            onPress={handleSignInOwner}
            style={[styles.signin_btn, globalCSS.bgcTwo]}
          >
            <Text style={globalCSS.font15}>Login as a hostel owner</Text>
          </Pressable>

          <View style={styles.signup_link}>
            <Text>Forgot Password?</Text>
            <Pressable onPress={() => { navigation.navigate("Forgot Password") }}>
              <Text style={globalCSS.font15}>Click here</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.signup_link}>
          <Text>No existing Account?</Text>
          <Pressable onPress={() => { navigation.navigate("SignUp") }}>
            <Text style={globalCSS.font15}>SignUp here</Text>
          </Pressable>
        </View>
      </View>
  )
}

export default Login

const styles = StyleSheet.create({
  main_center_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  centered_box: {
    width: "80%",
    // height: "30%",
    padding: 10,
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowRadius: 5,
    shadowColor: "black",
  },
  signin_btn: {
    width: "80%",
    margin: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "#BF40BF",
    borderWidth: 2,
    shadowRadius: 5,
    shadowColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signup_link: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
})