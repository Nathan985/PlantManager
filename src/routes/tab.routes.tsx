import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import PlantSelect from '../screen/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import MyPlantsSaved from '../screen/MyPlantsSaved';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator 
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: 20,
          height: 70
        }
      }}
    >
      <AppTab.Screen 
        name="New Plant"
        component={PlantSelect}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons 
              name='add-circle-outline'
              size={size}
              color={color}
            />
          )) 
        }}
      />
      <AppTab.Screen 
        name="My Plants"
        component={MyPlantsSaved}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons 
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )) 
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes;