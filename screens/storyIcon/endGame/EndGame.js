import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons'
import MenuButton from '../../../component/MenuButton';
import { useNavigation } from '@react-navigation/native';

const EndGame = () => {

  const navigation = useNavigation()
  const handleRetry = () => {
    navigation.navigate('StoryIcon', { pages: 8 })
  }

  const handleMenu = () => {
    navigation.navigate('Menu')
  }

  return (
    <View style={styles.container}>
      <View style={styles.coinView}>
        <View style={styles.video} >

          <Video source={{ uri: "https://res.cloudinary.com/dmrsdkvzl/video/upload/v1697082924/StoryIcon/audio/animation_lnmn1ech_ymmojp.mp4" }}   // Can be a URL or a local file.
            onBuffer={this.onBuffer}
            onError={this.videoError}

            repeat={true}

            style={styles.backgroundVideo} />
        </View>
        <View style={styles.congratulation}>
          <Text style={styles.textCongra}>Congratulation!</Text>
        </View>
      </View>
      <View style={styles.option}>
        <View style={styles.choice}>
          <MenuButton optionText={"Retry"} handlePress={handleRetry} />
        </View>
        <View style={styles.choice}>
          <MenuButton optionText={"Menu"} handlePress={handleMenu} />
        </View>

      </View>

    </View>
  )
}


export default EndGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  coinView: {
    flex: 5,
  },
  video: {
    width: 200,
    height: 250,
  },
  backgroundVideo: {
    flex: 1
  },
  congratulation: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  option: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCongra: {
    textAlign: 'center',
    color: '#fbd305',
    fontSize: 20,
    fontWeight: 'bold'
  },
  choice: {
    width: 200,
    height: 120
  }
})