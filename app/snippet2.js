import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import {createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'


export default class Routes extends Component {
    render() {
        return(
            <AppContainer />
        )
    }
}

class Home extends Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button title='Next...' onPress={()=> this.props.navigation.navigate('Scores')} />
            </View>
        )
    }
}

class Details extends Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Details</Text>
            </View>
        )
    }
}

class Feed extends Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Feed</Text>
                <Button title='Details' onPress={() => this.props.navigation.navigate('Details')} />
            </View>
        )
    }
}

class Scores extends Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Scores</Text>
            </View>
        )
    }
}

class Settings extends Component {
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Settings</Text>
            </View>
        )
    }
}

const FeedStack = createStackNavigator({
    Feed: {screen:Feed},
    Details: {screen: Details}
})

const AppBottomTabNavigator = createBottomTabNavigator({
    FeedStack,
    Scores,
    Settings
})

// const AppSwitchNavigator = createSwitchNavigator({
//     Home: {screen: Home},
//     Scores: {screen: AppBottomTabNavigator}
// })

const AppContainer = createAppContainer(AppBottomTabNavigator)
