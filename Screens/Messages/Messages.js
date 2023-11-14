import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import hostelOneImage from "../../assets/images/hostelOne.jpg";
import hostelTwoImage from "../../assets/images/hostelTwo.jpg";
import hostelThreeImage from "../../assets/images/hostelThree.jpg";
import hostelFourImage from "../../assets/images/hostelFour.jpg";
import VerticalListMessage from '../../utils/VerticalListMessage';

const Messages = ({ navigation }) => {
    const DATA = [
        {
            id: 1,
            image: hostelOneImage,
            name: "Ali Khan",
            message: "Ok Finalize the booking for me."
        },
        {
            id: 2,
            image: hostelTwoImage,
            name: "Christen Betzman",
            message: "It's full and final price"
        },
        {
            id: 3,
            image: hostelThreeImage,
            name: "Roy Filth",
            message: "No, we can't"
        },
        {
            id: 4,
            image: hostelFourImage,
            name: "John Smith",
            message: "Can we negotiate a little?"
        },
    ];
    const navigateToHome = () => {
        navigation.navigate("BottomTabs")
    }
    return (
        <View>
            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Pressable onPress={navigateToHome}>
                    <Text>
                        <FontAwesome5 name={"arrow-left"} size={20} color={"black"} />
                    </Text>
                </Pressable>
            </View>

            <View style={styles.msgs}>
                <Text style={globalCSS.font20}>Messages</Text>
                <View>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <VerticalListMessage
                                image={item.image}
                                name={item.name}
                                message={item.message}
                                navigation={navigation}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    // extraData={selectedId}
                    />
                </View>
            </View>
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({
    top_row_one: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        height: 100,
        padding: 5
    },
    msgs: {

    }
})