import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect } from '@react-navigation/native';
import HostName from '../../utils/HostName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { FlatList } from 'react-native';
import Bed from './Bed';


const BedsInfo = ({ navigation, route }) => {
  const [bedsData, setBedsData] = useState();
  const [change, setChange] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const { id } = route.params;

  useFocusEffect(
    useCallback(() => {
      getHostelsBeds();
    }, [change])
  )

  const getHostelsBeds = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}hostel-beds/get-bed-records/${id}`, {
        method: "GET",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        setBedsData(data.Beds);
        setOwnerId(data.ownerId);
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }

  return (
    <View>

      <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
        <Pressable onPress={() => { navigation.navigate("Seller Hostel", { id: id }) }}>
          <Text style={globalCSS.font20}>
            <FontAwesome5 name={"arrow-left"} size={20} color={"black"} />
          </Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={globalCSS.font20}>Beds Management</Text>
        </View>

        <View style={[styles.row, globalCSS.bgcZero]}>
          <View style={styles.item}>
            <View style={styles.lightgrey}></View>
            <Text style={styles.mt_10}>This background for pre-occupied beds</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.lightpurple}></View>
          <Text style={styles.mt_10}>This background is for unverified offline payments.</Text>
        </View>

        <View style={[styles.row, globalCSS.bgcZero]}>
          <View style={styles.item}>
            <View style={styles.grey}></View>
            <Text style={styles.mt_10}>Unoccupied</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.red}></View>
            <Text style={styles.mt_10}>Dues Pending</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.green}></View>
            <Text style={styles.mt_10}>Dues Cleared</Text>
          </View>
        </View>

        <View >
          {
            bedsData ?
              bedsData.length ?
                <FlatList
                  data={bedsData}
                  numColumns={5}
                  renderItem={({ item }) => (
                    <Bed
                      hostelId={item.hostelId}
                      hosteliteName={item.hosteliteName}
                      contact={item.contact}
                      id={item._id}
                      rentAmont={item.rentAmont}
                      dueDate={item.dueDate}
                      previousDues={item.previousDues}
                      preOccupied={item.preOccupied}
                      occupied={item.occupied}
                      occupantId={item.occupantId}
                      offlinePaymentRecieved={item.offlinePaymentRecieved}
                      ownerId={ownerId}
                      setChange={setChange}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                />
                :
                <View style={styles.width100}>
                  <Text style={globalCSS.text_center}>No Beds data found</Text>
                </View>
              :
              <></>
          }
        </View>
      </View>
    </View>
  )
}

export default BedsInfo

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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    maxHeight: "100%"
  },
  preOccupiedBeds: {
    margin: 5
  },
  grid: {
    flexDirection: "row",
    width: "100%",
    borderTopColor: "#000",
    borderTopWidth: 1,
    borderBottomColor: "#000",
    borderBottomWidth: 1
  },
  bed: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#000",
    height: 50,
    width: 50
  },
  greyBed: {
    backgroundColor: "lightgrey"
  },
  greenBed: {
    backgroundColor: "white"
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    padding: 5,
    elevation: 30,
    shadowColor: "#000",
  },
  width100: {
    width: "100%"
  },
  bedInfoModalBtn: {
    margin: 10,
    padding: 5,
    borderRadius: 5
  },
  bold: {
    fontWeight: "600"
  },
  bedMsgModalBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  grey: {
    width: 10,
    height: 10,
    backgroundColor: "grey"
  },
  lightgrey: {
    width: 10,
    height: 10,
    backgroundColor: "lightgrey"
  },
  lightpurple: {
    width: 10,
    height: 10,
    backgroundColor: "#CBC3E3"
  },
  red: {
    width: 10,
    height: 10,
    backgroundColor: "red"
  },
  green: {
    width: 10,
    height: 10,
    backgroundColor: "green"
  },
  mt_10: {
    marginTop: -7
  }
})