import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import globalCSS from "../../utils/GlobalCSS";
import React, { useCallback, useEffect, useState } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import VerticalList from '../../utils/VerticalList';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';


const SearchHostels = ({ navigation, route }) => {
    const { City = 'DefaultCity' } = route.params ? route.params : {};
    const [modalVisible, setModalVisible] = useState(false);
    const [city, setCity] = useState("");
    const [roomSize, setRoomSize] = useState("");
    const [facilities, setFacilities] = useState("");
    const [bedsInRoom, setBedsInRoom] = useState("");
    const [university, setUniversity] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [userFavs, setUserFavs] = useState();

    const [hostels, setHostels] = useState();
    useFocusEffect(
        useCallback(() => {
            if (City && City !== 'DefaultCity') {
                setCity(City);
                handleSearch();
            }
            else {
                getHostels();
            }
        }, [favorite, City])
    )
    const getHostels = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("jwtToken");
            const response = await fetch(`${HostName}hostels/all-hostels`, {
                method: "GET",
                headers: {
                    'Authorization': `${jwtToken}`
                }
            });
            const data = await response.json();
            if (data.hostels) {
                setHostels(data.hostels)
                const userResponse = await fetch(`${HostName}users/get-user-favorites`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${jwtToken}`
                    }
                });
                const Data = await userResponse.json();
                setUserFavs(Data.favorites);
                setFavorite(false);
            }
        } catch (error) {
            Alert.alert("Failed to fetch!", `${error.message}`);
            console.log(error);
        }
    }
    const navigateBackToHome = () => {
        navigation.navigate("BottomTabs");
    }
    const handleFilter = () => {
        setModalVisible(true);
    }
    const handleSearch = async () => {
        if (city ? city : City && roomSize === "" && facilities === "" && bedsInRoom === "" && university === "") {
            console.log(city);
            try {
                const jwtToken = await AsyncStorage.getItem("jwtToken");
                const response = await fetch(`${HostName}hostels/hostels-city?city=${city ? city : City}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${jwtToken}`
                    }
                });
                const data = await response.json();
                if (data.hostels) {
                    setHostels(data.hostels)
                    setCity("");
                }
                else {
                    Alert.alert("Alert!", `${data.message}`);
                    setCity("");
                }
            } catch (error) {
                Alert.alert("Alert!", `${error.message}`);
                console.log(error);
            }
        }
        else if (city !== "" && roomSize !== "" && facilities !== "" && bedsInRoom !== "" && university !== "") {
            try {
                const jwtToken = await AsyncStorage.getItem("jwtToken");
                const response = await fetch(`${HostName}hostels
                /hostels-with-filter?city=${city}&roomSize=${roomSize}
                &facilities=${facilities}&beds=${bedsInRoom}&university=${university}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${jwtToken}`
                    }
                });
                const data = await response.json();
                if (data.hostels) {
                    setHostels(data.hostels)
                    setCity("");
                }
            } catch (error) {
                Alert.alert("Failed to search!", `${error.message}`);
                console.log(error);
            }
        }
        else {
            console.log("The city is: ", city);
            Alert.alert("Failed to search!", `The search paramaters provided are wrong. You can either search through city filter or by applying all filters together.`);
        }
    }
    return (
        <View style={styles.container}>
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
                        <View style={styles.width50}>
                            <Text style={globalCSS.font15NonBold}>
                                Room Size
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={roomSize}
                                    onValueChange={(roomSize) => setRoomSize(roomSize)}
                                >
                                    <Picker.Item label="5 sq. ft" value="5sq.ft" />
                                    <Picker.Item label="10 sq. ft" value="10sq.ft" />
                                    <Picker.Item label="15 sq. ft" value="15sq.ft" />
                                    <Picker.Item label="20 sq. ft" value="20sq.ft" />
                                    <Picker.Item label="30 sq. ft" value="30sq.ft" />
                                    <Picker.Item label="40 sq. ft" value="40sq.ft" />
                                    <Picker.Item label="50 sq. ft" value="50sq.ft" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.width50}>
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

                    <View style={styles.row}>
                        <View style={styles.width100}>
                            <Text style={globalCSS.font15NonBold}>
                                Beds In Room
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={bedsInRoom}
                                    onValueChange={(value) => setBedsInRoom(value)}
                                >
                                    <Picker.Item label="1 Bed" value="1" />
                                    <Picker.Item label="2 Beds" value="2" />
                                    <Picker.Item label="3 Beds" value="3" />
                                    <Picker.Item label="4 Beds" value="4" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.width100}>
                            <Text style={globalCSS.font15NonBold}>
                                University
                            </Text>
                            <TextInput
                                placeholder="Search University"
                                style={globalCSS.inputStyle3}
                                value={university}
                                onChangeText={(newValue) => setUniversity(newValue)}
                            />
                        </View>
                    </View>
                    <Pressable
                        style={[styles.applyFilterBtn, globalCSS.bgcTwo]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={[styles.textStyle, globalCSS.colorWhite]}>Apply Filters</Text>
                    </Pressable>
                </View>
            </Modal>
            <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
                <Text style={globalCSS.font20}>
                    Search
                </Text>
            </View>
            <View style={[styles.search_bar, globalCSS.bgcOne]}>
                <View style={styles.top_row}>
                    <TextInput
                        placeholder="Search City"
                        style={globalCSS.inputStyle3}
                        value={city}
                        onChangeText={(newValue) => setCity(newValue)}
                    />
                </View>
                <View style={styles.top_row}>
                    <Pressable onPress={handleFilter}>
                        <Text style={[styles.margin_right, globalCSS.bgcTwo, globalCSS.colorWhite]}>
                            <FontAwesome5 name={"filter"} size={20} color={"white"} />
                            Apply Search Filters
                        </Text>
                    </Pressable>
                    <TouchableOpacity onPress={handleSearch}>
                        <Text style={[styles.margin_right, globalCSS.bgcTwo, globalCSS.colorWhite]}>
                            <FontAwesome5 name={"search"} size={20} color={"white"} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {
                    hostels ?
                        hostels.length ?
                            <FlatList
                                data={hostels}
                                renderItem={({ item }) => (
                                    <VerticalList
                                        image={item.image}
                                        metaDesc={item.description}
                                        rent={item.rent}
                                        id={item._id}
                                        setFavorite={setFavorite}
                                        userFavs={userFavs}
                                        navigation={navigation}
                                    />
                                )}
                                keyExtractor={(item) => item._id.toString()}
                            />
                            :
                            <View style={styles.width100}>
                                <Text style={globalCSS.text_center}>No hostels found</Text>
                            </View>
                        :
                        <></>
                }
            </View>

        </View>
    )
}

export default SearchHostels

const styles = StyleSheet.create({
    search_bar: {
        height: 100,
        padding: 5
    },
    top_row_one: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        height: 100,
        padding: 5
    },
    top_row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        padding: 5
    },
    margin_right: {
        borderRadius: 5,
        padding: 5
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
    buttonClose: {
        borderRadius: 5
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
    row: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    width50: {
        width: "50%"
    },
    width100: {
        width: "100%"
    },
    applyFilterBtn: {
        marginTop: 10,
        borderRadius: 5,
        fontSize: 15,
        width: 100,
        height: 40,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})