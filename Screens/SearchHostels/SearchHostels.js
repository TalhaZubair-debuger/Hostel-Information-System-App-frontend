import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import globalCSS from "../../utils/GlobalCSS";
import React, { useState } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import VerticalList from '../../utils/VerticalList';
import hostelOneImage from "../../assets/images/hostelOne.jpg";
import hostelTwoImage from "../../assets/images/hostelTwo.jpg";
import hostelThreeImage from "../../assets/images/hostelThree.jpg";
import hostelFourImage from "../../assets/images/hostelFour.jpg";
import { Picker } from '@react-native-picker/picker';


const SearchHostels = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchLocation, setSearchLocation] = useState("");
    const [area, setArea] = useState("");
    const [roomSize, setRoomSize] = useState("50 sq. ft");
    const [facilities, setFacilities] = useState("Room Only");
    const DATA = [
        {
            id: 1,
            image: hostelOneImage,
            metaDesc: "Its the best hostel under best price",
            rent: "7000"
        },
        {
            id: 2,
            image: hostelTwoImage,
            metaDesc: "Its the best 2 bed hostel with study tables",
            rent: "11000"
        },
        {
            id: 3,
            image: hostelThreeImage,
            metaDesc: "Its the best hostel near university with sunrise view",
            rent: "19000"
        },
        {
            id: 4,
            image: hostelFourImage,
            metaDesc: "The hostels available lavish interior",
            rent: "6500"
        },
    ];
    const navigateBackToHome = () => {
        navigation.navigate("BottomTabs");
    }
    const handleFilter = () => {
        setModalVisible(true);
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
                                Facilities
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={facilities}
                                    onValueChange={(facilities) => setFacilities(facilities)}
                                >
                                    <Picker.Item label="Room Only" value="Room Only" />
                                    <Picker.Item label="Room + Bath" value="Room + Bath" />
                                    <Picker.Item label="Room + Bath + Kitchen" value="Room + Bath + Kitchen" />
                                    <Picker.Item label="Room + Bath + Wifi" value="Room + Bath + Wifi" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.width100}>
                            <Text style={globalCSS.font15NonBold}>
                                Beds
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={facilities}
                                    onValueChange={(facilities) => setFacilities(facilities)}
                                >
                                    <Picker.Item label="1 Bed" value="1 Bed" />
                                    <Picker.Item label="2 Beds" value="2 Beds" />
                                    <Picker.Item label="3 Beds" value="3 Beds" />
                                    <Picker.Item label="4 Beds" value="4 Beds" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.width100}>
                            <Text style={globalCSS.font15NonBold}>
                                Area
                            </Text>
                            <TextInput
                                placeholder="Search Area"
                                style={globalCSS.inputStyle3}
                                value={area}
                                onChangeText={(newValue) => setArea(newValue)}
                            />
                        </View>
                    </View>
                    <Pressable
                        style={[styles.applyFilterBtn, globalCSS.bgcOne]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={[styles.textStyle]}>Apply Filters</Text>
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
                    Search
                </Text>
                <View style={globalCSS.center_vertical}>
                    <Text >
                        <FontAwesome5 name={"comment"} size={25} color={"black"} />
                    </Text>
                    <Text style={globalCSS.fontNonBold12}>
                        Messages
                    </Text>
                </View>
            </View>
            <View style={[styles.search_bar, globalCSS.bgcOne]}>
                <View style={styles.top_row}>
                    <TextInput
                        placeholder="Search City"
                        style={globalCSS.inputStyle3}
                        value={searchLocation}
                        onChangeText={(newValue) => setSearchLocation(newValue)}
                    />
                </View>
                <View style={styles.top_row}>
                    <Pressable onPress={handleFilter}>
                        <Text style={[styles.margin_right, globalCSS.bgcTwo]}>
                            <FontAwesome5 name={"filter"} size={20} color={"black"} />
                            Apply Search Filters
                        </Text>
                    </Pressable>
                    <Text style={[styles.margin_right, globalCSS.bgcTwo]}>
                        <FontAwesome5 name={"search"} size={20} color={"black"} />
                    </Text>
                </View>
            </View>

            <View>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <VerticalList
                            image={item.image}
                            metaDesc={item.metaDesc}
                            rent={item.rent}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                // extraData={selectedId}
                />
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
        justifyContent: "space-between",
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