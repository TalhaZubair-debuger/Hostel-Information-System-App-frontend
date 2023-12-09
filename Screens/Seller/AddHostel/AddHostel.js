import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import globalCSS from "../../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../../utils/HostName';
// import RNFS from 'react-native-fs';


const AddHostel = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState(null);
  const [image, setImage] = useState();
  const [roomSize, setRoomSize] = useState("50 sq. ft");
  const [bedsInRoom, setBedsInRoom] = useState(null);
  const [totalBeds, setTotalBeds] = useState(null);
  const [occupiedBeds, setOccupiedBeds] = useState(null);
  const [vacantBeds, setVacantBeds] = useState(null);
  const [facilities, setFacilities] = useState("Room Only");
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publishableKey, setPublishableKey] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [onlinePaymentmodalVisible, setOnlinePaymentmodalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      assetId: true,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      console.log("Selected Image Data: " + JSON.stringify(result.assets[0]));
    }
  }
  const navigateBackToHome = () => {
    navigation.navigate("SellerBottom");
  }
  const handleAddHostel = async () => {
    if (
      image === null ||
      description === "" ||
      rent === null ||
      roomSize === "" ||
      bedsInRoom === null ||
      totalBeds === null ||
      occupiedBeds === null ||
      vacantBeds === null ||
      university === "" ||
      facilities === "" ||
      publishableKey === "" || 
      privateKey === ""
    ) {
      Alert.alert("Failure", "Please fill form completely");
    } else {
      const formData = {
        image: image.base64,
        description,
        rent,
        roomSize,
        bedsInRoom,
        totalBeds,
        occupiedBeds,
        vacantBeds,
        facilities,
        city,
        university,
        publishableKey,
        privateKey
      };

      try {
        const jwtToken = await AsyncStorage.getItem("jwtToken");
        const response = await fetch(`${HostName}hostels/add-hostel`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${jwtToken}`
          },
          method: "PUT",
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.hostel) {
          setImage("");
          setDescription("");
          setRent(null);
          setRoomSize("");
          setBedsInRoom(null);
          setTotalBeds(null);
          setOccupiedBeds(null);
          setVacantBeds(null);
          setFacilities("");
          setCity("");
          setUniversity("");
          Alert.alert("Success", `${data.message}`);
        }
      } catch (error) {
        Alert.alert("Failed!", `${error.message}`);
        console.log(error);
      }
    }
  }
  return (
    <ScrollView>
      <View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={onlinePaymentmodalVisible}
          onRequestClose={() => {
            setOnlinePaymentmodalVisible(!onlinePaymentmodalVisible);
          }}
        >
          <View style={styles.centeredView}>

            <View style={styles.row}>
              <View style={styles.width100}>
                <Text style={globalCSS.font15NonBold}>
                  Stripe Publishable Key
                </Text>
                <TextInput
                  placeholder="Stripe Publishable Key"
                  style={globalCSS.inputStyle3}
                  value={publishableKey}
                  onChangeText={(newValue) => setPublishableKey(newValue)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.width100}>
                <Text style={globalCSS.font15NonBold}>
                  Stripe Private Key
                </Text>
                <TextInput
                  placeholder="Stripe Private Key"
                  style={globalCSS.inputStyle3}
                  value={privateKey}
                  onChangeText={(newValue) => setPrivateKey(newValue)}
                />
              </View>
            </View>
            <Pressable
              style={[styles.applyFilterBtn, globalCSS.bgcOne]}
              onPress={() => setOnlinePaymentmodalVisible(!onlinePaymentmodalVisible)}>
              <Text style={[styles.textStyle]}>Add Payment Info</Text>
            </Pressable>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>

            <View style={styles.row}>
              <View style={styles.width100}>
                <Text style={globalCSS.font15NonBold}>
                  Total Beds
                </Text>
                <TextInput
                  placeholder="Total beds"
                  style={globalCSS.inputStyle3}
                  value={totalBeds}
                  keyboardType="numeric"
                  onChangeText={(newValue) => setTotalBeds(newValue)}
                />
              </View>
            </View>
            <View style={[styles.row, styles.mt10]}>

              <View style={styles.width50}>
                <Text style={globalCSS.font15NonBold}>
                  Occupied Beds
                </Text>
                <TextInput
                  placeholder="Occupied Beds"
                  style={globalCSS.inputStyle3}
                  value={occupiedBeds}
                  keyboardType="numeric"
                  onChangeText={(newValue) => setOccupiedBeds(newValue)}
                />
              </View>

              <View style={styles.width50}>
                <Text style={globalCSS.font15NonBold}>
                  Vacant Beds
                </Text>
                <TextInput
                  placeholder="Vacant Beds"
                  style={globalCSS.inputStyle3}
                  value={vacantBeds}
                  keyboardType="numeric"
                  onChangeText={(newValue) => setVacantBeds(newValue)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.width100}>
                <Text style={globalCSS.font15NonBold}>
                  Beds in one room
                </Text>
                <TextInput
                  placeholder="Beds in one room"
                  style={globalCSS.inputStyle3}
                  value={bedsInRoom}
                  keyboardType="numeric"
                  onChangeText={(newValue) => setBedsInRoom(newValue)}
                />
              </View>
            </View>
            <Pressable
              style={[styles.applyFilterBtn, globalCSS.bgcOne]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle]}>Add Beds Info</Text>
            </Pressable>
          </View>
        </Modal>


        <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
          <Pressable onPress={navigateBackToHome}>
            <Text>
              <FontAwesome5 name={"arrow-left"} size={20} color={"black"} />
            </Text>
          </Pressable>
          <Text style={globalCSS.font20}>
            Add New Hostel
          </Text>
        </View>

        <View style={styles.container}>
          <View style={[styles.row, styles.mt10]}>
            <Pressable style={[styles.pick_image, globalCSS.bgcTwo]} onPress={pickImage}>
              <FontAwesome5 name={"image"} size={25} color={"#000"} />
              <Text style={[styles.center, globalCSS.font15NonBold]}>
                Pick Image
              </Text>
            </Pressable>
            {image && <Image source={{ uri: image.uri }} style={{ width: 50, height: 50, margin: 10 }} />}
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
              <Text style={globalCSS.font15NonBold}>
                Description
              </Text>
              <TextInput
                placeholder="Write description"
                style={globalCSS.inputStyle3}
                value={description}
                onChangeText={(newValue) => setDescription(newValue)}
              />
            </View>
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
              <Text style={globalCSS.font15NonBold}>
                Rent
              </Text>
              <TextInput
                placeholder="Rs."
                style={globalCSS.inputStyle3}
                value={rent}
                onChangeText={(newValue) => setRent(newValue)}
              />
            </View>
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width50}>
              <Text style={globalCSS.font15NonBold}>
                Room Size
              </Text>
              <View style={styles.dropdown}>
                <Picker
                  selectedValue={roomSize}
                  onValueChange={(roomSize) => setRoomSize(roomSize)}
                >
                  <Picker.Item label="5 sq. ft" value="5 sq. ft" />
                  <Picker.Item label="10 sq. ft" value="10 sq. ft" />
                  <Picker.Item label="15 sq. ft" value="15 sq. ft" />
                  <Picker.Item label="20 sq. ft" value="20 sq. ft" />
                  <Picker.Item label="30 sq. ft" value="30 sq. ft" />
                  <Picker.Item label="40 sq. ft" value="40 sq. ft" />
                  <Picker.Item label="50 sq. ft" value="50 sq. ft" />
                </Picker>
              </View>
            </View>

            <View style={styles.width50}>
              <Text style={globalCSS.font15NonBold}>
                Beds
              </Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={[styles.btn, globalCSS.bgcTwo]}>
                <Text style={globalCSS.font15NonBold}>Beds Info</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
              <Text style={globalCSS.font15NonBold}>
                Facilities
              </Text>
              <View style={styles.dropdown}>
                <Picker
                  selectedValue={facilities}
                  onValueChange={(facilities) => setFacilities(facilities)}
                >
                  <Picker.Item label="Room Only" value="RoomOnly" />
                  <Picker.Item label="Room + Bath" value="RoomBath" />
                  <Picker.Item label="Room + Bath + Kitchen" value="RoomBathKitchen" />
                  <Picker.Item label="Room + Bath + Wifi" value="RoomBathWifi" />
                  <Picker.Item label="Room + Bath + Kitchen + Wifi" value="RoomBathKitchenWifi" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
              <Text style={globalCSS.font15NonBold}>
                University
              </Text>
              <TextInput
                placeholder="Enter University"
                style={globalCSS.inputStyle3}
                value={university}
                onChangeText={(newValue) => setUniversity(newValue)}
              />
            </View>
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
              <Text style={globalCSS.font15NonBold}>
                City
              </Text>
              <TextInput
                placeholder="Enter city"
                style={globalCSS.inputStyle3}
                value={city}
                onChangeText={(newValue) => setCity(newValue)}
              />
            </View>
          </View>
          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
            <Text style={globalCSS.font15NonBold}>
                Opional:
              </Text>
              <Pressable
                onPress={() => setOnlinePaymentmodalVisible(!onlinePaymentmodalVisible)}
                style={[styles.btn, globalCSS.bgcOne]}>
                <Text style={globalCSS.font15NonBold}>Online Payment Integration</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.row, styles.mt10]}>
            <View style={styles.width100}>
              <Pressable onPress={handleAddHostel} style={[styles.btn, globalCSS.bgcTwo]}>
                <Text style={globalCSS.font15NonBold}>Add Hostel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default AddHostel

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    flexDirection: "column"
  },
  top_row_one: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    padding: 5
  },
  row: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  width100: {
    width: "100%"
  },
  pick_image: {
    width: 150,
    height: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    margin: 10
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  width50: {
    width: "48%"
  },
  dropdown: {
    borderWidth: 2,
    borderColor: "#000",
    width: "100%",
    color: "#000",
    borderColor: "#000",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginVertical: 5
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    marginVertical: 10
  },
  mt10: {
    marginVertical: 5
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
  applyFilterBtn: {
    marginTop: 10,
    borderRadius: 5,
    fontSize: 15,
    width: 150,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  }
})