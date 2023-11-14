import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalCSS from "./GlobalCSS"

const VerticalList = ({ image, metaDesc, rent }) => {
    return (
        <View style={styles.list_item}>
            <Image source={image} style={{ width: 100, height: 100, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }} />
            <View style={styles.description}>
                <Text style={[globalCSS.fontNonBold12, styles.text_justify]}>{metaDesc}</Text>
                <Text style={[styles.rent, styles.text_justify]}>Rs.{rent}</Text>
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
        textAlign:"left",
        paddingLeft: 10
     },
     rent: {
        fontWeight: "600"
     }
})