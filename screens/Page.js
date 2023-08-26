import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import fontSizes from '../constants/fontSizes';

function Page(props) {
    // page = props.route.params.pages
    const [page, setPage] = useState(
        props.route.params.pages
        // [
        //     {
        //         "id": 1,
        //         "story_id": 1,
        //         "background": "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/m/sm-a546_galaxy_a54_5g_awesome_violet_front_2.png",
        //         "has_touch": [
        //             {
        //                 "id": 1,
        //                 "page_id": 1,
        //                 "data": "kjhlk;l kjl l;;",
        //                 "text_id": 4,
        //                 "belong_text": {
        //                     "id": 4,
        //                     "text": "ajdklf 444",
        //                     "has_audio": null
        //                 }
        //             }
        //         ],
        //         "has_text_config": [
        //             {
        //                 "id": 1,
        //                 "page_id": 1,
        //                 "text_id": 4,
        //                 "position": "k52",
        //                 "belong_text": {
        //                     "id": 4,
        //                     "text": "ajdklf 444",
        //                     "has_audio": null
        //                 }
        //             },
        //         ]
        //     },
        //     {
        //         "id": 2,
        //         "story_id": 1,
        //         "background": "db_design_examp.png",
        //         "has_touch": [],
        //         "has_text_config": []
        //     },
        //     {
        //         "id": 3,
        //         "story_id": 1,
        //         "background": "db_design_examp.png",
        //         "has_touch": [],
        //         "has_text_config": []
        //     },
        //     {
        //         "id": 4,
        //         "story_id": 1,
        //         "background": "db_design_examp.png",
        //         "has_touch": [],
        //         "has_text_config": []
        //     }
        // ]
    );
        
    return (
        <View style={styles.container}>

            <View  >
                <FlatList
                    data={page}
                    renderItem={({item})=> 
                            <View style={styles.page}>
                                <FlatList
                                    data={item.has_text_config}
                                    renderItem={({item}) =>
                                        <View style={styles.pageText}>
                                            <Text style={styles.text}>{item.belong_text.text}</Text>
                                        </View>
                                    }
                                />
                                <Image
                                    style={styles.background}
                                    source={{
                                        uri:item.background
                                    }}
                                />
                            </View>
                        
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white',
            flex:1
        },
        page: {
            height:300,
            backgroundColor:'white', 
            margin:20,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 10,
            justifyContent:'center'
        },
        pageText: {
            height:50, 
            justifyContent:'center',
            alignItems:'center',
            marginVertical:10,
            marginHorizontal:5
        },
        text: {
            fontSize: fontSizes.h1,
            color:'black'
        },
        background: {
            height: 180,
            resizeMode:'stretch'
        }
    }
)

export default Page;