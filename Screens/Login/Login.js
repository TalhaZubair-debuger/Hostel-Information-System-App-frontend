import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react';
import globalCSS from "../../utils/GlobalCSS";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = () => {
    navigation.navigate("UserHome")
  }
  const handleSignInOwner = () => {
    navigation.navigate("SellerHome")
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
      </View>
      <View style={styles.signup_link}>
        <Text>No existing Account?</Text>
        <Pressable onPress={()=> {navigation.navigate("SignUp")}}>
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
    borderColor: "#00D2FF",
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