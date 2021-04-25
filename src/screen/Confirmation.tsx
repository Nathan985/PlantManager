import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import {
   View,
   SafeAreaView,
   Text,
   StyleSheet
} from 'react-native';

import Button from '../components/Button'
import Routes from '../routes';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string,
  subTitle: string,
  buttonTitle: string,
  icon: string,
  nextScreen: string
}

const screen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    subTitle,
    icon,
    buttonTitle,
    nextScreen
  } = route.params as Params;

  function StartApp(){
    navigation.navigate(nextScreen);
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {icon}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subTitle}>
          {subTitle}
        </Text>
        <View style={styles.footer}>
          <Button 
            title={buttonTitle} 
            onPress={StartApp}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subTitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },
  emoji: {
    fontSize: 78,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 20
  }
})

export default screen;