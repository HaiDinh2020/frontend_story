import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Audio } from "../screens";
import ListText from "../screens/crudText/ListText";

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTinitColor: 'white',
    tabBarHideOnKeyboard: true,
    tabBarInactiveTintColor: 'black',
    tabBarActiveBackgroundColor: '#555dae',
    tabBarInactiveBackgroundColor: '#555dae',
    // tabBarItemStyle:{
    //     backgroundColor:'#00ff00',
    //     margin:5,
    //     borderRadius:10,
    // },
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
            case 'Story':
                iconName = 'book';
                break;
            case 'Audio':
                iconName = 'file-audio';
                break;
            case 'Text':
                iconName = 'book';
                break;
            default:
                break;
        }
        return <Icon
            name={iconName}
            size={22}
            color={focused ? "white" : "black"}
        />
    }

})
const Tab = createBottomTabNavigator()
function UITab(props) {
    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Audio" component={Audio} />
        <Tab.Screen name="Text" component={ListText} />
    </Tab.Navigator>
}

export default UITab;