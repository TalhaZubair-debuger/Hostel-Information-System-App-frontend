import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, Touchable, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import hostelBanner from "../../assets/images/hostelbanner.jpg";
import HorizontalList from '../../utils/HorizontalList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  const [hostels, setHostels] = useState();
  const [user, setUser] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [city, setCity] = useState("");
  useFocusEffect(
    useCallback(() => {
      getHostels();
      getUser();
    }, [])
  )
  const getHostels = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}hostels/top-hostels`, {
        method: "GET",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data.hostels) {
        setHostels(data.hostels)
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }
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
  const getLocationAndNavigate = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Alert", "Permission to access location was denied!");
      return;
    } else {
      const { coords } = await Location.getCurrentPositionAsync({});
      try {
        const { data } = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},
        ${coords.longitude}&key=AIzaSyC4-f19hjeChzbjF8dXn4M4gpIfP0wEvi0`, {
          method: "GET"
        }
        )
        console.log(data);
        // Extract city from the response
        const addressComponents = data.results[0].address_components;
        const cityComponent = addressComponents.find((component) =>
          component.types.includes('locality')
        );

        if (cityComponent) {
          setCity(cityComponent.long_name);
          console.log(cityComponent.long_name);
          navigation, navigate("Search Hostels", { city: cityComponent.long_name });
        }

      } catch (error) {
        Alert.alert("Error", "Couldn't get your current location");
      }
    }
  }

  const logOut = async () => {
    await AsyncStorage.removeItem("jwtToken");
    navigation.navigate("Login");
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
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
          <Text style={globalCSS.font20}>
            Hi {user ? user.name : "there"}!
          </Text>
          <Pressable onPress={() => { navigation.navigate("Messages", { userId: user.userId, ownerId: hostels.ownerId }) }}>
            <View style={globalCSS.center_vertical}>
              <Text >
                <FontAwesome5 name={"comment"} size={25} color={"black"} />
              </Text>
              <Text style={globalCSS.fontNonBold12}>
                Messages
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.search_bar, globalCSS.bgcOne]}>
          <View style={styles.top_row}>
            <TextInput
              placeholder="Search City"
              style={globalCSS.inputStyle2}
              value={city}
              onChangeText={(newValue) => setCity(newValue)}
            />
            <TouchableOpacity onPress={()=>{navigation.navigate("Search Hostels", { City: city });}}>
              <Text style={[styles.margin_right, globalCSS.bgcTwo]}>
                <FontAwesome5 name={"search"} size={20} color={"black"} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={globalCSS.row}>
          <Image source={hostelBanner} style={{ width: "100%", height: 150 }} />
        </View>
        <View style={globalCSS.row}>
          <View style={styles.box}>
            <Pressable onPress={() => { navigation.navigate("Search Hostels") }}>
              <Text style={[globalCSS.text_center]}>
                <FontAwesome5 name={"hotel"} size={25} color={"#00D2FF"} />
              </Text>
              <Text style={[globalCSS.text_center]}>
                Browse all hostels
              </Text>
            </Pressable>
          </View>
          <View style={styles.box}>
            <Pressable onPress={() => { navigation.navigate("Search Hostels") }}>
              <Text style={[globalCSS.text_center]}>
                <FontAwesome5 name={"hourglass"} size={25} color={"#00D2FF"} />
              </Text>
              <Text style={[globalCSS.text_center]}>
                Browse newly listed hostels
              </Text>
            </Pressable>
          </View>
          <View style={styles.box}>
            <Pressable onPress={getLocationAndNavigate}>
              <Text style={[globalCSS.text_center]}>
                <FontAwesome5 name={"map-marker-alt"} size={25} color={"#00D2FF"} />
              </Text>
              <Text style={[globalCSS.text_center]}>
                Browse hostels near you
              </Text>
            </Pressable>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={() => { navigation.navigate("Your Hostel", { userId: user._id }) }} style={[styles.btnYourHostel, globalCSS.bgcOne]}>
            <Text style={globalCSS.font15}>Your Hostel</Text>
          </TouchableOpacity>
        </View>

        <Text style={[globalCSS.font20, globalCSS.text_center]}>
          Top Rated Hostels
        </Text>
        <View style={styles.topHostels}>
          <FlatList
            horizontal={true}
            data={hostels}
            renderItem={({ item }) => (
              <HorizontalList
                image={item.image}
                metaDesc={item.description}
                rent={item.rent}
                id={item._id}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
          // extraData={selectedId}
          />
        </View>
        <View>

        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  search_bar: {
    height: 50,
    padding: 5
  },
  top_row_one: {
    flex: 1,
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
  box: {
    width: "30%",
    height: 100,
    borderRadius: 5,
    // borderWidth: 2,
    // borderColor: "#50E0FF",
    margin: 5,
    padding: 5,
    // elevation: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    // shadowColor: "#777777bb",
    justifyContent: "center",
    alignItems: "center",
  },
  btnYourHostel: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    margin: 5,
    height: 40
  },
  topHostels: {
    marginBottom: 20
  }
})