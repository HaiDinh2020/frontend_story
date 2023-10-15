import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSpring, useHandler } from 'react-native-reanimated';
import { HEIGHT, WITH } from '../../constants'
import Option from '../../component/Option'

const Choices = ({setIndexPage, autoNextPage, cancleAutoNextPage}) => {
    
    const option = useSharedValue(100)
    const styleOption = useAnimatedStyle(() => ({
        transform: [{ translateY: -option.value }],
    }));

    const onPress = () => {
        option.value = withTiming(option.value == 0 ? 100 : 0, {duration:500})
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.space} />
            <Animated.View style={[styles.option, styleOption]}>
                <Option setIndexPage={setIndexPage} onPress={onPress} autoNextPage={autoNextPage} cancleAutoNextPage={cancleAutoNextPage}/>
            </Animated.View>
            <View style={styles.menu}>
                <View style={styles.menuStyle}>
                    <TouchableOpacity onPress={onPress}>
                        <Icon name='menu' size={30} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Choices;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: WITH > HEIGHT ? WITH : HEIGHT,
        height: 100,
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    space: {
        flex: 1
    },
    option: {
        flex: 8,
    },
    menu: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor:'green'
    },
    menuStyle: {
        borderWidth: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#33CCFF'
    },
    menuIcon: {
        opacity: 1,
        color: '#33CCFF'
    }
})