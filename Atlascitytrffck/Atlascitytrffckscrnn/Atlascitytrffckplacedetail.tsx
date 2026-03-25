// PLACE DETAIL

import Atlascitytrffclayout from '../Atlascitytrffccopnts/Atlascitytrffclayout';

import {atlasCityPlacesData} from './Atlascitytrffckplacesdata';
import {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';

const ATLAS_CITY_SAVED_PLACES_KEY = 'atlascitytrffck_saved_places_titles';

const atlasCityParseCoords = (
  coordinates: string,
): {latitude: number; longitude: number} | null => {
  const parts = coordinates.split(',').map(s => parseFloat(s.trim()));
  if (parts.length !== 2 || parts.some(n => Number.isNaN(n))) {
    return null;
  }
  return {latitude: parts[0], longitude: parts[1]};
};

const Atlascitytrffckplacedetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const placeTitle = (route.params as {placeTitle?: string} | undefined)
    ?.placeTitle;

  const place = atlasCityPlacesData.find(p => p.title === placeTitle);
  const [atlasCityExpanded, setAtlasCityExpanded] = useState(false);
  const [atlasCityMapOpen, setAtlasCityMapOpen] = useState(false);
  const [atlasCitySavedPlaces, setAtlasCitySavedPlaces] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (!placeTitle || !place) {
      navigation.goBack();
    }
  }, [place, placeTitle, navigation]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(ATLAS_CITY_SAVED_PLACES_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as string[];
          if (Array.isArray(parsed)) {
            setAtlasCitySavedPlaces(parsed);
          }
        }
      } catch {
        setAtlasCitySavedPlaces([]);
      }
    };
    load();
  }, []);

  if (!place) {
    return null;
  }

  const coords = atlasCityParseCoords(place.coordinates);
  const atlasCityToggleSaved = async () => {
    const next = atlasCitySavedPlaces.includes(place.title)
      ? atlasCitySavedPlaces.filter(t => t !== place.title)
      : [...atlasCitySavedPlaces, place.title];
    setAtlasCitySavedPlaces(next);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_PLACES_KEY,
      JSON.stringify(next),
    );
  };

  const atlasCityShare = async () => {
    await Share.share({
      message: `${place.title}\nCoordinates: ${place.coordinates}\n\n${place.description}`,
    });
  };

  return (
    <Atlascitytrffclayout>
      <View style={styles.atlasCityDetailRoot}>
        <TouchableOpacity
          style={styles.atlasCityDetailHeader}
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/i/atlascitytpcaback.png')} />
          <Text style={styles.atlasCityDetailHeaderTitle}>{place.title}</Text>
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.atlasCityDetailScroll}>
          <LinearGradient
            colors={['#FFFFFF1C', '#FFFFFF1C']}
            style={styles.atlasCityDetailCard}>
            <View style={{padding: 16}}>
              <Image
                source={place.image}
                style={styles.atlasCityDetailHero}
                resizeMode="cover"
              />
              <Text style={styles.atlasCityDetailTitle}>{place.title}</Text>
              <View style={styles.atlasCityDetailCoordsRow}>
                <Image
                  source={require('../../assets/i/atlascitytpcaloc.png')}
                />
                <Text style={styles.atlasCityDetailCoords}>
                  {place.coordinates}
                </Text>
              </View>
              <Text
                style={styles.atlasCityDetailBody}
                numberOfLines={atlasCityExpanded ? undefined : 8}>
                {place.description}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setAtlasCityExpanded(v => !v)}>
                <Text style={styles.atlasCityDetailReadMore}>
                  {atlasCityExpanded ? 'Read less' : 'Read more'}
                </Text>
              </TouchableOpacity>

              {atlasCityMapOpen && coords ? (
                <View style={styles.atlasCityMapWrap}>
                  <MapView
                    userInterfaceStyle="dark"
                    style={styles.atlasCityMap}
                    mapType="hybrid"
                    initialRegion={{
                      latitude: coords.latitude,
                      longitude: coords.longitude,
                      latitudeDelta: 0.12,
                      longitudeDelta: 0.12,
                    }}
                    scrollEnabled
                    zoomEnabled>
                    <Marker
                      coordinate={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                      }}>
                      <Image
                        source={require('../../assets/i/atlascitytpcmappin.png')}
                      />
                    </Marker>
                  </MapView>
                </View>
              ) : null}

              {atlasCityMapOpen && coords ? (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setAtlasCityMapOpen(false)}>
                  <LinearGradient
                    colors={['rgba(255, 98, 101, 1)', '#FF0005', '#990003']}
                    style={styles.atlasCityCloseMapBtnRow}>
                    <Image
                      source={require('../../assets/i/atlascitytpcmacls.png')}
                    />
                    <Text style={styles.atlasCityCloseMapText}>Close map</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <View style={styles.atlasCityDetailActions}>
                  <TouchableOpacity
                    style={styles.atlasCityDetailActionDark}
                    activeOpacity={0.85}
                    onPress={() => coords && setAtlasCityMapOpen(true)}>
                    <Image
                      source={require('../../assets/i/atlascitytpcmap.png')}
                      style={styles.atlasCityDetailActionIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.atlasCityDetailActionDark}
                    activeOpacity={0.85}
                    onPress={atlasCityToggleSaved}>
                    <Image
                      source={
                        atlasCitySavedPlaces.includes(place.title)
                          ? require('../../assets/i/atlascitytrfsaved.png')
                          : require('../../assets/i/atlascitytrsave.png')
                      }
                      style={styles.atlasCityDetailActionIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={atlasCityShare}>
                    <Image
                      source={require('../../assets/i/atlascitytrshare.png')}
                      style={styles.atlasCityDetailActionIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    </Atlascitytrffclayout>
  );
};

const styles = StyleSheet.create({
  atlasCityDetailRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 24,
  },
  atlasCityDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  atlasCityDetailHeaderTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  atlasCityDetailScroll: {
    paddingBottom: 20,
  },
  atlasCityDetailCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#666666',
    marginTop: 20,
    overflow: 'hidden',
  },
  atlasCityDetailHero: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: '#1C1C1C',
  },
  atlasCityDetailTitle: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  atlasCityDetailCoordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  atlasCityDetailCoords: {
    color: '#FFAE62',
    fontSize: 10,
  },
  atlasCityDetailBody: {
    marginTop: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  atlasCityDetailReadMore: {
    marginTop: 8,
    color: '#00BD2C',
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  atlasCityMapWrap: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#555',
  },
  atlasCityMap: {
    width: '100%',
    height: 220,
  },
  atlasCityCloseMapBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 40,
    marginTop: 28,
    borderRadius: 12,
    width: 102,
  },
  atlasCityCloseMapIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  atlasCityCloseMapText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 10,
  },
  atlasCityDetailActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
    backgroundColor: 'rgba(63, 63, 63, 1)',
    padding: 4,
    borderRadius: 12,
    width: 112,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityDetailActionDark: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  atlasCityDetailActionIcon: {
    width: 24,
    height: 24,
  },
  atlasCityDetailActionGreen: {
    width: 24,
    height: 24,
    backgroundColor: '#00BD2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Atlascitytrffckplacedetail;
