import { Jost_500Medium } from '@expo-google-fonts/jost';
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import EnviromentButton from '../components/EnviromentButton';
import Header from '../components/Header';
import PlantCard from '../components/PlantCard';
import api from '../services/Api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Load from '../components/Load';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps{
  key: string,
  title: string
}

const PlantSelect: React.FC = () => {

  const [eviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handlePlantSelect(plant: PlantProps){
    navigation.navigate('PlantSave', { plant });
  }

  function handleEnviromentSelected(enviroment: string){
    setEnviromentSelected(enviroment)

    if(enviroment == 'All') return setFilteredPlants(plants);
    
    const filtered = plants.filter(plant => (
      plant.environments.includes(enviroment)
    ))

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number){
    if(distance < 1) return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);

    fetchPlants();
  }

  useEffect(() =>{
    async function fetchEnviroment(){
      const { data } = await api.get('plants_environments?_sort=title&asc');
      setEnviroments([{
        key: 'All',
        title: 'Todos'
      }, ...data])
    }

    fetchEnviroment();

  },[]);

  async function fetchPlants(){
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
    
    if(!data) return setLoading(true);

    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }
    else{
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() =>{
    

    fetchPlants();
  }, [])

  if(loading){
    return <Load />
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subTitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View style={{marginLeft: 32}}>
        <FlatList
          data={eviroments}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          renderItem={({item}) => (
            <EnviromentButton 
              title={item.title}
              key={String(item.key)}
              active={enviromentSelected === item.key}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        ></FlatList>
      </View>
      <View style={styles.Containerplants}>
        <FlatList 
          data={filteredPlants}
          renderItem={({item}) => (
            <PlantCard 
              key={String(item.id)}
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => {
            handleFetchMore(distanceFromEnd)
          }}
          ListFooterComponent={
            loadingMore ?
            <ActivityIndicator color={colors.green_dark} /> : null
          }
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 35
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  header: {
    paddingHorizontal: 30
  },
  enviromentList: {
    height: 50,
    justifyContent: 'center',
    paddingBottom: 5,
    marginVertical: 32
  },
  Containerplants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  }
})

export default PlantSelect;