import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import globalCSS from "../../utils/GlobalCSS";
import hostelOneImage from "../../assets/images/hostelOne.jpg";



const Booking = ({ navigation }) => {
    const navigateToHostel = () => {
        navigation.navigate("Hostel");
    }
    return (
        <View>
            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Pressable onPress={navigateToHostel}>
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
                    Book a Room
                </Text>
                <View style={styles.row}>
                    <View style={styles.img}>
                        <Image source={hostelOneImage} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={styles.description}>
                        <View style={styles.hostelInfo}>
                            <Text style={styles.textJustify}>
                                Its the best hostel near university with sunrise view.Its the best 2 bed hostel with study tables.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={globalCSS.font15}>
                        Rent Amount: {" "}
                    </Text>
                    <Text style={globalCSS.font15NonBold}>Rs.7500</Text>
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