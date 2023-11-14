import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalCss from "./GlobalCSS";

const HorizontalList = ({ image, metaDesc, rent, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("Hostel");
  }
  return (
    <View style={styles.prodduct_box}>
      <Pressable onPress={handleNavigation}>
        <View style={styles.image}>
          <Image source={image} style={styles.imageStyle} />
        </View>
        <View style={styles.content}>
          <View style={[styles.description]}>
            <Text>
              {metaDesc}
            </Text>
          </View>
          <View>
            <Text style={styles.rent}>
              Rs.{rent}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default HorizontalList

const styles = StyleSheet.create({
  prodduct_box: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 150,
    margin: 5,
    // padding: 5,
    shadowRadius: 5,
    backgroundColor: "#fff",
    // shadowColor: "black",
    elevation: 5,
    shadowColor: "#777777bb",
  },
  imageStyle: {
    height: 150,
    width: 150
  },
  content: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  rent: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: "600"
  }
})