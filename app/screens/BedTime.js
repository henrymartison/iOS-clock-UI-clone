import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'


class BedTime extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>BEDTIME</Text>
            </View>
        )
    }
}

export default BedTime


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D0D0D'
    },
    text: {
        fontSize: 30,
        color: '#FFF'
    }
})
