import React from "react";
import { Alert, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomInput from "../../component/CustomInput";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../component/CustomButton";
import axios from "axios";
import { HEIGHT, WITH, url } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CreateText = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            sync_data:null
        }
    });

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            // const token = '27|OTDG20Pjf0Y40TWUq56Fq4BWPgOJTr7AKkaZgvRB'
            console.log('Token:', token);
            return token;
        } catch (error) {
            console.log('Truy xuất token thất bại:', error);
            return null;
        }
    };

    const onCreateNewText = async data => {
        try {
            const baererToken = await getToken();
            const response = await axios.post(url.createText, data, {
                headers: {
                    Authorization: `Bearer ${baererToken}`,
                },
            })
            .then(function (response) {
                if (response.status == 200) {
                    Alert.alert('Create success','you had add new text successfully!')
                } else {
                    Alert.alert('Create fail','has some erorr!')
                }
              })
              .catch(function (error) {
                console.log(error);
              });
              
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    }

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
                    <View style={styles.inputField} >
                        <CustomInput
                            control={control}
                            rules={{
                                required: "Text is required",
                            }}
                            placeholder={"text"}
                            name={"text"}
                        />
                        <CustomInput
                            control={control}
                            rules={{}}
                            placeholder={"sync_data"}
                            name={"sync_data"}
                        />
                    </View>
                    <View style={styles.submitField} >
                        <CustomButton
                            text={"submit"}
                            onPress={handleSubmit(onCreateNewText)}
                        />
                    </View>
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
        width: WITH < HEIGHT ? WITH : HEIGHT,
        height: HEIGHT > WITH ? HEIGHT : WITH,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor:'white'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight:'bold'
    },
    footer: {
        flex: 1,
    },
    content: {
        flex: 8,
        backgroundColor: 'white',
        opacity: 0.8,
        borderRadius: 40,
        marginHorizontal: 20,
    },
    inputField: {
        flex: 8,
        paddingTop: 100,
    },
    submitField: {
        flex: 2
    }
})

export default CreateText;