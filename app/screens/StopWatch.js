import React, { Component } from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar
    } from 'react-native'
import moment from 'moment'



function Timer({ interval, style }) {
    const pad = (x) => x < 10 ? '0' + x : x
    const duration = moment.duration(interval)
    const centiseconds = Math.floor(duration.milliseconds() / 10)
    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{pad(duration.minutes())}:</Text>
            <Text style={style}>{pad(duration.seconds())}.</Text>
            <Text style={style}>{pad(centiseconds)}</Text>
        </View>
    )
}

function RoundButton({ title, color, background, onPress, disabled }) {
    return (
        <TouchableOpacity
         style={[styles.button, { backgroundColor: background }]}
         onPress={() => !disabled && onPress()}
         activeOpacity={disabled ? 1.0 : .7}>
            <View style={styles.buttonBorder}>
                <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

function ButtonsRow({ children }) {
    return (
        <View style={styles.buttonsRow}>{children}</View>
    )
}

function Lap({ number, interval, fastest, slowest }) {
    const lapStyle = [
        styles.lapText,
        fastest && styles.fastest,
        slowest && styles.slowest
    ]
    return (
        <View style={[styles.lap, styles.separator]}>
            <Text style={lapStyle}>Lap {number}</Text>
            <Timer interval={interval} style={[lapStyle, styles.lapTimer]} />
        </View>
    )
}

function LapsTable({ laps, timer }) {
    const finishedLaps = laps.slice(1)
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER

    if(finishedLaps >= 2) {
        finishedLaps.forEach(lap => {
            if(lap < min) min = lap
            if(lap > max) max = lap
        })
    }
    return (
        <ScrollView style={styles.scrollView}>
            {laps.map((lap, index) => (
                <Lap
                 number={laps.length - index}
                 key={laps.length - index}
                 interval={index === 0 ? timer + lap : lap}
                 fastest={lap === min}
                 slowest={lap === max}
                 />
            ))}
        </ScrollView>
    )
}

class StopWatch extends Component {
    state = {
        start: 0,
        now: 0,
        laps: []
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    start = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
            laps: [0]
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 100)
    }

    lap = () => {
        const currentTimeStamp = new Date().getTime()
        const { laps, now, start  } = this.state
        const [ firstLap, ...others ] = laps
        this.setState({
            laps: [0, firstLap + now - start, ...others],
            start: currentTimeStamp,
            now: currentTimeStamp
        })
    }


    stop = () => {
        clearInterval(this.timer)
        const { laps, now, start  } = this.state
        const [ firstLap, ...others ] = laps
        this.setState({
            laps: [firstLap + now - start, ...others],
            start: 0,
            now: 0
        })
    }

    reset = () => {
        this.setState({
            laps: [],
            start: 0,
            now: 0
        })
    }

    resume = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 100)
    }

    render(){
        const { start, now, laps } = this.state
        const timer = now - start
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <Text style={styles.heading}>Stop Watch</Text>
                <Timer interval={laps.reduce((total, curr) => total + curr, 0) + timer} style={styles.timer} />
                {laps.length === 0 && (
                    <ButtonsRow>
                        <RoundButton title='Lap' color='#888B98' background='#151515' disabled />
                        <RoundButton title='Start' color='#50D167' background='#1B361F' onPress={this.start} />
                    </ButtonsRow>
                )}
                {start > 0 && (
                    <ButtonsRow>
                        <RoundButton title='Lap' color='#FFFF' background='#3D3D3D' onPress={this.lap} />
                        <RoundButton title='Stop' color='#E33935' background='#3C1715' onPress={this.stop} />
                    </ButtonsRow>
                )}
                {laps.length > 0 && start === 0 && (
                    <ButtonsRow>
                        <RoundButton title='Reset' color='#FFFF' background='#3D3D3D' onPress={this.reset} />
                        <RoundButton title='Start' color='#50D167' background='#1B361F' onPress={this.resume} />
                    </ButtonsRow>
                )}
                <LapsTable laps={laps} timer={timer} />
            </View>
        )
    }
}

export default StopWatch


const screenWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        backgroundColor: '#0D0D0D'
    },
    heading: {
        color: "#fff",
        fontSize: 30,
        marginBottom: 150
    },
    timerContainer: {
        flexDirection: 'row'
    },
    timer: {
        fontSize: 70,
        color: '#FFF',
        fontWeight: '200',
        width: 100
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        fontSize: 18
    },
    buttonBorder: {
        width: 76,
        height: 76,
        borderRadius:38,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 18,
        paddingHorizontal: 20,
        marginBottom: 30
    },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    lapText: {
        color: '#FFF',
        fontSize: 18,
    },
    // lapTimer: {
    //     width: 15
    // },
    scrollView: {
        alignSelf: 'stretch'
    },
    separator: {
        marginLeft: 12,
        marginRight: 12,

    },
    fastest: {
        color: '#4BC05F'
    },
    slowest: {
        color: '#CC3531'
    },
})
