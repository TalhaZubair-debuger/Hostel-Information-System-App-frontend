import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import hostelOneImage from "../../assets/images/hostelOne.jpg";
import hostelTwoImage from "../../assets/images/hostelTwo.jpg";
import VerticalList from '../../utils/VerticalList';


const Favorites = () => {
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
    }
  ]
  return (
    <ScrollView>
      <View>
        <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
          <Text style={globalCSS.font20}>
            Favourites
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

        <View style={styles.list}>
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
    </ScrollView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  top_row_one: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    padding: 5
  },
})