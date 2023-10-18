import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConfirmLoadData = ({ modalVisible, confirmLoadData }) => {

    const handleCancel = () => {
        confirmLoadData(false, false)
    }

    const handleOk = () => {
        confirmLoadData(true, false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Do you want to update data?</Text>
                    <View style={styles.buttonView}>
                        <Pressable
                            style={[styles.button]}
                            onPress={handleCancel}>
                            <Text style={styles.textStyle}>No</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonOK]}
                            onPress={handleOk}>
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmLoadData

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonView: {
        flexDirection: 'row'
    },
    button: {
        borderRadius: 20,
        margin: 10,
        width: 100,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonOK: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
})