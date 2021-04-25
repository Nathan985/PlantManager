import React, { useEffect, useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {SvgFromUri} from 'react-native-svg'

import WaterImage from '../assets/waterdrop.png';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation, useRoute } from '@react-navigation/core';

import DataTimePiker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';
import { PlantProps, PlantSaveFunction } from '../libs/storage';

interface Params{
  plant: PlantProps
}

const PlantSave = () => {

  const route = useRoute();

  const { plant } = route.params as Params 

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePiker, setShowDatePiker] = useState(Platform.OS === 'ios');
  const navigation = useNavigation();
  function handleOpenDateTimePiker(){
    setShowDatePiker(oldState => !oldState);
  }

  async function handleSavePlant(){
    try {
      await PlantSaveFunction({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo Certo!',
        subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da suas plantas com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: '😉',
        nextScreen: 'MyPlantsSaved'
      });
    }
    catch{
      return Alert.alert('Não foi possivel salvar!');
    }
  }

  function handleChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePiker(oldState => !oldState)
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Esclolha uma hora no futuro!');
    }

    if(dateTime){
      setSelectedDateTime(dateTime);
    }
  }

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri 
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.contrller}>
          <View style={styles.tipContainer}>
            <Image 
              source={WaterImage}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>
          
          {
            showDatePiker && 
            <DataTimePiker 
              value={selectedDateTime}
              mode='time'
              display='spinner'
              onChange={handleChangeTime}
            />
          }

          {
            Platform.OS === 'android' &&
            <TouchableOpacity 
              style={styles.dataTimePiclerButton}
              onPress={handleOpenDateTimePiker}
            >
              <Text style={styles.dataTimePiclerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          }

          <Button 
            title='Cadastrar Planta'
            onPress={handleSavePlant}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:  colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    textAlign: 'center'
  },
  plantName: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    marginTop: 10
  },
  contrller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.blue,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dataTimePiclerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dataTimePiclerText: {
    color:  colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})

export default PlantSave
