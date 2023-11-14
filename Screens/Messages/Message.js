import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Message = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const navigateToHome = () => {
    navigation.navigate("BottomTabs")
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
            Message [Owner]
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.msgs}>
            <View style={[styles.send, globalCSS.bgcOne]}>
              <Text>
                AOA Sir!
              </Text>
            </View>
            <View style={[styles.send, globalCSS.bgcOne]}>
              <Text>
                Hey, Can I get any rent fee concession?
              </Text>
            </View>
            <View style={[styles.recieve, globalCSS.bgcTwo]}>
              <Text>
                The rent fees are fixed and final. Take it or leave it.
              </Text>
            </View>
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
            <Pressable style={[styles.send_btn, globalCSS.bgcTwo]}>
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
    // height: "100%"
  },
  top_row_one: {
    // flex: 1,
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
    // justifyContent: "flex-end",
    // alignItems:"flex-end",
    // bottom: 200,
    width: "100%",
    height: 700,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  send: {
    justifyContent:"flex-end",
    alignItems: "flex-end",
    padding: 10,
    marginVertical: 5,
    marginLeft: "30%",
    borderRadius: 5,
    width: "70%",
    borderRadius: 5
  },
  recieve: {
    justifyContent:"flex-start",
    alignItems: "flex-start",
    padding: 10,
    marginVertical: 5,
    marginRight: "30%",
    borderRadius: 5,
    width: "70%",
    borderRadius: 5
  }

})