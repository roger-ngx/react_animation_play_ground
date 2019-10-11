import React from 'react';
import { View, SafeAreaView, Text, Animated, Platform } from 'react-native';
import { range, map } from 'lodash';

const LIST_HEADER_MAX_HEIGHT = 250;
const LIST_HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = LIST_HEADER_MAX_HEIGHT - LIST_HEADER_MIN_HEIGHT;

let scrollAnimated = new Animated.Value(Platform.OS === 'ios' ? -LIST_HEADER_MAX_HEIGHT : 0);

const List = () => {
    console.log(scrollAnimated);

    let nativeScrollY = Animated.add(scrollAnimated, Platform.OS === 'ios' ? LIST_HEADER_MAX_HEIGHT : 0);
    const headerTranslate = nativeScrollY.interpolate({
        inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
        outputRange: [ 0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp'
    });

    const headerTitleScale = nativeScrollY.interpolate({
        inputRange: [ 0, HEADER_SCROLL_DISTANCE],
        outputRange: [ 1, 0.7],
        extrapolate: 'clamp'
    });

    return (<SafeAreaView style={{flex: 1, position: 'relative'}}>
        <Animated.View style={{
            width: '100%',
            backgroundColor: 'green',
            height: LIST_HEADER_MAX_HEIGHT + 20,
            position: 'absolute',
            top: 0, left: 0,
            overflow: 'hidden',
            transform: [{translateY: headerTranslate}],
        }}>
        </Animated.View>

        <Animated.View style={{
            flex: 1,
            position: 'absolute',
            top: 50, left: 0, right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{scale: headerTitleScale}]
        }}>
            <Text style={{color: 'white', fontSize: 25}}>List header</Text>
        </Animated.View>
        <Animated.ScrollView
            style={{flex: 1, zIndex: -1}}
            onScroll={
                Animated.event(
                    [{nativeEvent: { contentOffset: { y: scrollAnimated }}}],
                    {
                        useNativeDriver: true
                    }
                )
            }
            contentInset={{
                top: LIST_HEADER_MAX_HEIGHT
            }}
            contentOffset={{
                y: -LIST_HEADER_MAX_HEIGHT
            }}
        >
            {
                map(range(1, 30), item => (<View style={{flex: 1, padding: 15}}>
                    <Text>{`This is item number ${item}`}</Text>
                </View>))
            }
        </Animated.ScrollView>
    </SafeAreaView>)
}

export default List;