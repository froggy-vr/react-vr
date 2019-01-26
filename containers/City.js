import React from 'react';
import {
    AppRegistry,
    asset,
    Model,
    Animated,
} from 'react-vr';

export default class City extends React.PureComponent {
    render() {
        var AnimatedModel = Animated.createAnimatedComponent(Model);
        return (
        <AnimatedModel
          source={{
            obj: asset('The+City.obj'),
          }}
          style={{
            transform: [
              { translate: [this.props.xIndex, this.props.yIndex, this.props.zIndex] },
              { translateZ: this.props.depth },
              { rotateY: this.props.rotateY }
            ],
          }}
          texture={asset('cty1.jpg')}
          texture={asset('cty2x.jpg')}
          texture={asset('ang1.jpg')}
          wireframe={false}
        />
        );
    }
};