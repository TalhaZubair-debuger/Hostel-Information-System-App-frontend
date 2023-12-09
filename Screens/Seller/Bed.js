import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import globalCSS from "../../utils/GlobalCSS";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';



const Bed = ({ hostelId, hosteliteName, contact, rentAmont, dueDate, previousDues,
    preOccupied, occupied, occupantId, id, setChange, ownerId, navigation }) => {

    const [addBedInfoModel, setAddBedInfoModel] = useState(false);
    const [editBedInfoModel, setEditBedInfoModel] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [name, setName] = useState("");
    const [Contact, setContact] = useState(null);
    const [editName, setEditName] = useState("");
    const [editContact, setEditContact] = useState("");
    const [editRent, setEditRent] = useState("");
    const handleModelOpen = () => {
        if (occupied === false && preOccupied === true) {
            setAddBedInfoModel(!addBedInfoModel);
        }
        else if (occupied === true) {
            setModalInfoVisible(!modalInfoVisible);
        }
        else {
            Alert.alert("Alert!", "Bed is not yet allocated to any hostelite.");
        }
    }
    const handleSubmitBedInfo = async () => {
        if (
            name === "" ||
            Contact === null
        ) {
            Alert.alert("Failure", "Please fill form completely");
        } else {
            const formData = {
                name,
                contact: Contact
            };
            try {
                const jwtToken = await AsyncStorage.getItem("jwtToken");
                const response = await fetch(`${HostName}hostel-beds/add-bed-info/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${jwtToken}`
                    },
                    method: "POST",
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.message) {
                    setName("");
                    setContact(null);
                    setChange(true);
                    setAddBedInfoModel(!addBedInfoModel);
                    Alert.alert("Success", `${data.message}`);
                }
            } catch (error) {
                Alert.alert("Failed!", `${error.message}`);
                console.log(error);
            }
        }
    }
    const handleDeleteHostel = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostel-beds/delete-bed/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.message) {
                Alert.alert("Alert!", `${data.message}`);
                setChange(true);
                setModalInfoVisible(!modalInfoVisible);
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }

    const handleEditHostelliteData = () => {
        setModalInfoVisible(!modalInfoVisible);
        setEditBedInfoModel(!editBedInfoModel);
    }

    const handleUpdateData = async () => {
        if (
            editName === "" ||
            editContact === null
        ) {
            Alert.alert("Failure", "Please fill form completely");
        } else {
            let formData;
            if (editRent !== "") {
                formData = {
                    name: editName,
                    contact: editContact,
                    rent: editRent
                };
            }
            else {
                formData = {
                    name: editName,
                    contact: editContact
                };
            }
            try {
                const jwtToken = await AsyncStorage.getItem("jwtToken");
                const response = await fetch(`${HostName}hostel-beds/update-data/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${jwtToken}`
                    },
                    method: "PATCH",
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.message) {
                    setName("");
                    setContact(null);
                    setChange(true);
                    Alert.alert("Success", `${data.message}`);
                    setEditBedInfoModel(!editBedInfoModel);
                }
            } catch (error) {
                Alert.alert("Failed!", `${error.message}`);
                console.log(error);
            }
        }
    }
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={addBedInfoModel}
                onRequestClose={() => {
                    setAddBedInfoModel(!addBedInfoModel);
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
                            value={name}
                            onChangeText={(newValue) => setName(newValue)}
                        />
                    </View>
                    <View style={styles.width100}>
                        <Text style={globalCSS.font15NonBold}>
                            Hotelite Contact
                        </Text>
                        <TextInput
                            placeholder="03000000000"
                            style={globalCSS.inputStyle3}
                            value={Contact}
                            keyboardType="numeric"
                            onChangeText={(newValue) => setContact(newValue)}
                        />
                    </View>
                    <Pressable
                        style={[styles.bedInfoModalBtn, globalCSS.bgcOne]}
                        onPress={handleSubmitBedInfo}>
                        <Text style={[styles.textStyle]}>Add Bed Information</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.bedInfoModalBtn, globalCSS.bgcZero]}
                        onPress={() => setAddBedInfoModel(!addBedInfoModel)}>
                        <Text style={[styles.textStyle]}>Cancel</Text>
                    </Pressable>
                </View>
            </Modal >

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
                                {hosteliteName ? hosteliteName : null}
                            </Text>

                            <Text>
                                <Text style={styles.bold}>
                                    Hostelite Contact:
                                </Text>
                                {contact ? contact : null}
                            </Text>
                            {
                                rentAmont ?
                                    <Text>
                                        <Text style={styles.bold}>
                                            Rent Amount:
                                        </Text>
                                        {rentAmont ? `Rs.${rentAmont}` : null}
                                    </Text>
                                    :
                                    <></>
                            }
                            {
                                dueDate ?
                                    <Text>
                                        <Text style={styles.bold}>
                                            Due Date:
                                        </Text>
                                        {dueDate ? dueDate : null}
                                    </Text>
                                    :
                                    <></>
                            }
                            {
                                previousDues ?
                                    <Text>
                                        <Text style={styles.bold}>
                                            Previous Dues:
                                        </Text>
                                        {previousDues ? previousDues : null}
                                    </Text>
                                    :
                                    <></>
                            }
                        </View>
                    </View>
                    {
                        rentAmont ?
                            <>
                                <Pressable
                                    style={[styles.bedMsgModalBtn, globalCSS.bgcOne]}
                                    onPress={() => { navigation.navigate("Message", { userId: occupantId, ownerId: ownerId }) }}>
                                    <Text style={[styles.textStyle]}>Message hostelite</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.bedMsgModalBtn, styles.redBgc]}
                                    onPress={handleDeleteHostel}>
                                    <Text style={[styles.textStyle]}>Remove hostelite</Text>
                                </Pressable>

                            </>
                            :
                            <></>
                    }
                    <Pressable
                        style={[styles.bedInfoModalBtn, globalCSS.bgcTwo]}
                        onPress={handleEditHostelliteData}>
                        <Text style={[styles.textStyle]}>Edit User Data</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.bedInfoModalBtn, globalCSS.bgcZero]}
                        onPress={() => setModalInfoVisible(!modalInfoVisible)}>
                        <Text style={[styles.textStyle]}>Close</Text>
                    </Pressable>

                </View>
            </Modal>


            <Modal
                animationType="fade"
                transparent={true}
                visible={editBedInfoModel}
                onRequestClose={() => {
                    setEditBedInfoModel(!editBedInfoModel);
                }}
            >
                <View style={styles.centeredView}>
                    <Text style={globalCSS.font15}>Edit Bed Info</Text>
                    <View style={styles.width100}>
                        <Text style={globalCSS.font15NonBold}>
                            Hotelite Name
                        </Text>
                        <TextInput
                            placeholder="Name"
                            style={globalCSS.inputStyle3}
                            value={editName}
                            onChangeText={(newValue) => setEditName(newValue)}
                        />
                    </View>
                    <View style={styles.width100}>
                        <Text style={globalCSS.font15NonBold}>
                            Hotelite Contact
                        </Text>
                        <TextInput
                            placeholder="03000000000"
                            style={globalCSS.inputStyle3}
                            value={editContact}
                            keyboardType="numeric"
                            onChangeText={(newValue) => setEditContact(newValue)}
                        />
                    </View>
                    {
                        rentAmont ?
                            <View style={styles.width100}>
                                <Text style={globalCSS.font15NonBold}>
                                    Hotelite Rent
                                </Text>
                                <TextInput
                                    placeholder="Rs.10000"
                                    style={globalCSS.inputStyle3}
                                    value={editRent}
                                    keyboardType="numeric"
                                    onChangeText={(newValue) => setEditRent(newValue)}
                                />
                            </View>
                            :
                            <></>
                    }
                    <Pressable
                        style={[styles.bedInfoModalBtn, globalCSS.bgcOne]}
                        onPress={handleUpdateData}>
                        <Text style={[styles.textStyle]}>Update Bed Information</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.bedInfoModalBtn, globalCSS.bgcZero]}
                        onPress={() => setEditBedInfoModel(!editBedInfoModel)}>
                        <Text style={[styles.textStyle]}>Cancel</Text>
                    </Pressable>
                </View>
            </Modal >


            <View style={styles.container}>
                <TouchableOpacity onPress={handleModelOpen}>
                    <View style={[styles.bed, preOccupied === true ? styles.greyBgc : styles.whiteBgc]}>
                        <FontAwesome5 name={"bed"} size={20} color={occupied === false ? "grey"
                            : occupied === true && previousDues === "Cleared" ? "lightgreen" :
                                occupied === true && previousDues === "Pending" ? "red" : "black"} />
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Bed

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        borderRadius: 5,
        height: 50,
        width: 50
    },
    greyBgc: {
        backgroundColor: "lightgrey"
    },
    whiteBgc: {
        backgroundColor: "white"
    },
    redBgc: {
        backgroundColor: "red"
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
    bedMsgModalBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    width100: {
        width: "100%"
    },
    bed: {
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        borderRadius: 5,
        height: 50,
        width: 50
    },
    bedInfoModalBtn: {
        margin: 10,
        padding: 5,
        borderRadius: 5
    },
})