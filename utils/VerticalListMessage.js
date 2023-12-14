import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "./GlobalCSS"
import { useFocusEffect } from '@react-navigation/native';
import HostName from './HostName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const VerticalListMessage = ({ message, ownerId, userId, currentUser, navigation }) => {
    const [user, setUser] = useState();
    useFocusEffect(
        useCallback(() => {
            fetchUserDetails();
        }, [])
    )
    const fetchUserDetails = async () => {
        if (ownerId == currentUser) {
            try {
                const jwtToken = await AsyncStorage.getItem("jwtToken");
                const response = await fetch(`${HostName}users/get-user/${userId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${jwtToken}`
                    }
                });
                const data = await response.json();
                if (data.user) {
                    setUser(data.user)
                }
            } catch (error) {
                Alert.alert("Failed to fetch!", `${error.message}`);
                console.log(error);
            }
        }
        else if (userId == currentUser) {
            try {
                const jwtToken = await AsyncStorage.getItem("jwtToken");
                const response = await fetch(`${HostName}users/get-user/${ownerId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${jwtToken}`
                    }
                });
                const data = await response.json();
                if (data.user) {
                    setUser(data.user)
                }
            } catch (error) {
                Alert.alert("Failed to fetch!", `${error.message}`);
                console.log(error);
            }
        }
        else {
            Alert.alert("Alert!", "Error getting Details");
        }
    }

    return (
        <TouchableOpacity onPress={() => { navigation.navigate("Message", { userId, ownerId }) }}>
            <View style={styles.list_item}>
                {
                    user ? user.image ?
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${user ? user.image ? user.image : null : null}` }}
                            style={{ width: 50, height: 50, borderRadius: 30 }}
                        />
                        :
                        <Text>
                            <FontAwesome5 name={"user"} size={30} color={"black"} />
                        </Text>
                        :
                        <Text>
                            <FontAwesome5 name={"user"} size={30} color={"black"} />
                        </Text>}
                <View style={styles.description}>
                    <Text style={[styles.rent, styles.text_justify]}>{user ? user.name ? user.name : null : null}</Text>
                    <Text style={[globalCSS.fontNonBold12, styles.text_justify]}>{message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalListMessage

const styles = StyleSheet.create({
    list_item: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: 80,
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 5,
        shadowColor: "#777777bb",
        marginVertical: 5
    },
    description: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        // alignItems: "center"
    },
    text_justify: {
        textAlign: "left",
        paddingLeft: 10
    },
    rent: {
        fontWeight: "600"
    }
})