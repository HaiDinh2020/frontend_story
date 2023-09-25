import { Text, View, TextInput, Button, Alert, StyleSheet, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "./CustomInput";

const { WITH, HEIGHT } = Dimensions.get('screen')

export default function InputText() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName3: '',
            lastName: ''
        }
    });
    const onSubmit = data => console.log(data);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>Create New Audio</Text>
            </View>
            <View style={styles.inputField} >

                <CustomInput 
                    control={control} 
                    rules={{
                        required: "first name is required",
                    }}
                    placeholder={"first name"}
                    name={"usenameg"}
                />
                <CustomInput 
                    control={control} 
                    rules={{
                        required: "first name is required",
                    }}
                    placeholder={"first name"}
                    name={"usenameg"}
                />
            </View>

            

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: WITH,
        // height: HEIGHT,
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    title: {
        flex:2,
        backgroundColor:'red'
    },
    inputField:{
        flex:8,
        backgroundColor:'blue'
    }
})
