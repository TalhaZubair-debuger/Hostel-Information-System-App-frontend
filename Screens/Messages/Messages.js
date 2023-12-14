import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import VerticalListMessage from '../../utils/VerticalListMessage';
import { useFocusEffect } from '@react-navigation/native';
import HostName from '../../utils/HostName';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Messages = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const [current, setCurrent] = useState(null);

    useFocusEffect(
        useCallback(() => {
            handleGetUserOrOwnerData();
        }, [])
    )
    const handleGetUserOrOwnerData = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}chats/get-all-messages`, {
                method: "GET",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.messages) {
                setMessages(data.messages);
                setCurrent(data.current);
            }
            else {
                Alert.alert("Alert!", `${data.message}`);
            }
        } catch (error) {
            Alert.alert("Alert!", `${error.message}`);
            console.log(error);
        }
    }

    return (
        <View>
            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Text style={globalCSS.font20}>Messages</Text>
            </View>

            <View style={styles.msgs}>
                <View>
                    {
                        messages && current != null ?
                            messages.map((item, index) => (
                                <View key={index}>
                                    <VerticalListMessage

                                        message={item.messages[item.messages.length - 1].message}
                                        currentUser={current}
                                        userId={item.userId}
                                        ownerId={item.ownerId}
                                        navigation={navigation}
                                    />
                                </View>
                            ))
                            :
                            <Text>No Messages Found</Text>
                    }
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
        justifyContent: "center",
        alignItems: "flex-end",
        height: 100,
        padding: 5
    },
    msgs: {

    }
})