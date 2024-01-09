import { Pressable, StyleSheet, Text, TextInput, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import globalCSS from "../../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Carousal from './Carousal';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HostName from '../../../utils/HostName';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';


const SellerHostel = ({ navigation, route }) => {
  const isCarousel = useRef(null);
  const { id } = route.params;
  const windowWidth = Dimensions.get('window').width;
  const [imageIndex, setImageIndex] = useState(0);
  const [hostel, setHostel] = useState();
  const [images, setImages] = useState();
  useFocusEffect(
    useCallback(() => {
      getOwnerHostels();
    }, [])
  )
  const getOwnerHostels = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}hostels/hostel/${id}`, {
        method: "GET",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data.hostel) {
        setHostel(data.hostel)
        setImages(
          [
            {
              id: 1,
              image: data.hostel.image
            },
            {
              id: 2,
              image: data.hostel.image
            }
          ]
        )
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }
  const navigateToHome = () => {
    navigation.navigate("BottomTabs");
  }
  const navigateToBedsInfo = () => {
    navigation.navigate("Beds Info", { id: id });
  }

  const handleDeleteHostel = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const response = await fetch(`${HostName}hostels/delete-hostel/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      const data = await response.json();
      if (data.message) {
        Alert.alert("Success!", `${data.message}`);
        navigation.navigate("SellerHome");
      }
    } catch (error) {
      Alert.alert("Failed to fetch!", `${error.message}`);
      console.log(error);
    }
  }
  return (
    <View style={styles.TopContainer}>
      <ScrollView style={styles.TopContainer}>
        <View style={globalCSS.bgcZero}>
          <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
            <View style={globalCSS.center_vertical}>
              <Text style={globalCSS.font20}>
                Hostel
              </Text>
            </View>
          </View>

          <View>
            {
              images ? images.length ?
                <Carousel
                  layout="tinder"
                  ref={isCarousel}
                  layoutCardOffset={9}
                  data={images}
                  renderItem={Carousal}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth}
                  inactiveSlideShift={0}
                  onSnapToItem={(index) => setImageIndex(index)}
                  useScrollView={true}
                />
                :
                null
                :
                null
            }
            {
              images ? images.length ?
                <Pagination
                  dotsLength={images ? images.length : null}
                  activeDotIndex={imageIndex}
                  carouselRef={isCarousel}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  tappableDots={true}
                />
                :
                null
                :
                null
            }
          </View>

          <View style={[styles.btnBeds, globalCSS.bgcTwo]}>
            <Pressable onPress={navigateToBedsInfo}>
              <Text style={globalCSS.font15NonBold}>
                Beds Information
              </Text>
            </Pressable>
          </View>

          <Text style={[globalCSS.font20, styles.bottom10]}>
            User Preview
          </Text>
          <View style={styles.userPreview}>
            <View style={styles.container}>
              <View style={styles.description}>
                <Text style={globalCSS.font20}>
                  Description
                </Text>
                <Text style={globalCSS.font15NonBold}>
                  {hostel ? hostel.description : ""}
                </Text>
              </View>
              <View style={styles.location}>
                <Text style={globalCSS.font20}>
                  <FontAwesome5
                    name={"map-marker-alt"}
                    size={25} color={"#BF40BF"}
                  />
                  {" "}Location
                </Text>
                <Text style={globalCSS.font15NonBold}>
                  University: {hostel ? hostel.university : ""}
                </Text>
                <Text style={globalCSS.font15NonBold}>
                  City: {hostel ? hostel.city : ""}
                </Text>
              </View>
              <View style={styles.price}>
                <Text style={globalCSS.font20}>
                  Rent Price
                </Text>
                <Text>
                  Rs.{hostel ? hostel.rent : ""}
                </Text>
              </View>
              <View style={styles.price}>
                <Text style={globalCSS.font20}>
                  Beds
                </Text>
                <Text>
                  {hostel ? hostel.bedsInRoom : ""} Beds
                </Text>
              </View>
              <View style={styles.facilities}>
                <Text style={globalCSS.font20}>
                  Facilities
                </Text>

                {
                  hostel ?
                    hostel.facilities === "RoomBathKitchenWifi" ?
                      <View>
                        <View style={styles.row3}>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"bed"} size={30} color={"#BF40BF"} />
                            <Text>
                              Room
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"restroom"} size={30} color={"#BF40BF"} />
                            <Text>
                              Bathroom
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"utensils"} size={30} color={"#BF40BF"} />
                            <Text>
                              Kitchen
                            </Text>
                          </View>
                        </View>
                        <View style={styles.row3}>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"wifi"} size={30} color={"#BF40BF"} />
                            <Text>
                              Wifi
                            </Text>
                          </View>
                        </View>
                      </View> : <></> : <></>
                }
                {
                  hostel ?
                    hostel.facilities === "RoomBathWifi" ?
                      <View>
                        <View style={styles.row3}>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"bed"} size={30} color={"#BF40BF"} />
                            <Text>
                              Room
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"restroom"} size={30} color={"#BF40BF"} />
                            <Text>
                              Bathroom
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"wifi"} size={30} color={"#BF40BF"} />
                            <Text>
                              Wifi
                            </Text>
                          </View>
                        </View>
                      </View>
                      :
                      <></> : <></>
                }
                {
                  hostel ?
                    hostel.facilities === "RoomBathKitchen" ?
                      <View>
                        <View style={styles.row3}>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"bed"} size={30} color={"#BF40BF"} />
                            <Text>
                              Room
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"restroom"} size={30} color={"#BF40BF"} />
                            <Text>
                              Bathroom
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"utensils"} size={30} color={"#BF40BF"} />
                            <Text>
                              Kitchen
                            </Text>
                          </View>
                        </View>
                      </View>
                      :
                      <></> : <></>
                }
                {
                  hostel ?
                    hostel.facilities === "RoomBath" ?
                      <View>
                        <View style={styles.row3}>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"bed"} size={30} color={"#BF40BF"} />
                            <Text>
                              Room
                            </Text>
                          </View>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"restroom"} size={30} color={"#BF40BF"} />
                            <Text>
                              Bathroom
                            </Text>
                          </View>
                        </View>
                      </View>
                      :
                      <></> : <></>
                }
                {
                  hostel ?
                    hostel.facilities === "RoomOnly" ?
                      <View>
                        <View style={styles.row3}>
                          <View style={styles.facilitiesBox}>
                            <FontAwesome5 name={"bed"} size={30} color={"#BF40BF"} />
                            <Text>
                              Room
                            </Text>
                          </View>
                        </View>
                      </View>
                      :
                      <></> : <></>
                }
              </View>

              <View style={styles.facilities}>
                <Text style={globalCSS.font20}>
                  Reviews
                </Text>
                {
                  hostel ?
                    hostel.reviews.length != 0 ?
                      hostel.reviews.map((item, index) => (
                        <View style={styles.review} key={index}>
                          <Text>
                            {
                              item.rating === 1 ?
                                <FontAwesome5
                                  name={"star"}
                                  size={20} color={"#BF40BF"}
                                />
                                :
                                item.rating === 2 ?
                                  <>
                                    <FontAwesome5
                                      name={"star"}
                                      size={20} color={"#BF40BF"}
                                    />
                                    <FontAwesome5
                                      name={"star"}
                                      size={20} color={"#BF40BF"}
                                    />
                                  </>
                                  :
                                  item.rating === 3 ?
                                    <>
                                      <FontAwesome5
                                        name={"star"}
                                        size={20} color={"#BF40BF"}
                                      />
                                      <FontAwesome5
                                        name={"star"}
                                        size={20} color={"#BF40BF"}
                                      />
                                      <FontAwesome5
                                        name={"star"}
                                        size={20} color={"#BF40BF"}
                                      />
                                    </>
                                    :
                                    item.rating === 4 ?
                                      <>
                                        <FontAwesome5
                                          name={"star"}
                                          size={20} color={"#BF40BF"}
                                        />
                                        <FontAwesome5
                                          name={"star"}
                                          size={20} color={"#BF40BF"}
                                        />
                                        <FontAwesome5
                                          name={"star"}
                                          size={20} color={"#BF40BF"}
                                        />
                                        <FontAwesome5
                                          name={"star"}
                                          size={20} color={"#BF40BF"}
                                        />
                                      </>
                                      :
                                      item.rating === 5 ?
                                        <>
                                          <FontAwesome5
                                            name={"star"}
                                            size={20} color={"#BF40BF"}
                                          />
                                          <FontAwesome5
                                            name={"star"}
                                            size={20} color={"#BF40BF"}
                                          />
                                          <FontAwesome5
                                            name={"star"}
                                            size={20} color={"#BF40BF"}
                                          />
                                          <FontAwesome5
                                            name={"star"}
                                            size={20} color={"#BF40BF"}
                                          />
                                          <FontAwesome5
                                            name={"star"}
                                            size={20} color={"#BF40BF"}
                                          />
                                        </>
                                        :
                                        <Text>No Rating</Text>
                            }
                          </Text>
                          <Text style={styles.nameFeedack}>{item.name}</Text>
                          <Text style={styles.Feedack}>{item.feedback}</Text>
                        </View>
                      ))
                      :
                      <Text>No Reviews yet</Text>
                    :
                    <Text>No Reviews yet</Text>
                }
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={handleDeleteHostel} style={[styles.bgcRed, styles.alignCenter, globalCSS.row]}>
            <Text style={globalCSS.font15}>Delete Hostel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SellerHostel

const styles = StyleSheet.create({
  review: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    marginVertical: 5
  },
  nameFeedack: {
    color: "grey"
  },
  alignCenter: {
    margin: "10%",
    borderRadius: 5
  },
  bgcRed: {
    backgroundColor: "red",
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  btnBeds: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
    borderRadius: 5,
    padding: 10
  },
  TopContainer: {
    flex: 1,
  },
  userPreview: {
    margin: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5
  },
  top_row_one: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 100,
    padding: 5
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  description: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%"
  },
  location: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  price: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  facilities: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  facilitiesBox: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 10
  },
  contactFixed: {
    position: 'absolute',
    bottom: 10,
    left: "60%", // You can adjust left/right if needed
    right: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5
  },
  bottom10: {
    marginBottom: -15,
    marginLeft: 10,
    zIndex: 2
  }
})