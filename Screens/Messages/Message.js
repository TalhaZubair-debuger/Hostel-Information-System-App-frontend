import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect } from '@react-navigation/native';
import HostName from '../../utils/HostName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


const Message = ({ navigation, route }) => {
  const { userId, ownerId } = route.params;
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [focus, setFocus] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setFocus(true)
      handleGetChatMessages(userId, ownerId);

      return () => {
        setFocus(false);
      };
    }, [])
  )

  const handleGetChatMessages = async (UserId, OwnerId) => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}chats/get-messages?userId=${UserId}&ownerId=${OwnerId}`, {
        method: "GET",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data.messages) {
        setChat(data.messages.messages);
        setCurrentUser(data.current);
        setMessage("");
      }
      else {
        Alert.alert("Alert!", `${data.message}`);
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }

  useEffect(() => {
    let intervalId;
    if (focus) {
      intervalId = setInterval(() => {
        getNewMessages()
      }, 5000)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [chat])


  const getNewMessages = async () => {
    try {
      const chatLength = chat.length;
      if (!chatLength) {
        return;
      }
      const formData = {
        chatLength
      }
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}chats/get-new-messages?userId=${userId}&ownerId=${ownerId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.messages) {
        setChat(data.messages.messages);
        setCurrentUser(data.current);
      }
      else {
        console.log(data.message)
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }



  const navigateToHome = () => {
    navigation.navigate("BottomTabs")
  }


  const submitChatMessage = async () => {
    if (
      message === ""
    ) {
      Alert.alert("Failure", "Please fill form completely");
    } else {
      console.log(ownerId + " and " + userId);
      const formData = {
        message
      };
      try {
        const jwtToken = await AsyncStorage.getItem("jwtToken");
        const response = await fetch(`${HostName}chats/add-message?userId=${userId}&ownerId=${ownerId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${jwtToken}`
          },
          method: "POST",
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.messages) {
          setChat(data.messages.messages);
          setCurrentUser(data.current);
          setMessage("");
        }
        else {
          Alert.alert("Alert", `${data.message}`);
        }
      } catch (error) {
        Alert.alert("Failed!", `${error.message}`);
        console.log(error);
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
        <Pressable onPress={navigateToHome}>
          <Text>
            <FontAwesome5 name={"arrow-left"} size={20} color={"black"} />
          </Text>
        </Pressable>
        <View>
          <Text style={globalCSS.font20}>
            Message User
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.msgs}>
            {
              chat ?
                chat.map(msg => (
                  <View style={[currentUser ? currentUser === msg.senderId ? styles.send : styles.recieve : null, 
                  globalCSS.bgcOne]}>
                    <Text key={msg.senderId+new Date()}>
                      {msg.message}
                    </Text>
                  </View>
                ))
                : null
            }
          </View>
        </ScrollView>
        <View style={styles.sendMsg}>
          <View style={[styles.row, globalCSS.bgcOne]}>
            <TextInput
              placeholder="Write message"
              style={globalCSS.inputStyle4}
              value={message}
              onChangeText={(newValue) => setMessage(newValue)}
            />
            <Pressable onPress={submitChatMessage} style={[styles.send_btn, globalCSS.bgcTwo]}>
              <FontAwesome5 name={"paper-plane"} size={20} color={"black"} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  top_row_one: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    padding: 5
  },
  sendMsg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  row: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    padding: 10
  },
  send_btn: {
    padding: 5,
    borderRadius: 5,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  msgs: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    bottom: 150,
    width: "100%",
    height: 700,
  },
  send: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    marginVertical: 5,
    marginLeft: "30%",
    borderRadius: 5,
    width: "70%",
    borderRadius: 5
  },
  recieve: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    marginVertical: 5,
    marginRight: "30%",
    borderRadius: 5,
    width: "70%",
    borderRadius: 5,
  }

})