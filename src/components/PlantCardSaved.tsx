import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
  Animated
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgUri} from 'react-native-svg'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Feather } from '@expo/vector-icons';

interface PlantProps extends TouchableOpacityProps{
  data: {
    name: string;
    photo: string;
    hour: string;
  }
  handleRemove: () => void
}

const PlantCardSaved = ({ data, handleRemove, ...rest}: PlantProps) => {
  return(
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <TouchableOpacity
              style={styles.ButtonRemove}
              onPress={handleRemove}
            >
              <Feather 
                name='trash'
                size={32}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    >
      <TouchableOpacity
        style={styles.container}
        {...rest}
      >
        <SvgUri 
          uri={data.photo} 
          width={70} 
          height={70}
        />
        <Text style={styles.title}>
            {data.name}
        </Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às:
          </Text>
          <Text style={styles.time}>
            {data.hour}
          </Text>
        </View>
      </TouchableOpacity> 
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title:{
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading
  },
  details:{
    alignItems: 'flex-end'
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },
  ButtonRemove: {
    width: 100,
    height: 90,
    backgroundColor: colors.red,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 2
  }
})

export default PlantCardSaved