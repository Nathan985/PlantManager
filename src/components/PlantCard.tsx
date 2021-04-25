import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgUri} from 'react-native-svg'

interface PlantProps extends TouchableOpacityProps{
  data: {
    name: string;
    photo: string;
  }
}

const PlantCard = ({ data, ...rest}: PlantProps) => {
  return(

    <TouchableOpacity
    style={styles.container}
    {...rest}
    
    >
    <SvgUri uri={data.photo} width={90} height={90} />
    <Text style={styles.text}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})

export default PlantCard