import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native'

import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface ButtonProps extends RectButtonProps{
  title: string;
  active?: boolean;
} 


const EnviromentButton = ({title, active = false, ...rest}:ButtonProps) => {
  return(
    <RectButton 
      style={[
        styles.container, 
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text, 
        active && styles.textActive
        ]} 
      >
        {title}
      </Text>
    </RectButton>
  )
}

const styles =StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 50,
    width: 86,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 15
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  }
})

export default EnviromentButton;