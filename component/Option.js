import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { HEIGHT, WITH } from '../../constants'

const Option = ({ setIndexPage, currentPage, onPress, autoNextPage, cancleAutoNextPage }) => {

    const navigation = useNavigation()

    const [isAutoLoad, setIsAutoLoad] = useState(false);
    const reloadStory = () => {
        onPress();
        setIndexPage(0);
        cancleAutoNextPage();
    }

    const autoload = () => {
        setIsAutoLoad(!isAutoLoad);
        if (isAutoLoad) {
            cancleAutoNextPage();
        } else {
            autoNextPage();
        }
        onPress();
    }


    const cancelStory = () => {
        navigation.navigate('StoryIcon')
        cancleAutoNextPage();
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.option}>
                <View style={styles.selectOpion}>
                    <View style={styles.circle}>
                        <Icon name='pause' size={30} style={styles.icon} />
                        {/* <Icon name='caret-forward-circle-outline' size={30} style={styles.icon} />F */}
                    </View>
                    <View style={styles.circle}>
                        <TouchableOpacity onPress={reloadStory}>
                            <Icon name='reload' size={30} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.circle}>
                        <TouchableOpacity onPress={autoload}>
                            {
                                !isAutoLoad && <Icon name='time-outline' size={30} style={styles.icon} />
                            }
                            {
                                isAutoLoad && <Icon name='hand-left-outline' size={30} style={styles.icon} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cancel}>
                    <View style={styles.circle}>
                        <TouchableOpacity onPress={cancelStory}>
                            <Icon name='exit-outline' size={30} style={styles.icon} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Option;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    option: {
        flex: 8,
        flexDirection: 'row',
    },
    selectOpion: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'brown',
        marginRight: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 60,
        backgroundColor: '#33CCFF'
    },
    icon: {
        color: 'white'
    },
    cancel: {
        flex: 2,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})