import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomInput from "../../component/CustomInput";
import { useForm, Controller } from "react-hook-form";


const WITH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const CreateText = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName3: '',
            lastName: ''
        }
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../asserts/background_crud.jpg")}
                resizeMode='cover'
                style={styles.background}
            >
                <View style={styles.header} >

                    <Text style={styles.title}>create new text</Text>
                </View>

                <View style={styles.content}>
                    <CustomInput
                        control={control}
                        rules={{
                            required: "first name is required",
                        }}
                        placeholder={"first name"}
                        name={"usenameg"}
                    />
                </View>
                <View style={styles.footer} />

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: WITH,
        height: HEIGHT,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor:'white'
    },
    title: {
        color: 'white',
        // marginLeft:50
    },
    footer: {
        flex: 1,
    },
    content: {
        flex: 8,
        backgroundColor: 'white',
        borderRadius: 40,
        marginHorizontal: 20
    }
})

export default CreateText;