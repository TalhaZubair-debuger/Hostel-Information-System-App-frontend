import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BedsInfo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [hosteliteName, setHosteliteName] = useState("");
  const [hosteliteContact, setHosteliteContact] = useState("");
  const navigateToHostel = () => {
    navigation.navigate("Seller Hostel")
  }
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={globalCSS.font15}>Add Bed Info</Text>
          <View style={styles.width100}>
            <Text style={globalCSS.font15NonBold}>
              Hotelite Name
            </Text>
            <TextInput
              placeholder="Name"
              style={globalCSS.inputStyle3}
              value={hosteliteName}
              onChangeText={(newValue) => setHosteliteName(newValue)}
            />
          </View>
          <View style={styles.width100}>
            <Text style={globalCSS.font15NonBold}>
              Hotelite Contact
            </Text>
            <TextInput
              placeholder="03000000000"
              style={globalCSS.inputStyle3}
              value={hosteliteContact}
              onChangeText={(newValue) => setHosteliteContact(newValue)}
            />
          </View>
          <Pressable
            style={[styles.bedInfoModalBtn, globalCSS.bgcOne]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={[styles.textStyle]}>Add Bed Information</Text>
          </Pressable>

          <Pressable
            style={[styles.bedInfoModalBtn, globalCSS.bgcZero]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={[styles.textStyle]}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInfoVisible}
        onRequestClose={() => {
          setModalInfoVisible(!modalInfoVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={globalCSS.font20}>Bed Info</Text>

          <View style={styles.modalInfo}>
            <View>
              <Text>
                <Text style={styles.bold}>
                  Hostelite Name:
                </Text>
                Zain
              </Text>

              <Text>
                <Text style={styles.bold}>
                  Hostelite Contact:
                </Text>
                0300000000
              </Text>

              <Text>
                <Text style={styles.bold}>
                  Rent Amount:
                </Text>
                Rs.7500
              </Text>

              <Text>
                <Text style={styles.bold}>
                  Due Date:
                </Text>
                31st Oct, 23
              </Text>

              <Text>
                <Text style={styles.bold}>
                  Previous Dues:
                </Text>
                Clear
              </Text>
            </View>
          </View>

          <Pressable
            style={[styles.bedMsgModalBtn, globalCSS.bgcOne]}
            onPress={() => setModalInfoVisible(!modalInfoVisible)}>
            <Text style={[styles.textStyle]}>Message hostelite</Text>
          </Pressable>

          <Pressable
            style={[styles.bedInfoModalBtn, globalCSS.bgcZero]}
            onPress={() => setModalInfoVisible(!modalInfoVisible)}>
            <Text style={[styles.textStyle]}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
        <Pressable onPress={navigateToHostel}>
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
            <View style={styles.grey}></View>
            <Text style={styles.mt_10}>Unallocated</Text>
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

        <Text style={globalCSS.font15}>Pre-Occupied Beds</Text>
        <View style={styles.preOccupiedBeds}>
          <View style={styles.grid}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View style={[styles.bed, styles.greyBed]}>
                <FontAwesome5 name={"bed"} size={20} color={"grey"} />
              </View>
            </Pressable>

            <Pressable onPress={() => setModalInfoVisible(!modalInfoVisible)}>
              <View style={[styles.bed, styles.greyBed]}>
                <FontAwesome5 name={"bed"} size={20} color={"grey"} />
              </View>
            </Pressable>

            <View style={[styles.bed, styles.greyBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"grey"} />
            </View>
            <View style={[styles.bed, styles.greyBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"grey"} />
            </View>
            <View style={[styles.bed, styles.greyBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"grey"} />
            </View>
          </View>
        </View>

        <Text style={globalCSS.font15}>Occupied Beds</Text>
        <View style={styles.occupiedBeds}>
          <View style={styles.grid}>
            <Pressable onPress={() => setModalInfoVisible(!modalInfoVisible)}>
              <View style={[styles.bed, styles.greenBed]}>
                <FontAwesome5 name={"bed"} size={20} color={"red"} />
              </View>
            </Pressable>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"red"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"red"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"red"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"red"} />
            </View>
          </View>
        </View>

        <Text style={globalCSS.font15}>Vacant Beds</Text>
        <View style={styles.availableBeds}>
          <View style={styles.grid}>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"lightgreen"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"lightgreen"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"lightgreen"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"lightgreen"} />
            </View>
            <View style={[styles.bed, styles.greenBed]}>
              <FontAwesome5 name={"bed"} size={20} color={"lightgreen"} />
            </View>
          </View>
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
    flexDirection: "column",
    marginTop: 10
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