import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    bgcZero: {
        backgroundColor: "#F3F3F3"
    },
    bgcOne: {
        backgroundColor: "#CBC3E3"
    },
    bgcTwo: {
        backgroundColor: "#BF40BF",
    },
    colorWhite:{
        color:"#fff"
    },
    font: {
        fontFamily: "Open Sans"
    },
    inputStyle1: {
        width: "80%",
        height: 50,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 5,
        margin: 5,
        padding: 5
    },
    inputStyle2: {
        width: "80%",
        height: 40,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
        padding: 5
    },
    inputStyle3: {
        width: "100%",
        height: 40,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
        padding: 5
    },
    inputStyle4: {
        width: "80%",
        height: 40,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        backfaceVisibility:"visible"
    },
    inputStyle5: {
        width: "40%",
        height: 40,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        margin: "auto",
        justifyContent:"center",
        alignItems:"center"
    },
    font25: {
        fontSize: 25,
        fontWeight: "600"
    },
    font20: {
        fontSize: 20,
        fontWeight: "600"
    },
    font15: {
        fontSize: 15,
        fontWeight: "600"
    },
    font15NonBold: {
        fontSize: 15,
    },
    font12: {
        fontSize: 12,
        fontWeight: "600"
    },
    fontNonBold12: {
        fontSize: 12,
    },
    center_vertical: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    rowNonCenter: {
        flexDirection: "row",
    },
    text_center: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    
})

export default styles;