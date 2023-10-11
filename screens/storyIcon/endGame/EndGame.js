import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function EndGame() {
  return (
    <View style={styles.container}> 
      <Text>EndGame Get your coin</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor:'red'
    }
})