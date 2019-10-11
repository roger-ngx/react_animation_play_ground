import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Animated } from 'react-native';
import { throttle } from 'lodash';
import Card from './Card';

let fadeInAnimation = new Animated.Value(0);
let marginAnimation = new Animated.Value(60);

const Fade = () => {
    let [ animationName, setAnimationName ] = useState('fadeOut');

    onStartAnimation = () => {
      switch(animationName){
        case 'fadeOut':
            Animated.parallel([
                Animated.timing(fadeInAnimation, {
                    toValue: 1,
                    duration: 2000
                }),

                Animated.timing(marginAnimation, {
                    toValue: 20,
                    duration: 2000
                })
            ]).start();

            setAnimationName('fadeIn');
        break;

        case 'fadeIn':
            Animated.parallel([
                Animated.timing(fadeInAnimation, {
                    toValue: 0,
                    duration: 2000
                }),
                Animated.timing(marginAnimation, {
                    toValue: 60,
                    duration: 2000
                })
            ]).start();

            setAnimationName('fadeOut');
        break;
      }
    };

    const rotationAnimation = fadeInAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0rad', '12rad']
    });

    return (<SafeAreaView style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            style={{justifyContent: 'center', backgroundColor: 'red', padding: 20}}
            onPress={throttle(onStartAnimation, 2000, { 'trailing': false})}
        >
            <Text style={{color: 'white'}}>Start</Text>
        </TouchableOpacity>
        <Animated.View style={{marginTop: marginAnimation, opacity: fadeInAnimation, transform: [{rotate: rotationAnimation}]}}>
          <Card text={animationName}/>
        </Animated.View>
    </SafeAreaView>)
  }

export default Fade;