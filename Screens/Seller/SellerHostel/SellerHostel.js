import { Pressable, StyleSheet, Text, TextInput, View, Dimensions, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import globalCSS from "../../../utils/GlobalCSS";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Carousal from './Carousal';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import hostelOneImage from "../../../assets/images/hostelOne.jpg";
import hostelTwoImage from "../../../assets/images/hostelTwo.jpg";
import hostelThreeImage from "../../../assets/images/hostelThree.jpg";
import hostelFourImage from "../../../assets/images/hostelFour.jpg";


const SellerHostel = ({ navigation }) => {
  const isCarousel = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  const [imageIndex, setImageIndex] = React.useState(0)
  const DATA = [
    {
      id: 1,
      image: hostelOneImage
    },
    {
      id: 2,
      image: hostelTwoImage
    },
    {
      id: 3,
      image: hostelThreeImage
    },
    {
      id: 4,
      image: hostelFourImage
    },
  ];
  const navigateToHome = () => {
    navigation.navigate("BottomTabs");
  }
  const navigateToBedsInfo = () => {
    navigation.navigate("Beds Info");
  }
  return (
    <View style={styles.TopContainer}>
      <ScrollView style={styles.TopContainer}>
        <View style={globalCSS.bgcZero}>
          <View style={[styles.top_row_one, globalCSS.bgcTwo]}>
            <Pressable onPress={navigateToHome}>
              <Text>
                <FontAwesome5 name={"arrow-left"} size={20} color={"black"} />
              </Text>
            </Pressable>
            <View style={globalCSS.center_vertical}>
              <Text >
                <FontAwesome5 name={"comment"} size={25} color={"black"} />
              </Text>
              <Text style={globalCSS.fontNonBold12}>
                Messages
              </Text>
            </View>
          </View>

          <View>
            <Carousel
              layout="tinder"
              ref={isCarousel}
              layoutCardOffset={9}
              data={DATA}
              renderItem={Carousal}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              // itemHeight={windowHeight}
              inactiveSlideShift={0}
              onSnapToItem={(index) => setImageIndex(index)}
              useScrollView={true}
            />
            <Pagination
              dotsLength={DATA.length}
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
                  Its the best hostel near university with sunrise view.
                  Its the best 2 bed hostel with study tables.
                  The hostels available lavish interior
                </Text>
              </View>
              <View style={styles.location}>
                <Text style={globalCSS.font20}>
                  <FontAwesome5
                    name={"map-marker-alt"}
                    size={25} color={"#00D2FF"}
                  />
                  {" "}Location
                </Text>
                <Text style={globalCSS.font15NonBold}>
                  Area: Defense road
                </Text>
                <Text style={globalCSS.font15NonBold}>
                  City: Lahore
                </Text>
              </View>
              <View style={styles.price}>
                <Text style={globalCSS.font20}>
                  Rent Price
                </Text>
                <Text>
                  Rs.12000
                </Text>
              </View>
              <View style={styles.price}>
                <Text style={globalCSS.font20}>
                  Beds
                </Text>
                <Text>
                  2 beds
                </Text>
              </View>
              <View style={styles.facilities}>
                <Text style={globalCSS.font20}>
                  Facilities
                </Text>
                <View>
                  <View style={styles.row3}>
                    <View style={styles.facilitiesBox}>
                      <FontAwesome5 name={"bed"} size={30} color={"#00D2FF"} />
                      <Text>
                        Room
                      </Text>
                    </View>
                    <View style={styles.facilitiesBox}>
                      <FontAwesome5 name={"restroom"} size={30} color={"#00D2FF"} />
                      <Text>
                        Bathroom
                      </Text>
                    </View>
                    <View style={styles.facilitiesBox}>
                      <FontAwesome5 name={"utensils"} size={30} color={"#00D2FF"} />
                      <Text>
                        Kitchen
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row3}>
                    <View style={styles.facilitiesBox}>
                      <FontAwesome5 name={"wifi"} size={30} color={"#00D2FF"} />
                      <Text>
                        Wifi
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default SellerHostel

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
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
    borderBottomWidth: 1
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