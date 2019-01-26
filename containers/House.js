import React from 'react';
import {
    AppRegistry,
    asset,
    Model,
    Animated,
} from 'react-vr';

export default class House extends React.PureComponent {
    render() {
        let num = Math.floor(Math.random() * 3)
        var AnimatedModel = Animated.createAnimatedComponent(Model);
        return (
            <AnimatedModel
                source={{
                    obj: asset('apartments2.obj'),
                }}
                style={{
                    transform: [
                      { translate: [this.props.xIndex, -this.props.yIndex, -this.props.houseInitialIndex] },
                      { translateZ: this.props.depth },
                      { rotateY: 180 }
                    ],
                  }}
                  texture={asset(`apartments2.00${num}.png`)}
                  wireframe={false}
            />
        );
    }

};