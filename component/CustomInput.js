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
                    {error && <Text style={styles.error}>{error.message || "Error"}</Text>}
                    </View>
                </>
            )}
            name={name}
        />

    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:10
    },
    error: {
        color:'red',
        alignSelf:'stretch'
    },
    input: {
        color:'black',
        fontSize:14,
        // fontWeight:'bold',
        borderColor:'black',
        borderWidth:1,
        borderRadius:20
    }
})

export default CustomInput;