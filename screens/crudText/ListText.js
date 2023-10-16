import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { url } from "../../constants";

const ListText = () => {
    
    const [listText, setListText] = useState([])

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

    const getTextList = async () => {
        try {
            const baererToken = await getToken();
            const response = await axios.get(url.getTextList, {
                headers: {
                    Authorization: `Bearer ${baererToken}`,
                },
            });
            setListText(response.data);
            console.log("text list", response.data)
            // dispatch(loadStory(response.data))
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getTextList();
    }, [])

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.title}>Text list</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={listText}
                    renderItem={({ item }) =>
                        <View style={styles.textItem}>
                            <View style={styles.audioLeft} >
                                <Text style={styles.audioName}>{item.text}</Text>
                            </View>
                            {/* <View style={styles.audioPlay} >
                                <TouchableOpacity onPress={() => handlePlay(item.audio)}>
                                    <Icon name='play-circle' size={50} style={styles.audioPlayIcon} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    header: {
        backgroundColor: 'white',
        height: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color:'black',
        marginStart: 10
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 10,
    },
    textItem: {
        // height: 70,
        minHeight:70,
        flexDirection: 'row',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderColor: "#e8e8e8",
        borderWidth: 2
    },
    audioLeft: {
        flex: 7,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    audioPlay: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    audioName: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black'
    },
    audioPlayIcon: {
        color: 'black'
    }
})

export default ListText;