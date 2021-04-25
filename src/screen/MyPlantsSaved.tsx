import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import Header from '../components/Header';
import colors from '../styles/colors';
import WaterImage from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { LoadPlant, PlantProps, RemovePlant, StoragePlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import Load from '../components/Load';
import fonts from '../styles/fonts';
import PlantCardSaved from '../components/PlantCardSaved';

const MyPlantsSaved = () => {

  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();
  
  function handleRemove(plant: PlantProps){
    Alert.alert('Romover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try{
            
            await RemovePlant(String(plant.id));

            setMyPlants(oldData => (
              oldData.filter((item) => item.id !== plant.id)
            ))
          }
          catch(error){
            Alert.alert('Não foi possivel remover!')
          }
        }
      }
    ])
  }

  useEffect(() =>{

    async function loadStorageData(){
      const plantsStoraged = await LoadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt}
      )

      setNextWatered(
        `Não esquela de regar a planta ${plantsStoraged[0].name} às ${nextTime} horas.`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
    
  },[]);

  if(loading){
    return <Load />
  }

  return(
    <View style={styles.container}>
      <Header />

      <View style={styles.sportlight}>
        <Image 
          source={WaterImage}
          style={styles.sportlightImage}
        />
        <Text style={styles.sportlightText}>
          {nextWatered}
        </Text>
      </View>
      <View style={styles.myPlants}>
        <Text style={styles.plantsTitle} >
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSaved
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  sportlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sportlightImage: {
    width: 60,
    height: 60
  },
  sportlightText: {
    flex: 1,
    color: colors.blue,
    textAlign: 'justify',
    paddingHorizontal: 20
  },
  myPlants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})

export default MyPlantsSaved;