import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react';
import globalCSS from "../../utils/GlobalCSS";
import HostName from "../../utils/HostName";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [enterOTP, setEnterOTP] = useState(false);
    const [enterPassword, setEnterPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [checkOTP, setCheckOTP] = useState("");
    const handleSendOtp = async () => {
        if (
            email === ""
        ) {
            Alert.alert("Failure", "Please fill form completely");
        } else {
            const formData = {
                email
            };
            try {
                const response = await fetch(`${HostName}users/generate-otp`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.message && !data.otp) {
                    Alert.alert("Alert!", data.message);
                }
                if (data.otp) {
                    setCheckOTP(data.otp);
                    setEnterOTP(!enterOTP);
                }
            } catch (error) {
                Alert.alert("Failed!", `${error.message}`);
                console.log(error);
            }
        }
    }

    const handleVerifyOTP = async () => {
        if (
            otp === checkOTP
        ) {
            setEnterOTP(!enterOTP);
            setEnterPassword(!enterPassword)
        }
        else {
            Alert.alert("Alert!", "OTP didn't Matched!");
        }
    }

    const handlePasswordUpdate = async () => {
        if (
            email === "" ||
            password === ""
        ) {
            Alert.alert("Failure", "Please fill form completely");
        } else {
            const formData = {
                email,
                password
            };
            try {
                const response = await fetch(`${HostName}users/update-password`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "PATCH",
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data) {
                    Alert.alert("Alert!", `${data.message}`);                    
                    setEnterPassword(!enterPassword)
                }
            } catch (error) {
                Alert.alert("Failed!", `${error.message}`);
                console.log(error);
            }
        }
    }
    return (
        <View style={[styles.main_center_container, globalCSS.bgcZero]}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={enterOTP}
                onRequestClose={() => {
                    setEnterOTP(!enterOTP);
                }}
            >
                <View style={styles.centeredView}>
                    <Text style={[globalCSS.font20]}>Enter OTP</Text>
                    <View style={styles.row}>
                            <TextInput
                                placeholder="12456"
                                style={globalCSS.inputStyle5}
                                value={otp}
                                onChangeText={(newValue) => setOtp(newValue)}
                            />
                    </View>
                    <Pressable
                        style={[styles.applyFilterBtn, globalCSS.bgcOne]}
                        onPress={handleVerifyOTP}>
                        <Text style={[styles.textStyle]}>Verify OTP</Text>
                    </Pressable>
                </View>
            </Modal>


            <Modal
                animationType="fade"
                transparent={true}
                visible={enterPassword}
                onRequestClose={() => {
                    setEnterPassword(!enterPassword);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.signup_link}>
                        <Text style={globalCSS.font25}>New Password</Text>
                    </View>
                    <View style={[styles.centered_box, globalCSS.bgcOne]}>
                        <TextInput
                            placeholder="Password"
                            style={globalCSS.inputStyle1}
                            value={password}
                            onChangeText={(newValue) => setPassword(newValue)}
                        />
                        <Pressable
                            onPress={handlePasswordUpdate}
                            style={[styles.signin_btn, globalCSS.bgcTwo]}
                        >
                            <Text style={globalCSS.font15}>Save Password</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

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
            <View style={styles.signin_btn}>
                <Pressable onPress={() => { navigation.navigate("Login") }}>
                    <Text style={globalCSS.font15}>Back to Login</Text>
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
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        backgroundColor: "#fff",
        padding: 5,
        elevation: 30,
        shadowColor: "#000",
    },
    row: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    width100: {
        width: "100%"
    },
    applyFilterBtn: {
        marginTop: 10,
        borderRadius: 5,
        fontSize: 15,
        width: 150,
        height: 40,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})