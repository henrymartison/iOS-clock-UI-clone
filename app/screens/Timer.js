import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Picker,
  Platform,
  Image
} from "react-native";



// 3 => 03, 10 => 10
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }

  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

export default class App extends React.Component {
  state = {
    remainingSeconds: 5,
    isRunning: false,
    selectedMinutes: "0",
    selectedSeconds: "5"
  };

  interval = null;

  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start = () => {
    this.setState(state => ({
      remainingSeconds:
        parseInt(state.selectedMinutes, 10) * 60 +
        parseInt(state.selectedSeconds, 10),
      isRunning: true
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 5, // temporary
      isRunning: false
    });
  };

  cancel = () => {
    clearInterval(this.interval)
    this.setState({
      remainingSeconds: 5,
      isRunning: false
    })
  };

  // pause = () => {
  //     const now = new Date().getTime
  //     this.setState({
  //         start: now,
  //         isRunning: false,
  //         now
  //     })
  //     this.interval = setInterval(() => {
  //         this.setState({ now: new Date().getTime })
  //     }, 1000)
  // }

  resume = () => {
    const currentTime = remainingSeconds
    this.setState({
      start: remainingSeconds,
      currentTime,
    })
    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  }

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={itemValue => {
          this.setState({ selectedMinutes: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>min</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedSeconds}
        onValueChange={itemValue => {
          this.setState({ selectedSeconds: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>seconds</Text>
    </View>
  );

  render() {
    const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
    const disabled = true

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Timer</Text>
        {/* <Image resizeMode='contain' style={styles.icon} source={require('./icon/timerIcon.png')} /> */}
        <StatusBar barStyle="light-content" />
        {this.state.isRunning ? (
          <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        ) : (
          this.renderPickers()
        )}

        <View style={styles.buttonRow}>
        {this.state.isRunning ? (
            <TouchableOpacity
              onPress={this.cancel}
              style={[styles.button, styles.button2, { backgroundColor: '#151515', color: '#888B98' }]}
              activeOpacity={.7}>
              <View style={styles.buttonBorder}>
                  <Text style={[styles.buttonText, styles.buttonText2]}>Cancel</Text>
              </View>
            </TouchableOpacity>
        ): (
            <TouchableOpacity
              onPress={() => !disabled && this.cancel}
              style={[styles.button, styles.button2]}
              activeOpacity={disabled ? 1.0 : .7}>
              <View style={styles.buttonBorder}>
                  <Text style={[styles.buttonText, styles.buttonText2]}>Cancel</Text>
              </View>
            </TouchableOpacity>
        )}


          {this.state.isRunning ? (
            <TouchableOpacity
              onPress={() => null}
              style={[styles.button, styles.buttonStop]}
              activeOpacity={0.8}>
              <View style={styles.buttonBorder}>
                  <Text style={[styles.buttonText, styles.buttonTextStop]}>Pause</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.start}
              style={styles.button}
              activeOpacity={0.8}>
              <View style={styles.buttonBorder}>
                  <Text style={styles.buttonText}>Start</Text>
              </View>
            </TouchableOpacity>
          )}
          </View>
          <Text style={styles.smallText}>developer @henry martison</Text>

      </View>
    );
  }
}


const dark = '#0D0D0D'
const default_dark = '#07121B'
const grey = '#3D3D3D'
const white = '#FFF'
const lightBlue = '#F5FCFF'
const red = '#E33935'


const imageWidth = Dimensions.get('window').width / 4;

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50
  },
  button: {
    backgroundColor: "#1B361F",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonBorder: {
      width: 76,
      height: 76,
      borderRadius:38,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  button2: {
    backgroundColor: grey,
  },
  buttonStop: {
    // borderColor: "#FF851B",
    backgroundColor: 'rgb(88, 53, 0)',
    // borderColor: '#3C1715'
  },
  buttonText: {
    fontSize: 18,
    color: "#50D167"
  },
  buttonText2: {
    color: '#FFF'
  },
  heading: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    marginBottom: 150
  },

  buttonTextStop: {
    color: "rgb(225, 156, 0)",
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  timerText: {
    color: "#fff",
    fontSize: 90
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: "#fff",
        backgroundColor: "#07121B",
        marginLeft: 10
      }
    })
  },
  pickerItem: {
    color: '#FFF',
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  smallText: {
    color: '#fff',
    marginTop: 60,
    marginLeft: 150
  },

});
