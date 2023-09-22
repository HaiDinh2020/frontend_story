import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import PageDetail from './PageDetail';
import { url } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Page(props) {

    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const pageId = props.route.params.pages
    console.log('page id', pageId)
    // const page2 = props.route.params.pages
    // console.log("page server", page2)
    const [page, setPage] = useState([])

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

    const getStoryById = async (id) => {
        try {
            const baererToken = await getToken();
            const response = await axios.get(`${url.getStories}/${id}`, {
                headers: {
                    Authorization: `Bearer ${baererToken}`,
                },
            });
            setPage(response.data.has_page);
            console.log(2, response.data)
            // dispatch(loadStory(response.data))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStoryById(pageId)
    }, [])

    onChange = (nativeEvent) => {
        const offsetX = nativeEvent.nativeEvent.contentOffset.x;
        const page = Math.floor((offsetX / HEIGHT) / 2);
        setCurrentPage(page);
    }


    return (
        <View style={styles.container}>

            {isLoading ? (
                <ActivityIndicator />
            ) : (

                <ScrollView
                    // snapToInterval={WIDTH} 
                    decelerationRate={'fast'}
                    horizontal
                    onScroll={onChange}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    style={styles.container}>
                    {page != undefined ? page.map((source, index) =>


                        <PageDetail key={index} page={source} currentPage={currentPage} />
                    ) : null}
                </ScrollView>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        wrap: {
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: 'yellow'
        },
        background: {
            height: 180,
            width: 100,
            backgroundColor: 'blue'
        },
        image: {
            height: 100,
            width: 100,
            backgroundColor: 'black'
        }
    }
)

export default Page;