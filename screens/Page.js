import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import PageDetail from './PageDetail';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Page(props) {

    const [currentPage, setCurrentPage] = useState(0);

    // page = props.route.params.pages
    const [page, setPage] = useState([
        {
            "id": 1,
            "story_id": 1,
            "contentsize": "{800, 350}",
            "background": "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1694453353/backgrounds/Lg4oU6Aq4DxsWdwLByyCax1672904703767_trong_euiz4n.png",
            "has_touch": [
                {
                    "id": 1,
                    "page_id": 1,
                    "data": {
                        "star_position": [255, 210],
                        "boundingbox": [85, 145]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 4,
                        "text": "Boy",
                        "has_audio": "boy.mp3"
                    }
                },
                {
                    "id": 2,
                    "page_id": 1,
                    "data": {
                        "star_position": [450, 205],
                        "boundingbox": [125, 145]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 5,
                        "text": "Boy",
                        "has_audio": "boy.mp3"
                    }
                },
                {
                    "id": 3,
                    "page_id": 1,
                    "data": {
                        "star_position": [330, 85],
                        "boundingbox": [125, 80]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 5,
                        "text": "salads?",
                        "has_audio": "salad_bowl.mp3"
                    }
                }
            ],
            "has_text_config": [
                {
                    "id": 1,
                    "page_id": 1,
                    "text_id": 4,
                    "type": "title",
                    "position": [150, 30],
                    "belong_text": {
                        "id": 4,
                        "text": "Hey, do you want to eat some salads?",
                        "has_audio": [
                            {
                                "file_path": "hey_do_you_want_to_eat_some_salads.mp3",
                                "sync_data": [
                                    {
                                        "e": 900,
                                        "s": 0,
                                        "te": 3,
                                        "ts": 0,
                                        "w": "Hey,"
                                    },
                                    {
                                        "e": 1090,
                                        "s": 900,
                                        "te": 6,
                                        "ts": 5,
                                        "w": "do"
                                    },
                                    {
                                        "e": 1300,
                                        "s": 1090,
                                        "te": 10,
                                        "ts": 8,
                                        "w": "you"
                                    },
                                    {
                                        "e": 1660,
                                        "s": 1300,
                                        "te": 15,
                                        "ts": 12,
                                        "w": "want"
                                    },
                                    {
                                        "e": 1850,
                                        "s": 1660,
                                        "te": 18,
                                        "ts": 17,
                                        "w": "to"
                                    },
                                    {
                                        "e": 2100,
                                        "s": 1850,
                                        "te": 22,
                                        "ts": 20,
                                        "w": "eat"
                                    },
                                    {
                                        "e": 2450,
                                        "s": 2100,
                                        "te": 27,
                                        "ts": 24,
                                        "w": "some"
                                    },
                                    {
                                        "e": 3530,
                                        "s": 2450,
                                        "te": 35,
                                        "ts": 29,
                                        "w": "salads?"
                                    }
                                ]
                            }
                        ]
                    }
                },
            ]
        },
        {
            "id": 2,
            "story_id": 1,
            "contentsize": "{800, 350}",
            "background": "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1694453354/backgrounds/ONwVWDqBvuLzO9JRN2rmTH1672904703776_trong_j4fxa7.png",
            "has_touch": [
                {
                    "id": 1,
                    "page_id": 2,
                    "data": {
                        "star_position": [250, 80],
                        "boundingbox": [100, 180]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 4,
                        "text": "helo",
                        "has_audio": "cucumber.mp3"
                    }
                },
                {
                    "id": 2,
                    "page_id": 2,
                    "data": {
                        "star_position": [440, 80],
                        "boundingbox": [100, 180]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 5,
                        "text": "Apple",
                        "has_audio": "apple.mp3"
                    }
                },
                {
                    "id": 3,
                    "page_id": 2,
                    "data": {
                        "star_position": [405, 230],
                        "boundingbox": [105, 60]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 5,
                        "text": "salad bowl",
                        "has_audio": "egg.mp3"
                    }
                }
            ],
            "has_text_config": [
                {
                    "id": 1,
                    "page_id": 2,
                    "text_id": 4,
                    "type": "title",
                    "position": [50, 30],
                    "belong_text": {
                        "id": 4,
                        "text": "It's fun to make something together. Now let's enjoy!",
                        "has_audio": [
                            {
                                "file_path": "it_s_fun_to_make_something_together_now_let_s_enjoy.mp3",
                                "sync_data": [
                                    {
                                        "e": 520,
                                        "s": 0,
                                        "te": 3,
                                        "ts": 0,
                                        "w": "It's"
                                      },
                                      {
                                        "e": 800,
                                        "s": 520,
                                        "te": 7,
                                        "ts": 5,
                                        "w": "fun"
                                      },
                                      {
                                        "e": 1010,
                                        "s": 800,
                                        "te": 10,
                                        "ts": 9,
                                        "w": "to"
                                      },
                                      {
                                        "e": 1230,
                                        "s": 1010,
                                        "te": 15,
                                        "ts": 12,
                                        "w": "make"
                                      },
                                      {
                                        "e": 1900,
                                        "s": 1230,
                                        "te": 25,
                                        "ts": 17,
                                        "w": "something"
                                      },
                                      {
                                        "e": 2910,
                                        "s": 1900,
                                        "te": 35,
                                        "ts": 27,
                                        "w": "together."
                                      },
                                      {
                                        "e": 3330,
                                        "s": 2910,
                                        "te": 39,
                                        "ts": 37,
                                        "w": "Now"
                                      },
                                      {
                                        "e": 3660,
                                        "s": 3330,
                                        "te": 45,
                                        "ts": 41,
                                        "w": "let's"
                                      },
                                      {
                                        "e": 4500,
                                        "s": 3660,
                                        "te": 52,
                                        "ts": 47,
                                        "w": "enjoy!"
                                      }
                                ]
                            }
                        ]
                    }
                },
            ]
        },
        {
            "id": 3,
            "story_id": 1,
            "contentsize": "{800, 350}",
            "background": "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1694453353/backgrounds/uQx8vLnhByvU8BGfJnpxur1672904703648_trong_geeaoz.png",
            "has_touch": [
                {
                    "id": 1,
                    "page_id": 3,
                    "data": {
                        "star_position": [250, 80],
                        "boundingbox": [100, 180]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 4,
                        "text": "helo",
                        "has_audio": "cucumber.mp3"
                    }
                },
                {
                    "id": 2,
                    "page_id": 3,
                    "data": {
                        "star_position": [440, 80],
                        "boundingbox": [100, 180]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 5,
                        "text": "Apple",
                        "has_audio": "apple.mp3"
                    }
                },
                {
                    "id": 3,
                    "page_id": 3,
                    "data": {
                        "star_position": [405, 230],
                        "boundingbox": [105, 60]
                    },
                    "text_id": 4,
                    "belong_text": {
                        "id": 5,
                        "text": "salad bowl",
                        "has_audio": "egg.mp3"
                    }
                }
            ],
            "has_text_config": [
                {
                    "id": 1,
                    "page_id": 3,
                    "text_id": 4,
                    "type": "title",
                    "position": [100, 30],
                    "belong_text": {
                        "id": 4,
                        "text": "Let's make a salad bowl!",
                        "has_audio": [
                            {
                                "file_path": "let_s_make_a_salad_bowl.mp3",
                                "sync_data": [
                                    {
                                        "e": 640,
                                        "s": 0,
                                        "te": 4,
                                        "ts": 0,
                                        "w": "Let's"
                                      },
                                      {
                                        "e": 930,
                                        "s": 640,
                                        "te": 9,
                                        "ts": 6,
                                        "w": "make"
                                      },
                                      {
                                        "e": 1060,
                                        "s": 930,
                                        "te": 11,
                                        "ts": 11,
                                        "w": "a"
                                      },
                                      {
                                        "e": 1780,
                                        "s": 1060,
                                        "te": 17,
                                        "ts": 13,
                                        "w": "salad"
                                      },
                                      {
                                        "e": 2300,
                                        "s": 1780,
                                        "te": 23,
                                        "ts": 19,
                                        "w": "bowl!"
                                      }
                                ]
                            }
                        ]
                    }
                },
                {
                    "id": 2,
                    "page_id": 3,
                    "text_id": 5,
                    "position": [150, 60],
                    "belong_text": {
                        "id": 4,
                        "text": "Sounds great!",
                        "has_audio":  [
                            {
                                "file_path": "sounds_great.mp3",
                                "sync_data": [
                                    {
                                        "e": 790,
                                        "s": 0,
                                        "te": 5,
                                        "ts": 0,
                                        "w": "Sounds"
                                      },
                                      {
                                        "e": 1690,
                                        "s": 790,
                                        "te": 12,
                                        "ts": 7,
                                        "w": "great!"
                                      }
                                ]
                            }
                        ]
                    }
                },
            ]
        },
    ])

    onChange = (nativeEvent) => {
        const offsetX = nativeEvent.nativeEvent.contentOffset.x;
        const page = Math.floor((offsetX / HEIGHT)/2) ;
        setCurrentPage(page);
    }
    return (
        <View style={styles.container}>



            <ScrollView
                // snapToInterval={WIDTH} 
                decelerationRate={'fast'}
                horizontal
                onScroll={onChange}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                style={styles.container}>
                {page.map((source, index) =>


                    <PageDetail key={index} page={source} currentPage={currentPage} />
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            // backgroundColor: 'red',
            flex: 1
        },
        wrap: {
            width: WIDTH,
            height: HEIGHT
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