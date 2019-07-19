import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, StatusBar, Button
 } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


const DATA = {
    alarms: ['1230', '7328', '2300', '1130']
}

function Header({ title, color }) {
    return (
        <View>
            <Text style={styles.header}>{title}</Text>
        </View>
    )
}

class Add extends Component {

    handleAddPress = () => {
        // this.props.navigation.navigate('addButton')
        console.log('loading.....');
    }

    render() {
        return (
            <Ionicons style={[styles.addIcon, { color: 'orange' }]} name='ios-add' size={35} />
        )
    }
}

function Edit({ onPress }) {
    return <Text style={[styles.editIcon, { color: 'orange', fontSize: 20 }]}>Edit</Text>
}

function HeaderRow({ children }) {
    return (
        <View style={styles.headerRow}>{children}</View>
    )
}

class Alarms extends Component {
    state = {
        switchValue: false,
        isDisabled: true
    }

    handleSwitchToggle = (value) => {
        this.setState({
            switchValue: value,
            // isDisabled: !this.state.isDisabled
        })
    }

    render() {
        const { isDisabled } = this.state
        const tempIcons = <Ionicons name='ios-remove-circle' size={35} color='#FFF' />
        const amText = <Text style={{ fontSize: 20 }}>AM</Text>
        return(
            <View style={styles.alarm}>

            {this.state.switchValue ? (
                <View>
                    <Text style={styles.alarmText}>12:30{amText}</Text>
                    <Text style={{ color: '#FFF', paddingHorizontal: 10 }}>Alarm</Text>
                </View>
            ) : (
                <View>
                    <Text style={[styles.alarmText, styles.disabled]}>12:30{amText}</Text>
                    <Text style={[styles.disabled, { color: '#FFF', paddingHorizontal: 10 }]}>Alarm</Text>
                </View>
            )}


                <View>
                    <Switch
                        onValueChange = {this.handleSwitchToggle}
                        value = {this.state.switchValue}
                    />
                </View>
            </View>
        )
    }
}

function AlarmsRow({ alarms }) {
    return (
        <ScrollView style={styles.scrollview}>
            {alarms.map((alarm, index) => (
                <Alarms key={index} alarm={alarms} />
            ))}
        </ScrollView>
    )
}



export default class Alarm extends Component {

    handleAddPress = () => {
        this.props.navigation.navigate('addButton')
        // console.log(`####loading.....and navigation props = ${this.props.navigation.navigate('StopWatch')}`)
        // console.log('####loading.....and navigation props = ' + this.props.navigation.navigate('StopWatch'))
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar barStyle='light-content' />

                <HeaderRow>
                    <TouchableOpacity onPress={() => alert('Function Disabled')}>
                        <Edit />
                    </TouchableOpacity>
                    <Header title='Alarm' />
                    <TouchableOpacity onPress={this.handleAddPress}>
                        <Add />
                    </TouchableOpacity>
                </HeaderRow>

                <AlarmsRow alarms={DATA.alarms} />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        paddingTop: 50,
        paddingHorizontal: 20
    },
    header: {
        color: '#FFF',
        fontSize: 30
    },
    // addIcon: {
    //     paddingTop: 5
    // },
    editIcon: {
        paddingTop: 7
    },
    headerRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    alarmText: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: '300',
        letterSpacing: 1
    },
    alarm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    scrollview: {
        alignSelf: 'stretch'
    },
    disabled: {
        opacity: .3
    }
})
