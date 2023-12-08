import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react';
import globalCSS from "../../utils/GlobalCSS";
import HostName from "../../utils/HostName";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState();

    const handleSendOtp = async () => {

    }
    return (
        <View style={[styles.main_center_container, globalCSS.bgcZero]}>
            <View style={styles.signup_link}>
                <Text style={globalCSS.font25}>Password Reset</Text>
            </View>
            <View style={[styles.centered_box, globalCSS.bgcOne]}>
                <TextInput
                    placeholder="Email"
                    style={globalCSS.inputStyle1}
                    value={email}
                    onChangeText={(newValue) => setEmail(newValue)}
                />
                <Pressable
                    onPress={handleSendOtp}
                    style={[styles.signin_btn, globalCSS.bgcTwo]}
                >
                    <Text style={globalCSS.font15}>Send OTP via Email</Text>
                </Pressable>

            </View>
            <View style={styles.signup_link}>
                <Text>Back to Login</Text>
                <Pressable onPress={() => { navigation.navigate("Login") }}>
                    <Text style={globalCSS.font15}>Click here</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ForgotPassword

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