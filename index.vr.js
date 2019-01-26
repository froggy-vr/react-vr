import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  VrButton
} from 'react-vr';

import { Easing } from 'react-native';

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
      score: 0
    };
  }

  componentDidMount() {
    this.car1Animation();
    this.car2Animation();
  }

  car1Animation() {
    setTimeout(() => {
      // console.log(' at 00000')
      if(this.state.currentPos === this.state.carsInitialIndex[0]) {
        console.log("you're hit")
        this.setState({depth: new Animated.Value(0), currentPos: 0})
      }
    },1200)
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
      if(this.state.currentPos === this.state.carsInitialIndex[1]) {
        console.log("you're hit")
        this.setState({depth: new Animated.Value(0), currentPos: 0})
      }
    },1800)
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
    
    let newValue = this.state.depth._value + 5
    let newPos = this.state.currentPos + 5


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
  
  render() {
    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    var AnimatedModel = Animated.createAnimatedComponent(Model);
    return (
      <View >
        
        <View style={{transform:[{translateZ:-5}]}}>
          <VrButton onClick={this.getCloser}>
            <Text style={{color:"red"}}>{this.state.text}</Text>
          </VrButton>
        </View>


        <Pano source={asset('Space.jpg')} />

        <Text
            style={{
              transform: [
                {translate: [3, this.state.yIndex, -3]},
                // { translateZ: this.state.depth },
                {rotateY: -90}
              ],
              fontSize: 0.4
            }}
          >
            SCOREBOARD : {this.state.score}
          </Text>
       
       {/* APARTMENT MODELS  */}
        <AnimatedModel
          source={{
            obj: asset('apartments2.obj'),
            // mtl: asset('apartments2.mtl'),
          }}
          style={{
            transform: [
              { translate: [0, -this.state.yIndex, -this.state.houseInitialIndex] },
              { translateZ: this.state.depth },
              // {rotateY: spin}
              { rotateY: 180 }
            ],

          }}
          texture={asset('apartments2.000.png')}
          wireframe={false}
        />

        <AnimatedModel
          source={{
            obj: asset('apartments2.obj'),
            // mtl: asset('apartments2.mtl'),
          }}
          style={{
            transform: [
              { translate: [8, -this.state.yIndex, -this.state.houseInitialIndex] },
              { translateZ: this.state.depth },
              // {rotateY: spin}
              { rotateY: 180 }
            ],
          }}
          texture={asset('apartments2.001.png')}
          wireframe={false}
        />

        <AnimatedModel
          source={{
            obj: asset('apartments2.obj'),
            // mtl: asset('apartments2.mtl'),
          }}
          style={{
            transform: [
              { translate: [-8, -this.state.yIndex, -this.state.houseInitialIndex] },
              { translateZ: this.state.depth },
              // {rotateY: spin}
              { rotateY: 180 }
            ],

          }}
          texture={asset('apartments2.002.png')}
          wireframe={false}
        />

        {/* CAR MODELS */}
        <AnimatedModel
          source={{
            obj: asset('car.obj'),
            // mtl: asset('car.mtl'),
          }}
          style={{
            transform: [
              { translate: [-30, -this.state.yIndex, -this.state.carsInitialIndex[0]] },
              { translateZ: this.state.depth },
              { translateX: this.state.slideValue },
              { rotateY: 100 },
            ],
          }}
          texture={asset('car.jpg')}
          wireframe={false}
        />

        <AnimatedModel
          source={{
            obj: asset('car.obj'),
          }}
          style={{
            transform: [
              { translate: [-30, -this.state.yIndex, -this.state.carsInitialIndex[1]] },
              { translateZ: this.state.depth },
              { translateX: this.state.slideValue2 },
              { rotateY: 100 },
            ],
          }}
          wireframe={false}
        />

      </View>
    );
  }
};

AppRegistry.registerComponent('FroggyVr', () => FroggyVr);
