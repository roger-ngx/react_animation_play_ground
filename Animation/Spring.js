import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated } from 'react-native';

const Card = ({text}) => (<View style={{
        width: 300,
        height: 200,
        backgroundColor: 'green',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
    <Text style={{color: 'white'}}>{text}</Text>
</View>)

const Spring = () => {
  let [ springAnimation, setSpringAnimation ] = useState(new Animated.Value(1));
    
  onPressIn = () => {
    Animated.spring(springAnimation, {
        toValue: 0.5,
        friction: 3,
        duration: 2000
    }).start();
  }

  onPressOut = () => {
    Animated.spring(springAnimation, {
        toValue: 1,
        friction: 3,
        duration: 2000
    }).start();
  }

  return (<SafeAreaView style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
          style={{justifyContent: 'center', backgroundColor: 'red', padding: 20}}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
      >
          <Text style={{color: 'white'}}>Start</Text>
      </TouchableOpacity>
      <Animated.View style={{margin: 20, transform: [{scale: springAnimation}]}}>
        <Card text='Spring'/>
      </Animated.View>
  </SafeAreaView>)
}

export default Spring;