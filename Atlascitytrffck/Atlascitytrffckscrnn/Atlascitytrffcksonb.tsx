// onboard

import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';

import {useState} from 'react';

const atlasCityData = [
  {
    id: 1,
    title: 'Big cities of the world',
    image: require('../../assets/i/Atlascitytrffcon1.png'),
    btnLabel: 'Continue',
    description: `Megapolises live in their own rhythm of traffic. In each city, transport behaves in its own way: somewhere the roads are narrow, somewhere there are many junctions, and somewhere the traffic is slow but very organized.

The application collects the most famous cities with intensive traffic. You can read short descriptions, learn interesting observations about the roads and better understand how urban mobility works in different parts of the world.`,
  },
  {
    id: 2,
    title: 'Explore urban flows',
    image: require('../../assets/i/Atlascitytrffcon2.png'),
    btnLabel: 'Okay, next',
    description: `Each city has its own traffic characteristics. Somewhere compact cars prevail, somewhere large SUVs, and sometimes the entire system is built around ring roads.
    
The application contains short observations and tips about the behavior of transport in large cities. This will help you better understand the atmosphere of megacities and their rhythm of movement.`,
  },
  {
    id: 3,
    title: 'Types of cars in the city',
    image: require('../../assets/i/Atlascitytrffcon3.png'),
    btnLabel: 'good',
    description: `In megacities you can see a wide variety of cars - from compact hatchbacks to large SUVs. Each type has its own advantages in the urban environment.

The application has a separate section with descriptions of different body types. There you can read short stories about how these cars behave in heavy traffic and why they are popular in certain cities.`,
  },
  {
    id: 4,
    title: 'Quiz and facts',
    image: require('../../assets/i/Atlascitytrffcon4.png'),
    btnLabel: 'okay',
    description: `The application has a thematic quiz about cities and their transport rhythm. Short questions will help you test your knowledge of megacities, roads and urban features of different countries.

You can also get random facts about cities from the application collection - small observations about traffic, roads and the atmosphere of large megacities.`,
  },
  {
    id: 5,
    title: 'Map of megacities',
    image: require('../../assets/i/Atlascitytrffcon5.png'),
    btnLabel: 'start',
    description: `All cities in the application are collected on an interactive map. You can view locations, open descriptions and save interesting facts, stories or tips.

It's a convenient way to explore the world's megacities and return to the places that interested you the most.`,
  },
];

const Atlascitytrffcksonb = () => {
  const navigation = useNavigation();
  const [atlasCityCurrIdx, setAtlasCityCurrIdx] = useState(0);

  const atlasCityNext = () => {
    if (atlasCityCurrIdx < 4) {
      setAtlasCityCurrIdx(atlasCityCurrIdx + 1);
    } else {
      navigation.replace('Atlascitytrtabs');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/i/atlascitytrffctbgg.png')}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 16,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 50,
          }}>
          <Image source={atlasCityData[atlasCityCurrIdx].image} />
          <LinearGradient
            colors={['#3F3F3F', '#282828']}
            style={{
              width: '100%',
              borderRadius: 12,
              marginTop: 40,
              minHeight: 370,
            }}>
            <View
              style={{padding: 24, justifyContent: 'space-between', flex: 1}}>
              <View>
                <Text style={styles.atlascitytrfctitle}>
                  {atlasCityData[atlasCityCurrIdx].title}
                </Text>
                <Text style={styles.atlascitytrfcdescription}>
                  {atlasCityData[atlasCityCurrIdx].description}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.atlascitytrfcbutton}
                onPress={atlasCityNext}
                activeOpacity={0.8}>
                <Text style={styles.atlascitytrfcbuttontext}>
                  {atlasCityData[atlasCityCurrIdx].btnLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  atlascitytrfctitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
  },
  atlascitytrfcdescription: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '300',
    textTransform: 'uppercase',
    marginTop: 20,
  },
  atlascitytrfcbutton: {
    width: 200,
    height: 65,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BD2C',
    marginTop: 20,
  },
  atlascitytrfcbuttontext: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Atlascitytrffcksonb;
