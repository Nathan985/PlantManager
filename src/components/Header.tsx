import React, {useState, useEffect} from 'react';
import { 
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import colors from '../styles/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import Avatar from '../assets/56900147.jpeg';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header: React.FC = () => {
  const [userName, setUserName] =useState<string>();

  useEffect(() =>{
    async function loadStorageUserName(){
      const data = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(data || '');
    }

    loadStorageUserName();
  },[])

  return(
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image 
        source={Avatar} 
        style={styles.avatar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getStatusBarHeight()
  },
  avatar:{
    width: 70,
    height: 70,
    borderRadius: 40
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
})

export default Header;