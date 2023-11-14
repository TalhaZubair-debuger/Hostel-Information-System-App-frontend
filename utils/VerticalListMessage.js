import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import globalCSS from "./GlobalCSS"

const VerticalListMessage = ({ image, name, message, navigation }) => {
    const navigateToMessage = () => {
        navigation.navigate("Message");
    }
    return (
        <TouchableOpacity onPress={navigateToMessage}>
            <View style={styles.list_item}>
                <Image source={image} style={{ width: 50, height: 50, borderRadius: 30 }} />
                <View style={styles.description}>
                    <Text style={[styles.rent, styles.text_justify]}>{name}</Text>
                    <Text style={[globalCSS.fontNonBold12, styles.text_justify]}>{message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalListMessage

const styles = StyleSheet.create({
    list_item: {
        flex: 1,
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