import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';
import globalCSS from "../../utils/GlobalCSS";
import { FlatList } from 'react-native';
import YourHostelList from '../../utils/YourHostelList';


const YourHostel = ({ navigation, route }) => {
    const [change, setChange] = useState(false);
    const [hostels, setHostels] = useState("")
    const [beds, setBeds] = useState("")
    const { userId, setStripeKey } = route.params;
    useFocusEffect(
        useCallback(() => {
            getBeds();
        }, [change])
    )
    const getBeds = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostel-beds/get-bed/${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.hostels) {
                setHostels(data.hostels);
                setBeds(data.beds);
                setChange(false);
            }
            else {
                Alert.alert("Alert!", `${data.message}`);
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }
    return (
        <View>

            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Text style={globalCSS.font20}>
                    Your Hostels
                </Text>
            </View>

            <View style={styles.list}>
                {
                    beds ?
                        beds.length ?
                            <FlatList
                                data={beds}
                                renderItem={({ item }) => (

                                    item.offlinePaymentSent ?
                                        item.offlinePaymentSent === true && item.offlinePaymentRecieved === true ?
                                            <YourHostelList
                                                navigation={navigation}
                                                hostels={hostels ? hostels : null}
                                                hosteliteName={item.hosteliteName}
                                                rentAmont={item.rentAmont}
                                                dueDate={item.dueDate}
                                                previousDues={item.previousDues}
                                                hostelId={item.hostelId}
                                                bedId={item._id}
                                                setChange={setChange}
                                                setStripeKey={setStripeKey}
                                                offlinePayment={item.offlinePaymentRecieved}
                                            />
                                            :
                                            <></>
                                        :
                                        <YourHostelList
                                            navigation={navigation}
                                            hostels={hostels ? hostels : null}
                                            hosteliteName={item.hosteliteName}
                                            rentAmont={item.rentAmont}
                                            dueDate={item.dueDate}
                                            previousDues={item.previousDues}
                                            hostelId={item.hostelId}
                                            bedId={item._id}
                                            setChange={setChange}
                                            setStripeKey={setStripeKey}
                                        />
                                    // <></>

                                )}
                                keyExtractor={(item) => item._id.toString()}
                            />
                            :
                            <View style={styles.width100}>
                                <Text style={globalCSS.text_center}>User has no hostel booked.</Text>
                            </View>
                        :
                        <View style={styles.width100}>
                            <Text style={globalCSS.text_center}>User has no hostel booked.</Text>
                        </View>
                }
            </View>
        </View>
    )
}

export default YourHostel

const styles = StyleSheet.create({
    top_row_one: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        height: 100,
        padding: 5
    },
    list: {
        width: "100%",
        marginVertical: 10
    }
})