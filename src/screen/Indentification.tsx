import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Button from '../components/Button'
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Indentification(){

  const [isFocused, setIsFocused] = useState(false)
  const [userName, setUserName] = useState("")
  const navigation = useNavigation();

  async function HandleRouter(){
    if(!userName)
    return Alert.alert('Nome Invalido', 'Como devemos te chamar?');

    try{
      await AsyncStorage.setItem('@plantmanager:user', userName);

      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subTitle: 'Agora vamos começar a cuidas das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: '😉',
        nextScreen: 'PlantSelect'
      });
    }
    catch{
      Alert.alert('Erro ao salvar', 'Não foi possivel salvar');
    }
  }

  function handleInputBlur(){
    if(userName){
      setIsFocused(true);
    }
    else{
      setIsFocused(false);
    }
  }
  function handleInputFocus(){
    setIsFocused(true);
  }
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content} >
            <View style={styles.form} >
              <Text style={styles.emoji}>
                🤩
              </Text>
              <Text style={styles.title}>
                Como podemos {'\n'}
                chamar você?
              </Text>
              <TextInput 
                style={[
                  styles.input, 
                  isFocused && styles.AnimateFocus
                ]}
                onChange={event => setUserName(event.nativeEvent.text)}
                placeholder='Digite seu nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
              />
              <View style={styles.containerButton}>
                <Button 
                  title='Confirmar' 
                  onPress={HandleRouter}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  containerButton: {
    marginTop: 40,
    paddingHorizontal: 20,
    width: '100%'
  },
  AnimateFocus: {
    borderColor: colors.green
  }
})