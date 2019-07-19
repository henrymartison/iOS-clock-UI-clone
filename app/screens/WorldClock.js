import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'



function Header({ title }) {
    return (
        <View>
            <Text style={styles.header}>{title}</Text>
        </View>
    )
}

function Add() {
    return (
        <Ionicons name='ios-add' size={45} style={{ color: 'orange' }} />
    )
}

function Edit() {
    return <Text style={{ color: 'orange', fontSize: 20, paddingTop: 7 }}>Edit</Text>
}

function HeaderRow({ children }) {
    return (
        <View style={styles.headerRow}>{children}</View>
    )
}
function Countries() {
    const pmText = <Text style={{ fontSize: 20, fontWeight: '400' }}>PM</Text>
    return (
        <View style={styles.country}>
            <View>
                <Text style={styles.countryText}>Accra</Text>
                <Text style={{ color: '#2d2929', fontSize: 18 }}>Today, +0HRS</Text>
                <Text style={styles.countryText}>Shanghai</Text>
                <Text style={{ color: '#2d2929', fontSize: 18 }}>Today, +8HRS</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#FFF', fontSize: 50, fontWeight: '200' }}>3:25{pmText}</Text>
                <Text style={{ color: '#FFF', fontSize: 50, fontWeight: '200' }}>11:25{pmText}</Text>
            </View>
        </View>
    )
}

function CountriesRow() {
    return (
        <ScrollView style={styles.scrollview}>
            <Countries />
        </ScrollView>
    )
}

class WorldClock extends Component {
    render(){
        return(
            <View style={styles.container}>
                <HeaderRow>
                    <Edit />
                    <Header title='World Clock' />
                    <Add />
                </HeaderRow>

                <CountriesRow />
            </View>
        )
    }
}

export default WorldClock


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        paddingTop: 50,
        paddingHorizontal: 20
    },
    header: {
        fontSize: 30,
        color: '#FFF'
    },
    headerRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    countryText: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: '200',
        letterSpacing: 1
    },
    scrollview: {
        alignSelf: 'stretch'
    },
    country: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 15
    }
})
