import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { fontSizes, url } from '../constants'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function Story() {

    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(true);
    const [story, setStory] = useState([]);

    const getStories = async () => {
        try {
            const path = RNFS.DocumentDirectoryPath + '/dataListStory.json';
            RNFS.readFile(path, 'utf8')
                .then(content => {
                    // Xử lý dữ liệu ở đây
                    const data = JSON.parse(content);
                    setStory(data)
                    setLoading(false);
                    console.log('Dữ liệu đã được đọc từ local:');
                })
                .catch(error => {
                    setLoading(true);
                    console.log('Lỗi khi đọc dữ liệu từ local:', error);
                });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStories();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>


                    <View style={styles.searchSection}>

                        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
                        <TextInput
                            style={styles.input}
                            placeholder='search'
                        />


                    </View>


                    <View style={styles.storySection}>
                        <FlatList

                            data={story}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.story}
                                    onPress={() =>
                                        navigation.navigate('StoryIcon', { id: item.id })
                                    }
                                >
                                    <Image
                                        style={styles.storyThumbnail}
                                        source={{
                                            uri: item.thumbnail
                                        }}
                                    />

                                    <View style={styles.storyInfo}>

                                        <Text style={styles.storyName}>{item.name}</Text>
                                        <Text style={styles.storyAuthor}>Author: {item.author}</Text>
                                        <View style={styles.storyAction}>
                                            <Icon style={styles.icon} name='volume-up' size={20} />
                                            <Icon name='angle-right' size={20} />
                                            <Icon style={styles.icon} name='microphone' size={20} />
                                            <Icon name='angle-right' size={20} />
                                            <Icon style={styles.icon} name='question' size={20} />
                                        </View>
                                    </View>



                                </TouchableOpacity>
                            }
                        />

                        {/* <TouchableOpacity
                            style={styles.addStory}
                            onPress={() =>
                                navigation.navigate('StoryDetail')
                            }
                        > 
                            <Text style={styles.plus}>+</Text>
                        </TouchableOpacity> */}
                    </View>


                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white',
            flex: 1
        },
        searchSection: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#555dae',
            paddingHorizontal: 15
        },
        searchIcon: {
            padding: 13,
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
        },
        input: {
            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 0,
            backgroundColor: 'white',
            color: '#424242',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10
        },
        storySection: {
            flex: 5,
            borderBlockStartColor: 'white'
        },
        story: {
            height: 200,
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            flexDirection: 'row',
            alignItems: 'center'
        },
        storyThumbnail: {
            width: 150,
            height: 180,
            resizeMode: 'cover',
            marginRight: 15,
            borderRadius: 10
        },
        storyInfo: {
            width: 180,
            height: '90%',
        },
        storyName: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: fontSizes.h3,
            paddingVertical: 10
        },
        storyAuthor: {
            fontSize: fontSizes.h5,
            fontWeight: 'bold',
            color: 'black',
            paddingBottom: 20
        },
        storyAction: {
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center',
        },
        icon: {
            height: 30,
            width: 30,
            backgroundColor: 'blue',
            borderRadius: 25,
            color: 'white',
            paddingTop: 5,
            paddingLeft: 7,
            margin: 5
        },
        addStory: {
            height: 200,
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        plus: {
            fontSize: fontSizes.h1,
            fontWeight: 'bold',
            color: 'black'
        }
    }
)

export default Story;