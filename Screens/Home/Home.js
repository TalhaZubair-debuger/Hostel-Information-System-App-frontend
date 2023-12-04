import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, Touchable, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import hostelOneImage from "../../assets/images/hostelOne.jpg";
import hostelTwoImage from "../../assets/images/hostelTwo.jpg";
import hostelThreeImage from "../../assets/images/hostelThree.jpg";
import hostelFourImage from "../../assets/images/hostelFour.jpg";
import hostelBanner from "../../assets/images/hostelbanner.jpg";
import HorizontalList from '../../utils/HorizontalList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [hostels, setHostels] = useState();
  useFocusEffect(
    useCallback(() => {
      getHostels();
    }, [])
  )
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
  const [searchLocation, setSearchLocation] = useState("");
  const navigateToSearchPage = () => {
    navigation.navigate("Search Hostels")
  }
  const navigateToMessages = () => {
    navigation.navigate("Messages");
  }
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
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
          <Text style={globalCSS.font20}>
            Hi Muhammad,
          </Text>
          <Pressable onPress={navigateToMessages}>
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
              style={globalCSS.inputStyle3}
              value={searchLocation}
              onChangeText={(newValue) => setSearchLocation(newValue)}
            />
          </View>
          <View style={styles.top_row}>
            <TextInput
              placeholder="Search Area"
              style={globalCSS.inputStyle2}
              value={searchLocation}
              onChangeText={(newValue) => setSearchLocation(newValue)}
            />
            <Text style={[styles.margin_right, globalCSS.bgcTwo]}>
              <FontAwesome5 name={"search"} size={20} color={"black"} />
            </Text>
          </View>
        </View>

        <View style={globalCSS.row}>
          <Image source={hostelBanner} style={{ width: "100%", height: 150 }} />
        </View>
        <View style={globalCSS.row}>
          <View style={styles.box}>
            <Pressable onPress={navigateToSearchPage}>
              <Text style={[globalCSS.text_center]}>
                <FontAwesome5 name={"hotel"} size={25} color={"#00D2FF"} />
              </Text>
              <Text style={[globalCSS.text_center]}>
                Browse all hostels
              </Text>
            </Pressable>
          </View>
          <View style={styles.box}>
            <Pressable onPress={navigateToSearchPage}>
              <Text style={[globalCSS.text_center]}>
                <FontAwesome5 name={"hourglass"} size={25} color={"#00D2FF"} />
              </Text>
              <Text style={[globalCSS.text_center]}>
                Browse newly listed hostels
              </Text>
            </Pressable>
          </View>
          <View style={styles.box}>
            <Pressable onPress={navigateToSearchPage}>
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
          <Pressable style={[styles.btnYourHostel, globalCSS.bgcOne]}>
            <Text style={globalCSS.font15}>Your Hostel</Text>
          </Pressable>
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
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    // alignItems: "center",
    height: 100,
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