import { Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import globalCSS from "../../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import hostelBanner from "../../../assets/images/hostelbanner.jpg";
import VerticalListSeller from '../../../utils/VerticalListSeller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';

const SellerHome = ({ navigation }) => {
  const [hostel, setHostel] = useState();
  const [user, setUser] = useState();
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getOwnerHostels();
      getUser();
    }, [])
  )
  const getUser = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}users/get-user`, {
        method: "GET",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }
  const getOwnerHostels = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}hostels/hostels`, {
        method: "GET",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data.hostels) {
        setHostel(data.hostels)
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }
  const navigateToAddHostel = () => {
    navigation.navigate("Add Hostel")
  }
  const logOut = async () => {
    await AsyncStorage.removeItem("jwtToken");
    navigation.navigate("Login");
  }
  return (
    <ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInfoVisible}
        onRequestClose={() => {
          setModalInfoVisible(!modalInfoVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={globalCSS.font20}>User Info</Text>

          <View style={styles.modalInfo}>
            <View>
              <Text>
                {
                  user ?
                    user.image ?
                      <View style={styles.center}>
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${user.image}` }}
                          style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                        />
                      </View>
                      :
                      <>
                        <Text style={styles.bold}>
                          Image:
                        </Text>
                        <Text>No Image</Text>
                      </>
                    :
                    <></>
                }
              </Text>
              <Text>
                <Text style={styles.bold}>
                  Name:
                </Text>
                {user ? user.name : null}
              </Text>
              <Text>
                <Text style={styles.bold}>
                  Email:
                </Text>
                {user ? user.email : null}
              </Text>
              <Text>
                <Text style={styles.bold}>
                  Contact:
                </Text>
                {user ? user.contact : null}
              </Text>
            </View>

            <Pressable
              style={[styles.bedInfoModalBtn, globalCSS.bgcTwo]}
              onPress={() => { navigation.navigate("Edit Seller", { user: user }) }}>
              <Text style={[styles.text_center, globalCSS.colorWhite]}>Edit User Data</Text>
            </Pressable>

            <Pressable
              style={[styles.bedInfoModalBtn, globalCSS.bgcZero]}
              onPress={() => setModalInfoVisible(!modalInfoVisible)}>
              <Text style={styles.text_center}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={globalCSS.bgcZero}>
        <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
          <TouchableOpacity onPress={() => { setModalInfoVisible(!modalInfoVisible) }}>

            <Text style={[globalCSS.font20]}>
              {
                user ? user.image ?
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${user.image}` }}
                    style={{ width: 50, height: 50, borderRadius: 30 }}
                  />
                  :
                  <Text style={[globalCSS.font20]}>
                    <FontAwesome5 name={"user"} size={25} color={"black"} />
                  </Text>
                  :
                  <Text style={[globalCSS.font20]}>
                    <FontAwesome5 name={"user"} size={25} color={"black"} />
                  </Text>
              }
              {" "}
              Hi {user ? user.name : "there"}!
            </Text>
          </TouchableOpacity>
          <Pressable onPress={logOut}>
            <View style={globalCSS.center_vertical}>
              <Text >
                <FontAwesome5 name={"sign-out-alt"} size={25} color={"black"} />
              </Text>
              <Text style={globalCSS.fontNonBold12}>
                Logout
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={globalCSS.row}>
          <Image source={hostelBanner} style={{ width: "100%", height: 150 }} />
        </View>

        <View style={globalCSS.row}>
          <Pressable onPress={navigateToAddHostel} style={[styles.add_btn, globalCSS.bgcTwo]}>
            <FontAwesome5 name={"plus"} size={25} color={"#FFF"} />
            <Text style={[styles.add_btn_text, globalCSS.font20, globalCSS.colorWhite]}>Add new hostel</Text>
          </Pressable>
        </View>

        <View>
          <Text style={[globalCSS.font20, styles.width100]}>
            Your Current Hostels
          </Text>
        </View>

        {
          hostel ?
            <FlatList
              data={hostel}
              renderItem={({ item }) => (
                <VerticalListSeller
                  image={item.image}
                  description={item.description}
                  rent={item.rent}
                  id={item._id}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item._id.toString()}
            // extraData={selectedId}
            />
            :
            <View style={styles.center}>
              <Text>No Hostels</Text>
            </View>
        }

      </View>
    </ScrollView>
  )
}

export default SellerHome

const styles = StyleSheet.create({
  top_row_one: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    padding: 5
  },
  add_btn: {
    height: 70,
    width: "90%",
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  add_btn_text: {
    color: "#fff",
    marginLeft: 10
  },
  width100: {
    width: "100%",
    textAlign: "center",
    padding: 10
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    borderRadius: 5
  },
  bold: {
    fontWeight: "600"
  },
  bedInfoModalBtn: {
    margin: 10,
    padding: 5,
    borderRadius: 5
  },
  text_center: {
    textAlign: "center"
  },
})