import React, { Component } from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'

// Tab Navigation Screens
import Timer from '../screens/Timer'
import StopWatch from '../screens/StopWatch'
import BedTime from '../screens/BedTime'
import Alarm from '../screens/Alarm'
import WorldClock from '../screens/WorldClock'

// Switch Navigation Screens
import addButton from '../components/alarm/addButton'
import editButton from '../components/alarm/editButton'

export const AlarmStack = createSwitchNavigator({
    Alarm: {
        screen: Alarm
    },
    addButton: {
        screen: addButton
    },
    editButton: {
        screen: editButton
    }
})



export const Tabs = createBottomTabNavigator({

    // WorldClock: {
    //     screen: WorldClock,
    //     navigationOptions: {
    //         tabBarLabel: 'World Clock',
    //         tabBarIcon: ({ tintColor }) =>
    //             <Icon name='ios-globe' size={25} color={tintColor} />
    //     }
    //  },
     Alarm: {
         screen: AlarmStack,
         navigationOptions: {
             tabBarIcon: ({tintColor}) =>
                <Icon name='ios-alarm' size={25} color={tintColor} />
         }
      },
     BedTime: {
         screen: addButton,
         navigationOptions: {
             tabBarLabel: 'Bed Time',
             tabBarIcon: ({ tintColor }) =>
                <Icon name='ios-bed' size={25} color={tintColor} />
         }
      },
     StopWatch: {
        screen: StopWatch,
        navigationOptions: {
            tabBarLabel: 'Stop Watch',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='ios-stopwatch' size={25} color={tintColor} />
        }
     },


    Timer: {
        screen: Timer,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) =>
                <Icon name='ios-timer' size={25} color={tintColor} />
        }
     },
},
    {
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: 'gray',
            style: { backgroundColor: 'rgb(22, 23, 25)' },
        },
    },
)

export default createAppContainer(Tabs)
