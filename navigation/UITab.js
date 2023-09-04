import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Story, Audio, Profile } from "../screens";

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
            case 'Profile':
                iconName = 'user-cog';
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
        <Tab.Screen name="Story" component={Story} />
        <Tab.Screen name="Audio" component={Audio} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
}

export default UITab;