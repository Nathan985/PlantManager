import React from 'react';

import { 
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons'

import watering from '../assets/watering.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { useNavigation } from '@react-navigation/core';



const screen: React.FC = () => {

  const navigation = useNavigation();
  
  function HandleStart(){
    navigation.navigate('Indentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title} >
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          style={styles.Image} 
          source={watering}
          resizeMode='contain'
        />

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
        </Text>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={styles.button}
          onPress={HandleStart}
        > 
            <Feather 
              name="chevron-right" 
              style={styles.buttonIcon} 
            />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

}

export default screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 30,
    fontFamily: fonts.heading,
    lineHeight: 30
  },
  subTitle:{
    textAlign: 'center',
    fontSize: 19,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  Image: {
    height: Dimensions.get('window').width * 0.7
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems:  'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 28,
    marginLeft: 2
  }
})