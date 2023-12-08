import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import GlobalCSS from "./GlobalCSS";
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from './HostName';
import { Alert } from 'react-native';
import { useStripe } from "@stripe/stripe-react-native";


const YourHostelList = ({ navigation, hostels, hosteliteName, rentAmont, dueDate, previousDues, hostelId, bedId, setChange, setStripeKey }) => {
    const [hostelData, setHosteData] = useState({});
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    useFocusEffect(
        useCallback(() => {
            hostels ?
                setHosteData(hostels.find(item => item._id === hostelId))
                :
                null;
            setStripeKey(hostelData.publishableKey);
        }, [])
    )
    const handleDeleteHostel = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostel-beds/delete-bed/${bedId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.message) {
                Alert.alert("Alert!", `${data.message}`);
                setChange(true);
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }
    const handleMakePayment = async () => {
        const amount = rentAmont;
        const formData = {
            amount: Math.floor(amount * 100)
        }
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostel-beds/make-payment/${hostelId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${jwtToken}`
                },
                method: "POST",
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data) {
                console.log(data);
            }
            const initResponse = await initPaymentSheet({
                merchantDisplayName: "Test Name",
                paymentIntentClientSecret: data.paymentIntent
            })
            if (initResponse.error) {
                console.log(initResponse.error)
                Alert.alert("Something went wrong!");
                return;
            }
            const paymentReponse = await presentPaymentSheet();
            if (paymentReponse.error) {
                Alert.alert(`Error code: ${paymentReponse.error.code}`, paymentReponse.error.message);
                return;
            }
            else {
                handleUpdateDues();
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }

    const handleUpdateDues = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostel-beds/update-dues/${bedId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${jwtToken}`
                },
                method: "PATCH"
            });
            const data = await response.json();
            if (data.message) {
                Alert.alert("Success", `${data.message}`);
                navigation.navigate("BottomTabs");
            }
        } catch (error) {
            Alert.alert("Failed!", `${error.message}`);
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.left}>
                    <Image source={{ uri: `data:image/jpeg;base64,${hostelData ? hostelData.image ? hostelData.image : null : null}` }}
                        style={styles.imageStyle} />

                </View>
                <View style={styles.right}>
                    <View style={[GlobalCSS.rowNonCenter, styles.leftJustify]}>
                        <Text style={GlobalCSS.font15}>Name:{" "}</Text>
                        <Text style={GlobalCSS.font15NonBold}>{hosteliteName}</Text>
                    </View>
                    <View style={[GlobalCSS.rowNonCenter, styles.leftJustify]}>
                        <Text style={GlobalCSS.font15}>Rent Amount:{" "}</Text>
                        <Text style={GlobalCSS.font15NonBold}>{rentAmont}</Text>
                    </View>
                    <View style={[GlobalCSS.rowNonCenter, styles.leftJustify]}>
                        <Text style={GlobalCSS.font15}>Due Date:{" "}</Text>
                        <Text style={GlobalCSS.font15NonBold}>{dueDate}</Text>
                    </View>
                    <View style={[GlobalCSS.rowNonCenter, styles.leftJustify]}>
                        <Text style={GlobalCSS.font15}>Previous Dues:{" "}</Text>
                        <Text style={GlobalCSS.font15NonBold}>{previousDues}</Text>
                    </View>
                </View>
            </View>

            <View>
                <TouchableOpacity style={[styles.redBgc, styles.btn]} onPress={handleDeleteHostel}>
                    <Text>
                        Leave Hostel
                    </Text>
                </TouchableOpacity>

                {
                    hostelData ?
                        hostelData.previousDues === "Pending" ?
                            <TouchableOpacity style={[GlobalCSS.bgcTwo, styles.btn]} onPress={handleMakePayment}>
                                <Text>
                                    Repay Dues
                                </Text>
                            </TouchableOpacity>
                            :
                            <></>
                        :
                        <></>
                }
            </View>
        </View>
    )
}

export default YourHostelList

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "90%",
        marginVertical: 5,
        padding: 5,
        marginHorizontal: "5%",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: "#fff",
        shadowColor: "#777777bb",
        shadowRadius: 10,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    left: {
        justifyContent: "flex-start",
        alignItems: "center",

    },
    right: {
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "left",
    },
    leftJustify: {
        alignContent: "flex-start",
        width: "100%"
    },
    imageStyle: {
        margin: 5,
        width: 80,
        height: 80
    },
    btn: {
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
        margin: 5
    },
    redBgc: {
        backgroundColor: "red"
    }
})