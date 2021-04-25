import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screen/Welcome'; 
import Indentification from '../screen/Indentification'; 
import Confirmation from '../screen/Confirmation'; 
import MyPlantsSaved from '../screen/MyPlantsSaved'; 

import colors from '../styles/colors';
import PlantSave from '../screen/PlantSave';
import AuthRoutes from './tab.routes';

const stackRouters = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRouters.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stackRouters.Screen
      name="Welcome"
      component={Welcome}
    />
    <stackRouters.Screen
      name="Indentification"
      component={Indentification}
    />
    <stackRouters.Screen
      name="Confirmation"
      component={Confirmation}
    />
    <stackRouters.Screen
      name="PlantSelect"
      component={AuthRoutes}
    />
    <stackRouters.Screen
      name="PlantSave"
      component={PlantSave}
    />
    <stackRouters.Screen
      name="MyPlantsSaved"
      component={AuthRoutes}
    />

  </stackRouters.Navigator>
);

export default AppRoutes;