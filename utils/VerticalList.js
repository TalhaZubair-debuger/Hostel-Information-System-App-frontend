import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "./GlobalCSS"
import { useFocusEffect } from '@react-navigation/native';
import { Pressable } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const VerticalList = ({ id, image, metaDesc, rent, navigation }) => {
    const [description, setDescription] = useState("");
    useFocusEffect(
        useCallback(() => {
            if (metaDesc.length >= 50) {
                setDescription(`${metaDesc.slice(0, 50)}...`);
            }
            else {
                setDescription(metaDesc);
            }
        }, [])
    )
    const handleNavigation = () => {
        navigation.navigate("Hostel", { id: id });
    }
    const handleAddToFavorites = async () => {
        user.favorites.filter(item => item._id !== id);
    }
    return (
        <Pressable onPress={handleNavigation}>
            <View style={styles.list_item}>
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
                {/* <Pressable onPress={handleAddToFavorites}> */}
                <View style={styles.favourites}>
                    <Text>
                        <FontAwesome5 name={"heart"} size={20} color={"black"} />
                    </Text>
                </View>
                {/* </Pressable> */}
            </View>
        </Pressable>
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