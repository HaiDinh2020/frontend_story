import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateText, Menu, Page, PageIcon, Register, Story, StoryIcon, EndGame, Login, LoadData, GestureHandlerPage } from '../screens';

import NavigationService from './NavigationServices';
import UITab from './UITab';
import InputText from '../component/InputText';


const Stack = createNativeStackNavigator();

export function Route() {
    return (
        <NavigationContainer ref={(ref) => NavigationService.setTopLevelNavigator(ref)}>
            <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, orientation: 'portrait' }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false, orientation: 'portrait' }}
            />
            <Stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Home" component={UITab} />
            <Stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="LoadData" component={LoadData} />
            <Stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Story" component={Story} />
            <Stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name='CRUD' component={InputText} />
            <Stack.Screen options={{ headerShown: false, orientation: 'landscape' }} name="StoryDetail" component={Page} />
            <Stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Menu" component={Menu} />
            <Stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="CreateText" component={CreateText} />
            <Stack.Screen options={{ headerShown: false, orientation: 'landscape' }} name="StoryIcon" component={StoryIcon} />
            <Stack.Screen options={{ headerShown: false, orientation: 'landscape' }} name="PageIcon" component={PageIcon} />
            <Stack.Screen options={{ headerShown: false, orientation: 'landscape' }} name="GestureHandlerPage" component={GestureHandlerPage} />
            <Stack.Screen options={{ headerShown: false, orientation: 'landscape' }} name="EndGame" component={EndGame} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}