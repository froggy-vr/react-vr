import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  VrButton,
} from 'react-vr';

import { Easing } from 'react-native';
import firebase from './config/firebase'

// MASUKIN FIREBASE BUAT LISTEN KALAU TRUE AND BERUBAH JADI FALSE, JUMP

firebase.ref(`${this.state.u}`)

import Car from './containers/Car'
import House from './containers/House'
import City from './containers/City'

export default class FroggyVr extends React.Component {
  constructor() {
    super();
    this.state = {
      spin: new Animated.Value(0),
      slideValue: new Animated.Value(0),
      slideValue2: new Animated.Value(0),
      text: 'Click Me',
      depth: new Animated.Value(0),
      currentPos: 0,
      carsInitialIndex: [20, 10],
      houseInitialIndex: 40,
      yIndex: 1,
      adjustedX: 15,
      score: 0,
      userId: 'user123',
      jumped: false,
    };
  }

  componentDidMount() {
    this.car1Animation();
    this.car2Animation();
  }

  car1Animation() {
    setTimeout(() => {
      // console.log(' at 00000')
      if (this.state.currentPos === this.state.carsInitialIndex[0]) {
        console.log("you're hit")
        this.setState({ depth: new Animated.Value(0), currentPos: 0 })
      }
    }, 1200)
    this.state.slideValue.setValue(0);

    //car
    Animated.timing(
      this.state.slideValue,
      {
        toValue: 50,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.car1Animation());
  }

  car2Animation() {
    setTimeout(() => {
      // console.log(' at 00000')
      if (this.state.currentPos === this.state.carsInitialIndex[1]) {
        console.log("you're hit")
        this.setState({ depth: new Animated.Value(0), currentPos: 0 })
      }
    }, 1800)
    this.state.slideValue2.setValue(0);
    Animated.timing(
      this.state.slideValue2,
      {
        toValue: 50,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => {
      this.car2Animation()
    });
  }

  getCloser = () => {
    //maniplate animation to make it seem that we moved forward
    
    firebase.ref(`${this.state.userId}/jump`).on('value')
    .then(function(snapshot){
      if(this.state.jumped && !snapshot.val()){
        let newValue = this.state.depth._value + 5
        let newPos = this.state.currentPos + 5
    
        console.log('new position', newPos)
        this.setState({
          currentPos: newPos
        })
        if(this.state.currentPos === this.state.houseInitialIndex-15){
          console.log('You won!')
          let newScore = this.state.score + 1
          console.log(newScore, 'new')
    
          this.setState({depth: new Animated.Value(0), currentPos: 0, score: newScore})
          console.log(this.state.score)
        }
    
        Animated.spring(
          this.state.depth,
          {
            toValue: newValue,
            duration: 500,
            friction: 2, //default 7
            tension: 5 //default 40
            // easing: Easing.bezier(.17,.67,1,.47)
          }
        ).start();
      }
      this.setState({jumped: snapshot.val()})
    })

  }

  render() {
    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    var AnimatedModel = Animated.createAnimatedComponent(Model);
    return (
      <View >

        <View style={{ transform: [{ translateZ: -5 }] }}>
          <VrButton onClick={this.getCloser}>
            <Text style={{ color: "red" }}>{this.state.text}</Text>
          </VrButton>
        </View>


        <Pano source={asset('Space.jpg')} />

        <Text
          style={{
            transform: [
              { translate: [3, this.state.yIndex, -3] },
              // { translateZ: this.state.depth },
              { rotateY: -90 }
            ],
            fontSize: 0.4
          }}
        >
          SCOREBOARD : {this.state.score}
        </Text>

        {/* APARTMENT MODELS  */}

        <House
          xIndex={-8}
          yIndex={this.state.yIndex}
          houseInitialIndex={this.state.houseInitialIndex}
          depth={this.state.depth}
        />

        <House
          xIndex={0}
          yIndex={this.state.yIndex}
          houseInitialIndex={this.state.houseInitialIndex}
          depth={this.state.depth}
        />

        <House
          xIndex={8}
          yIndex={this.state.yIndex}
          houseInitialIndex={this.state.houseInitialIndex}
          depth={this.state.depth}
        />

        <City
          xIndex={-1500}
          yIndex={-40}
          zIndex={-1800}
          depth={this.state.depth}
          rotateY={180}
        />

       <City
          xIndex={1500}
          yIndex={-40}
          zIndex={-248}
          depth={this.state.depth}
          rotateY={0}
        />

        {/* CAR MODELS */}

        <Car
          yIndex={this.state.yIndex}
          carsInitialIndex={this.state.carsInitialIndex[0]}
          depth={this.state.depth}
          slideValue={this.state.slideValue}
        />

        <Car
          yIndex={this.state.yIndex}
          carsInitialIndex={this.state.carsInitialIndex[1]}
          depth={this.state.depth}
          slideValue={this.state.slideValue2}
        />

      </View>
    );
  }
};

AppRegistry.registerComponent('FroggyVr', () => FroggyVr);
