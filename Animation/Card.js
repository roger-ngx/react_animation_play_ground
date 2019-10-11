import React from 'react';
import { View, Text } from 'react-native';

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

export default Card;