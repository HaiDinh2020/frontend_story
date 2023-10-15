import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

function MenuButton({optionText, handlePress}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress} >
                <Text style={styles.text}>{optionText}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    button: {
        width: 200,
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#93dd21',
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#efff42',
    },
    text:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
})

export default MenuButton;