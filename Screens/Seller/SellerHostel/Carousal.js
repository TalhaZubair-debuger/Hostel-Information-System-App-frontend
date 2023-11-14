import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Carousal = ({ item, index }) => {
    return (
        <View key={index}>
            <Image
                source={item.image}
                alt='Hostel Image'
                style={styles.image}
            />
        </View>
    )
}

export default Carousal

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    }
})