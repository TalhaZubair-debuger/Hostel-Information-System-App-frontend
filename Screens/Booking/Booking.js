import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import globalCSS from "../../utils/GlobalCSS";
import hostelOneImage from "../../assets/images/hostelOne.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';



const Booking = ({ navigation, route }) => {
    const { id } = route.params;
    const [hostel, setHostel] = useState();
    const [images, setImages] = useState();
    useFocusEffect(
        useCallback(() => {
            getHostels();
        }, [])
    )
    const getHostels = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostels/hostel-user/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.hostel) {
                setHostel(data.hostel)
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }

    return (
        <View>
            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Pressable onPress={() => { navigation.navigate("Hostel", { id: id }) }}>
                    <Text>
                        <FontAwesome5 name={"arrow-left"} size={20} color={"black"} />
                    </Text>
                </Pressable>
                <View style={globalCSS.center_vertical}>
                    <Text >
                        <FontAwesome5 name={"comment"} size={25} color={"black"} />
                    </Text>
                    <Text style={globalCSS.fontNonBold12}>
                        Messages
                    </Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={globalCSS.font20}>
                    Book a Hostel Bed
                </Text>
                <View style={styles.row}>
                    <View style={styles.img}>
                        <Image source={{ uri: `data:image/jpeg;base64,${hostel ? hostel.image : null}` }} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={styles.description}>
                        <View style={styles.hostelInfo}>
                            <Text style={styles.textJustify}>
                                {hostel ? hostel.description : null}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={globalCSS.font15}>
                        Rent Amount: {" "}
                    </Text>
                    <Text style={globalCSS.font15NonBold}>{hostel ? `Rs.${hostel.rent}` : null}</Text>
                </View>

                <View style={styles.row}>
                    <Pressable style={[styles.btnProceedToPay, globalCSS.bgcOne]}>
                        <Text>
                            Proceed to Pay
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    top_row_one: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 100,
        padding: 5
    },
    container: {
        // flex: 1,
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: "5%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20
    },
    img: {
        width: "30%"
    },
    description: {
        width: "60%",
        marginLeft: 10
    },
    textJustify: {
        textAlign: "justify"
    },
    btnProceedToPay: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 5
    }
})