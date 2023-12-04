import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

const HorizontalList = ({ id, image, metaDesc, rent, navigation }) => {
  const [description, setDescription] = useState("");
  useFocusEffect(
    useCallback(() => {
      if (metaDesc.length >= 30){
        setDescription(`${metaDesc.slice(0, 30)}...`);
      }
      else {
        setDescription(metaDesc);
      }
    }, [])
  )
  const handleNavigation = () => {
    navigation.navigate("Hostel", {id: id});
  }
  
  return (
    <View style={styles.prodduct_box}>
      <Pressable onPress={handleNavigation}>
        <View style={styles.image}>
          <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.imageStyle} />
        </View>
        <View style={styles.content}>
          <View style={[styles.description]}>
            <Text>
              {description}
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
    shadowRadius: 5,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#777777bb",
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  content: {
    paddingBottom:10,
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