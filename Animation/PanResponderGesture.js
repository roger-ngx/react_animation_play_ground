import React, { useState } from 'react';
import { PanResponder, Animated, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PanResponderGesture = () => {

    const springAnimation  = new Animated.Value(1);

    let storedPosition = {x:0, y:0};
    const currentPosition = new Animated.ValueXY();

    currentPosition.setValue({x:0, y:0});
    currentPosition.addListener(value => storedPosition = value);

    const _panResponder = PanResponder.create({
        // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        currentPosition.setOffset({
            x: storedPosition.x,
            y: storedPosition.y
        });

        currentPosition.setValue({x:0, y:0});

        Animated.spring(springAnimation, {
            toValue: 0.5,
            duration: 500
        }).start();
      },
      onPanResponderMove: Animated.event([
        null, {dx: currentPosition.x, dy: currentPosition.y}
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        Animated.spring(springAnimation, {
            toValue: 1,
            duration: 500
        }).start();

        // Animated.decay(currentPosition, {
        //     deceleration: 0.997,
        //     velocity: { x: gestureState.vx, y: gestureState.vy}
        // }).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });

    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'green',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [...currentPosition.getTranslateTransform(), {scale: springAnimation}]
                }}
                { ..._panResponder.panHandlers }
            />
        </View>)
}

export default PanResponderGesture;