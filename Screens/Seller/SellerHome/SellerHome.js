import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalCSS from "../../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import hostelBanner from "../../../assets/images/hostelbanner.jpg";
import VerticalListSeller from '../../../utils/VerticalListSeller';
import hostelOneImage from "../../../assets/images/hostelOne.jpg";
import hostelTwoImage from "../../../assets/images/hostelTwo.jpg";

const SellerHome = ({ navigation }) => {
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
  ];
  const navigateToAddHostel = () => {
    navigation.navigate("Add Hostel")
  }
  return (
    <View style={globalCSS.bgcZero}>
      <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
        <Text style={globalCSS.font20}>
          Hi Muhammad,
        </Text>
      </View>
      <View style={globalCSS.row}>
        <Image source={hostelBanner} style={{ width: "100%", height: 150 }} />
      </View>

      <View style={globalCSS.row}>
        <Pressable onPress={navigateToAddHostel} style={[styles.add_btn, globalCSS.bgcOne]}>
          <FontAwesome5 name={"plus"} size={25} color={"#FFF"} />
          <Text style={[styles.add_btn_text, globalCSS.font20]}>Add new hostel</Text>
        </Pressable>
      </View>

      <View>
        <Text style={[globalCSS.font20, styles.width100]}>
          Your Current Hostels
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <VerticalListSeller
            image={item.image}
            metaDesc={item.metaDesc}
            rent={item.rent}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      // extraData={selectedId}
      />

    </View>
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
  }
})