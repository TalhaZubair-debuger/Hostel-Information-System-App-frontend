import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalCSS from "../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import VerticalList from '../../utils/VerticalList';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../utils/HostName';


const Favorites = ({ navigation }) => {
  const [hostels, setHostels] = useState();
  const [favorite, setFavorite] = useState(false);
  const [userFavs, setUserFavs] = useState();
  useFocusEffect(
    useCallback(() => {
      getHostels();
    }, [favorite])
  )
  const getHostels = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}hostels/favorites/get-favorite-hostels`, {
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
                      setFavorite={setFavorite}
                      userFavs={userFavs}
                      id={item._id}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                />
                :
                <View style={styles.width100}>
                  <Text style={globalCSS.text_center}>No Favorite hostels found</Text>
                </View>
              :
              <View style={styles.width100}>
                <Text style={globalCSS.text_center}>No Favorite hostels found</Text>
              </View>
          }
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