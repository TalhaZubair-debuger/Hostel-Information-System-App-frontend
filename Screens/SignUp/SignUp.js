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


  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || password === "" || contact === null || name === "" || confirmPassword === "") {
      Alert.alert("Alert!", "Please fill the form completely.");
    } else {
      try {
        if (!emailRegex.test(email)) {
          Alert.alert('Alert!', 'Entered value is not an email');
          return;
        }
        if (contact.length < 10){
          Alert.alert('Alert!', 'Contact No. length should be minimum 10 numbers');
        return;
        }
        if (password !== confirmPassword){
          Alert.alert('Alert!', "Passwords doesn't match");
          return;
        }

        const res = await fetch(`${HostName}users/signup`, {
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
          })
        })

        const data = await res.json();
        if (data.message && !data.userId){
          Alert.alert("Alert!", data.message);
          return;
        }
        if (data.userId) {
          Alert.alert("Alert!", data.message);
          navigation.navigate("Login");
          return;
        }
        console.log(data + " line 81");
      } catch (err) {
        Alert.alert("Error!", err.message);
        console.log(err + "line 84");
        return;
      }
    }
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
          inputMode='email'
          onChangeText={(newValue) => setEmail(newValue)}
        />
        <TextInput
          placeholder="Name"
          style={globalCSS.inputStyle1}
          value={name}
          inputMode='text'
          onChangeText={(newValue) => setName(newValue)}
        />
        <TextInput
          placeholder="Contact"
          style={globalCSS.inputStyle1}
          keyboardType="number-pad"
          value={contact}
          inputMode='numeric'
          onChangeText={(newValue) => setContact(newValue)}
        />
        <TextInput
          placeholder="Password"
          style={globalCSS.inputStyle1}
          value={password}
          inputMode='text'
          onChangeText={(newValue) => setPassword(newValue)}
        />
        <TextInput
          placeholder="Confirm Password"
          style={globalCSS.inputStyle1}
          value={confirmPassword}
          inputMode='text'
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