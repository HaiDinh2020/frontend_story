import React from 'react';
import {Controller} from 'react-hook-form';
import { StyleSheet, TextInput, View, Text } from 'react-native';

function CustomInput({control, name, rules = {}, placeholder, secureTextEntry}) {
    return (

        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
                <>
                    <View style = {[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
                        
                        <TextInput
                            placeholder={placeholder}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={secureTextEntry}
                            style={styles.input}
                        />
                    </View>
                    {error && <Text style={styles.error}>{error.message || "Error"}</Text>}
                </>
            )}
            name={name}
        />

    );
}

const styles = StyleSheet.create({
    container: {
       
        borderColor:'red',
        width:"50%"
    },
    error: {
        color:'red',
        alignSelf:'stretch'
    },
    input: {
        color:'#d8d8d8',
        fontSize:32,
        fontWeight:'bold',
        borderColor:'black',
        borderWidth:3
    }
})

export default CustomInput;