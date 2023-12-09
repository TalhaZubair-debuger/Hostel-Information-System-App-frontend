import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react';
import globalCSS from "../../utils/GlobalCSS";
import HostName from '../../utils/HostName';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");


  const handleSignUp = () => {
    if (!email || !password || !contact || !name || !confirmPassword) {
      setError("Fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords donot match");
      return;
    }

    fetch(`${HostName}users/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        contact,
        password,
        confirmPassword
      }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Something went wrong.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigation.navigate("Login");
      })
      .catch((err) => {
        setError(err.message);
        Alert.alert("Alert", err.message)
        // console.log(err.data.msg);
      });
  }
  return (
    <View style={[styles.main_center_container, globalCSS.bgcZero]}>
      <View style={styles.signup_link}>
        <Text style={globalCSS.font25}>Hostel Information System</Text>
      </View>
      <View style={[styles.centered_box, globalCSS.bgcOne]}>
        <View style={styles.signup_link}>
          <Text style={globalCSS.font15}>Sign Up</Text>
        </View>
        <TextInput
          placeholder="Email"
          style={globalCSS.inputStyle1}
          value={email}
          onChangeText={(newValue) => setEmail(newValue)}
        />
        <TextInput
          placeholder="Name"
          style={globalCSS.inputStyle1}
          value={name}
          onChangeText={(newValue) => setName(newValue)}
        />
        <TextInput
          placeholder="Contact"
          style={globalCSS.inputStyle1}
          keyboardType="number-pad"
          value={contact}
          onChangeText={(newValue) => setContact(newValue)}
        />
        <TextInput
          placeholder="Password"
          style={globalCSS.inputStyle1}
          value={password}
          onChangeText={(newValue) => setPassword(newValue)}
        />
        <TextInput
          placeholder="Confirm Password"
          style={globalCSS.inputStyle1}
          value={confirmPassword}
          onChangeText={(newValue) => setConfirmPassword(newValue)}
        />
        <Pressable
          onPress={handleSignUp}
          style={[styles.signin_btn, globalCSS.bgcTwo]}
        >
          <Text style={globalCSS.font15}>SignUp</Text>
        </Pressable>
      </View>
      <View style={styles.signup_link}>
        <Text>Already have an account?</Text>
        <Pressable onPress={() => { navigation.navigate("Login") }}>
          <Text style={globalCSS.font15}>Login here</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  main_center_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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