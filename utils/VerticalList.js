import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "./GlobalCSS"
import { useFocusEffect } from '@react-navigation/native';
import { Pressable } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from './HostName';

const VerticalList = ({ id, image, metaDesc, rent, navigation, setFavorite, userFavs }) => {
    const [description, setDescription] = useState("");
    const [displayFav, setDisplayFav] = useState(false);
    useFocusEffect(
        useCallback(() => {
            if (metaDesc.length >= 50) {
                setDescription(`${metaDesc.slice(0, 50)}...`);
            }
            else {
                setDescription(metaDesc);
            }
            if (userFavs) {
                for (const item of userFavs) {
                    if (item === id) {
                        setDisplayFav(true);
                        break;
                    }
                }
            }
        }, [id, displayFav, userFavs])
    )
    const handleAddToFavorites = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostels/favorites/add-to-favorite/${id}`, {
                method: "POST",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.message) {
                Alert.alert("Alert!", `${data.message}`);
                setFavorite(true);
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }
    const removeFromFavorites = async() => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostels/favorites/remove-from-favorite/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.message) {
                Alert.alert("Alert!", `${data.message}`);
                setFavorite(true);
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }
    return (
        <View >
            <View style={styles.list_item}>
                <Pressable onPress={() => { navigation.navigate("Hostel", { id: id }) }} style={styles.list_item}>
                    <Image source={{ uri: `data:image/jpeg;base64,${image}` }}
                        style={{ width: 100, height: 100, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }} />
                    <View style={styles.description}>
                        <Text style={[globalCSS.fontNonBold12, styles.text_justify]}>
                            {description}
                        </Text>
                        <Text style={[styles.rent, styles.text_justify]}>
                            Rs.{rent}
                        </Text>
                    </View>
                </Pressable>
                {
                    displayFav === true ?
                        <Pressable onPress={removeFromFavorites}>
                            <View style={styles.favourites}>
                                <Text>
                                    <FontAwesome5 name={"check-circle"} size={20} color={"black"} />
                                </Text>
                            </View>
                        </Pressable>
                        :
                        <Pressable onPress={handleAddToFavorites}>
                            <View style={styles.favourites}>
                                <Text>
                                    <FontAwesome5 name={"heart"} size={20} color={"black"} />
                                </Text>
                            </View>
                        </Pressable>
                }
            </View>
        </View>
    )
}

export default VerticalList;

const styles = StyleSheet.create({
    list_item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: 100,
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
    },
    favourites: {
        marginHorizontal: 10
    }
})