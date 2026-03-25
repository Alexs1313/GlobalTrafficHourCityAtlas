// places

import {useNavigation} from '@react-navigation/native';

import {AtlasCityPlace, atlasCityPlacesData} from './Atlascitytrffckplacesdata';
import {useEffect, useState} from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Atlascitytrffclayout from '../Atlascitytrffccopnts/Atlascitytrffclayout';

const ATLAS_CITY_SAVED_PLACES_KEY = 'atlascitytrffck_saved_places_titles';

const Atlascitytrffcksplaces = () => {
  const [atlasCitySavedPlaces, setAtlasCitySavedPlaces] = useState<string[]>(
    [],
  );

  const navigation = useNavigation();

  useEffect(() => {
    const atlasCityLoadSavedPlaces = async () => {
      try {
        const raw = await AsyncStorage.getItem(ATLAS_CITY_SAVED_PLACES_KEY);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw) as string[];
        if (Array.isArray(parsed)) {
          setAtlasCitySavedPlaces(parsed);
        }
      } catch (error) {
        setAtlasCitySavedPlaces([]);
      }
    };

    atlasCityLoadSavedPlaces();
  }, []);

  const atlasCityToggleSavedPlace = async (title: string) => {
    const nextSaved = atlasCitySavedPlaces.includes(title)
      ? atlasCitySavedPlaces.filter(item => item !== title)
      : [...atlasCitySavedPlaces, title];

    setAtlasCitySavedPlaces(nextSaved);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_PLACES_KEY,
      JSON.stringify(nextSaved),
    );
  };

  const atlasCitySharePlace = async (place: AtlasCityPlace) => {
    await Share.share({
      message: `${place.title}\nCoordinates: ${place.coordinates}\n\n${place.description}`,
    });
  };

  const atlasCityOpenPlaceDetail = (title: string) => {
    const atlasCityNav = navigation.getParent() ?? navigation;
    (
      atlasCityNav as {navigate: (name: string, params?: object) => void}
    ).navigate('Atlascitytrffckplacedetail', {placeTitle: title});
  };

  return (
    <Atlascitytrffclayout>
      <View style={styles.atlasCityPlacesRoot}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={{flexDirection: 'row', alignItems: 'center', gap: 12}}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/i/atlascitytpcaback.png')} />
          <Text style={styles.atlasCityPlacesTitle}>Recommended places</Text>
        </TouchableOpacity>
        <Text style={styles.atlasCityPlacesSubtitle}>
          Click on a place and discover more information
        </Text>

        {atlasCityPlacesData.map(place => (
          <TouchableOpacity
            key={place.title}
            activeOpacity={0.92}
            onPress={() => atlasCityOpenPlaceDetail(place.title)}>
            <LinearGradient
              colors={['#4C4C4C', '#2D2D2D']}
              style={styles.atlasCityPlaceCard}>
              <View style={{padding: 14}}>
                <View style={styles.atlasCityPlaceInnerBorder}>
                  <View style={styles.atlasCityPlaceTopRow}>
                    <View style={styles.atlasCityPlaceImageWrap}>
                      <Image
                        source={place.image}
                        style={styles.atlasCityPlaceImage}
                      />
                    </View>
                    <View style={styles.atlasCityPlaceContent}>
                      <Text style={styles.atlasCityPlaceName}>
                        {place.title}
                      </Text>
                      <View style={styles.atlasCityPlaceCoordsRow}>
                        <Image
                          source={require('../../assets/i/atlascitytpcaloc.png')}
                        />
                        <Text style={styles.atlasCityPlaceCoordinates}>
                          {place.coordinates}
                        </Text>
                      </View>
                      <Text
                        style={styles.atlasCityPlaceDescription}
                        numberOfLines={3}>
                        {place.description}
                      </Text>
                      <View style={styles.atlasCityPlaceActionsRow}>
                        <TouchableOpacity
                          onPress={() =>
                            atlasCityToggleSavedPlace(place.title)
                          }>
                          <Image
                            source={
                              atlasCitySavedPlaces.includes(place.title)
                                ? require('../../assets/i/atlascitytrfsaved.png')
                                : require('../../assets/i/atlascitytrsave.png')
                            }
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => atlasCitySharePlace(place)}>
                          <Image
                            source={require('../../assets/i/atlascitytrshare.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </Atlascitytrffclayout>
  );
};

const styles = StyleSheet.create({
  atlasCityPlacesRoot: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 20,
    gap: 14,
  },
  atlasCityPlacesTitle: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontFamily: 'Orbitron-Bold',
    fontSize: 18,
  },
  atlasCityPlacesSubtitle: {
    color: '#FFFFFFCC',
    fontSize: 12,

    marginBottom: 8,
    textAlign: 'center',
    marginTop: 15,
  },
  atlasCityPlaceCard: {
    borderRadius: 12,
  },
  atlasCityPlaceInnerBorder: {
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    padding: 12,
  },
  atlasCityPlaceTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  atlasCityPlaceImageWrap: {
    width: 166,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityPlaceImage: {
    width: 166,
    height: 112,
    borderRadius: 12,
  },
  atlasCityPlaceContent: {
    flex: 1,
  },
  atlasCityPlaceName: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  atlasCityPlaceCoordsRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  atlasCityPlaceCoordDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: '#FFA347',
  },
  atlasCityPlaceCoordinates: {
    color: '#FFAE62',
    fontSize: 11,
  },
  atlasCityPlaceDescription: {
    marginTop: 8,
    color: '#CFCFCF',
    fontSize: 10,
  },
  atlasCityPlaceReadMore: {
    marginTop: 4,
    color: '#00BD2C',
    fontSize: 13,
    fontWeight: '700',
  },
  atlasCityPlaceActionsRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  atlasCityPlaceSaveBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#6A6A6A',
    borderWidth: 1,
    backgroundColor: '#2A2A2A',
  },
  atlasCityPlaceShareBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BD2C',
  },
});

export default Atlascitytrffcksplaces;
