import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Picker, ScrollView, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


function Header() {
    return (
        <View>
            <Text style={styles.heading}>Add Alarm</Text>
        </View>
    )
}

function  Save() {
    return <Text style={styles.save}>Save</Text>
}
function Cancel() {
    return <Text style={styles.cancel}>Cancel</Text>
}

function HeaderRow({ children }) {
    return <View style={styles.headerRow}>{children}</View>
}

function PickerContainer({children}) {
    return <View style={styles.pickerContainer}>{children}</View>
}

class Pickers extends Component {
    state = {
        selectedHours: '5',
        selectedMinutes: '25',
        am: 'AM',
        pm: 'PM'
    }
    render() {
        const createArray = length => {
          const arr = [];
          let i = 1;
          while (i < length) {
            arr.push(i.toString());
            i += 1;
          }

          return arr;
        }
        const AVAILABLE_HOURS = createArray(10)
        const AVAILABLE_MINUTES = createArray(60)
        return (
            <PickerContainer>
                <Picker
                    itemStyle={styles.pickerItem}
                    selectedValue={this.state.selectedHours}
                    style={{ width: 80, height: 50 }}
                    onValueChange={itemValue => {
                        this.setState({selectedHours: itemValue})
                    }}
                    mode = 'dropdown'
                >
                {AVAILABLE_HOURS.map(value => (
                  <Picker.Item key={value} label={value} value={value} />
                ))}
                </Picker>

                <Picker
                    itemStyle={styles.pickerItem}
                    selectedValue={this.state.selectedMinutes}
                    style={{ width: 80, height: 50 }}
                    onValueChange={itemValue => {
                        this.setState({selectedMinutes: itemValue})
                    }}
                    mode = 'dropdown'
                >
                {AVAILABLE_MINUTES.map(value => (
                  <Picker.Item key={value} label={value} value={value} />
                ))}
                </Picker>

                <Picker
                    itemStyle={styles.pickerItem}
                    selectedValue={this.state.am}
                    style={{ width: 50, height: 50 }}
                    onValueChange={itemValue => {
                        this.setState({am: itemValue})
                    }}
                    mode = 'dropdown'
                >
                  <Picker.Item label='AM' value='am' />
                  <Picker.Item label='PM' value='pm' />
                </Picker>

            </PickerContainer>
        )
    }
}


class AddButton extends Component {

    cancelPress = () => {
        this.props.navigation.navigate('Alarm')
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar barStyle='light-content' />
                <HeaderRow>
                    <TouchableOpacity onPress={this.cancelPress}>
                        <Cancel />
                    </TouchableOpacity>
                    <Header />
                    <TouchableOpacity>
                        <Save />
                    </TouchableOpacity>
                </HeaderRow>
                <Pickers />
            </View>
        )
    }
}


export default AddButton


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        paddingHorizontal: 20,
        // paddingTop: 50
    },
    heading: {
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 10
    },
    save: {
        color: 'orange',
        fontSize: 20,
        fontWeight: '600',
    },
    cancel: {
        color: 'orange',
        fontSize: 20,
        fontWeight: '400',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingTop: 50
    },
    pickerItem: {
        color: '#FFF',
        fontSize: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuTable: {
        // flex: 1,
        paddingTop: 180,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderColor: '#474747',
        borderBottomWidth: 1,
        borderTopWidth: 1
    }
})
