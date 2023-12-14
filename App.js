import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Login from "./Screens/Login/Login";
import SignUp from "./Screens/SignUp/SignUp";
import Home from "./Screens/Home/Home";
import Favorites from "./Screens/Favorites/Favorites";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SearchHostels from './Screens/SearchHostels/SearchHostels';
import UserHostel from './Screens/UserHostel/UserHostel';
import Messages from './Screens/Messages/Messages';
import Message from './Screens/Messages/Message';
import SellerHome from "./Screens/Seller/SellerHome/SellerHome";
import AddHostel from "./Screens/Seller/AddHostel/AddHostel";
import SellerHostel from './Screens/Seller/SellerHostel/SellerHostel';
import BedsInfo from './Screens/Seller/BedsInfo';
import Booking from './Screens/Booking/Booking';
import { StripeProvider } from "@stripe/stripe-react-native";
import { useState } from 'react';
import YourHostel from './Screens/YourHostel/YourHostel';
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';
import EditUser from './Screens/User/EditUser';

const HomeBottomTabs = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <HomeBottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            size = focused ? 25 : 20;
          } else if (route.name === "Favorites") {
            iconName = "heart";
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        }
      })}
      initialRouteName="Home"
      activeColor="#000"
      inactiveColor="#fff"
      shifting={true}
      labeled={false}
      barStyle={{ backgroundColor: "#BF40BF" }}
    >
      <HomeBottomTabs.Screen name='Home' component={Home} />
      <HomeBottomTabs.Screen name='Favorites' component={Favorites} />
    </HomeBottomTabs.Navigator >
  )
}
const SellerBottomTabsNavigator = createMaterialBottomTabNavigator();

const SellerBottomTabs = () => {
  return (
    <HomeBottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Seller Home") {
            iconName = "home";
            size = focused ? 25 : 20;
          } else if (route.name === "Messages") {
            iconName = "comment";
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        }
      })}
      initialRouteName="Seller Home"
      activeColor="#000"
      inactiveColor="#fff"
      shifting={true}
      labeled={false}
      barStyle={{ backgroundColor: "#BF40BF" }}
    >
      <SellerBottomTabsNavigator.Screen name='Seller Home' component={SellerHome} />
      <SellerBottomTabsNavigator.Screen name='Messages' component={Messages} />
    </HomeBottomTabs.Navigator >
  )
}
const UserStack = createStackNavigator();

function UserStackTabs() {
  const [stripeKey, setStripeKey] = useState("");
  return (
    <StripeProvider publishableKey={stripeKey ? stripeKey : null}>
      <UserStack.Navigator>
        <UserStack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <UserStack.Screen
          name="Search Hostels"
          component={SearchHostels}
          options={{
            headerShown: false,
          }}
        />
        <UserStack.Screen
          name="Hostel"
          component={UserHostel}
          options={{
            headerShown: false,
          }}
        />
        <UserStack.Screen
          name="Booking"
          component={Booking}
          initialParams={{ setStripeKey: setStripeKey }}
          options={{
            headerShown: false,
          }}
        />
        <UserStack.Screen
          name="Your Hostel"
          component={YourHostel}
          initialParams={{ setStripeKey: setStripeKey }}
          options={{
            headerShown: false,
          }}
        />
        <UserStack.Screen
          name="Edit User"
          component={EditUser}
          options={{
            headerShown: false,
          }}
        />
      </UserStack.Navigator>
    </StripeProvider>
  )
}
const SellerStack = createStackNavigator();
function SellerStackTabs() {
  return (
    <SellerStack.Navigator>
      <SellerStack.Screen
        name="SellerBottom"
        component={SellerBottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <SellerStack.Screen
        name="Add Hostel"
        component={AddHostel}
        options={{
          headerShown: false,
        }}
      />
      <SellerStack.Screen
        name="Seller Hostel"
        component={SellerHostel}
        options={{
          headerShown: false,
        }}
      />
      <SellerStack.Screen
        name="Beds Info"
        component={BedsInfo}
        options={{
          headerShown: false,
        }}
      />
      <SellerStack.Screen
          name="Edit Seller"
          component={EditUser}
          options={{
            headerShown: false,
          }}
        />
    </SellerStack.Navigator>
  )
}
const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Message"
          component={Message}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="UserHome"
          component={UserStackTabs}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="SellerHome"
          component={SellerStackTabs}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
