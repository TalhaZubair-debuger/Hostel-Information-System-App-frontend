import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';



const EditUser = ({ navigation, route }) => {
    const { user } = route.params;
    const [image, setImage] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            assetId: true,
            base64: true
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            console.log("Selected Image Data: " + JSON.stringify(result.assets[0]));
        }
    }

    const handleEditUserData = async () => {
        if (
            name === "" ||
            email === "" ||
            contact === null
          ) {
            Alert.alert("Failure", "Please fill form completely");
          } else {
            const formData = {
              image: image ? image.base64 : null,
              name, 
              email,
              contact
            };
            try {
              const jwtToken = await AsyncStorage.getItem("jwtToken");
              const response = await fetch(`${HostName}users/update-user`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${jwtToken}`
                },
                method: "PATCH",
                body: JSON.stringify(formData)
              });
              const data = await response.json();
              if (data.message) {
                setImage(null);
                setName("");
                setEmail("");
                setContact(null);
                Alert.alert("Success", `${data.message}`);
                navigation.navigate("BottomTabs");
              }
            } catch (error) {
              Alert.alert("Failed!", `${error.message}`);
              console.log(error);
            }
          }
    }

    return (
        <View>
            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Text style={globalCSS.font20}>
                    Edit User
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
                    {image ? <Image source={{ uri: image.uri }} style={{ width: 50, height: 50, margin: 10 }} /> : <></>}
                </View>


                <View style={[styles.row, styles.mt10]}>
                    <View style={styles.width100}>
                        <Text style={globalCSS.font15NonBold}>
                            Name
                        </Text>
                        <TextInput
                            placeholder="Name"
                            style={globalCSS.inputStyle3}
                            defaultValue={user.name}
                            value={name}
                            onChangeText={(newValue) => setName(newValue)}
                        />
                    </View>
                </View>

                <View style={[styles.row, styles.mt10]}>
                    <View style={styles.width100}>
                        <Text style={globalCSS.font15NonBold}>
                            Email
                        </Text>
                        <TextInput
                            placeholder="Write email"
                            style={globalCSS.inputStyle3}
                            defaultValue={user.email}
                            value={email}
                            onChangeText={(newValue) => setEmail(newValue)}
                        />
                    </View>
                </View>

                <View style={[styles.row, styles.mt10]}>
                    <View style={styles.width100}>
                        <Text style={globalCSS.font15NonBold}>
                            Contact
                        </Text>
                        <TextInput
                            placeholder="03000000"
                            style={globalCSS.inputStyle3}
                            defaultValue={user.contact}
                            value={contact}
                            onChangeText={(newValue) => setContact(newValue)}
                        />
                    </View>
                </View>

                <View style={[styles.row, styles.mt10]}>
                    <View style={styles.width100}>
                        <TouchableOpacity onPress={handleEditUserData} style={[styles.btn, globalCSS.bgcTwo]}>
                            <Text style={globalCSS.font15NonBold}>Update User Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default EditUser

const styles = StyleSheet.create({
    btn: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 5,
        marginVertical: 10
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
    mt10: {
        marginVertical: 5
    },
    row: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    top_row_one: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        height: 100,
        padding: 5
    },
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        flexDirection: "column"
    },
})