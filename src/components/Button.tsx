import React from 'react';

import { 
  TouchableOpacityProps, 
  StyleSheet, 
  TouchableOpacity, 
  Text 
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
  title: string
}

const Button = ({title, disabled, ...rest}: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
})

export default Button;

