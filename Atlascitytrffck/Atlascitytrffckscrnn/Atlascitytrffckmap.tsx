// MAP

import {atlasCityPlacesData, AtlasCityPlace} from './Atlascitytrffckplacesdata';

import Orientation from 'react-native-orientation-locker';

import {useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import Atlascitytrffclayout from '../Atlascitytrffccopnts/Atlascitytrffclayout';

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

const atlasCityMapRegion = () => {
  const pts = atlasCityPlacesData
    .map(p => atlasCityParseCoords(p.coordinates))
    .filter((c): c is {latitude: number; longitude: number} => Boolean(c));
  if (pts.length === 0) {
    return {
      latitude: 20,
      longitude: 0,
      latitudeDelta: 60,
      longitudeDelta: 120,
    };
  }
  let minLat = 90;
  let maxLat = -90;
  let minLng = 180;
  let maxLng = -180;
  for (const p of pts) {
    minLat = Math.min(minLat, p.latitude);
    maxLat = Math.max(maxLat, p.latitude);
    minLng = Math.min(minLng, p.longitude);
    maxLng = Math.max(maxLng, p.longitude);
  }
  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;
  let latD = (maxLat - minLat) * 1.45 || 8;
  let lngD = (maxLng - minLng) * 1.45 || 8;
  latD = Math.min(Math.max(latD, 8), 130);
  lngD = Math.min(Math.max(lngD, 8), 170);
  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: latD,
    longitudeDelta: lngD,
  };
};

const atlasCityNavigateStack = (
  nav: {getParent?: () => unknown},
  name: string,
  params?: Record<string, unknown>,
) => {
  const stackNav = (nav.getParent?.() ?? nav) as {
    navigate: (screen: string, p?: Record<string, unknown>) => void;
  };
  stackNav.navigate(name, params);
};

const mapHeight = Math.min(Dimensions.get('window').height * 0.48, 420);

const Atlascitytrffckmap = () => {
  const navigation = useNavigation();
  const [atlasCitySelectedPlace, setAtlasCitySelectedPlace] =
    useState<AtlasCityPlace | null>(null);
  const [atlasCitySavedPlaces, setAtlasCitySavedPlaces] = useState<string[]>(
    [],
  );

  const atlasCityTokyoPreview =
    atlasCityPlacesData.find(p => p.title === 'Tokyo, Japan') ??
    atlasCityPlacesData[0];

  const atlasCityRegion = useMemo(() => atlasCityMapRegion(), []);

  const atlasCityLoadSaved = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(ATLAS_CITY_SAVED_PLACES_KEY);
      if (!raw) {
        setAtlasCitySavedPlaces([]);
        return;
      }
      const parsed = JSON.parse(raw) as string[];
      setAtlasCitySavedPlaces(Array.isArray(parsed) ? parsed : []);
    } catch {
      setAtlasCitySavedPlaces([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      atlasCityLoadSaved();
    }, [atlasCityLoadSaved]),
  );

  const atlasCityPersistSaved = async (next: string[]) => {
    setAtlasCitySavedPlaces(next);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_PLACES_KEY,
      JSON.stringify(next),
    );
  };

  const atlasCityToggleSave = async (place: AtlasCityPlace) => {
    const next = atlasCitySavedPlaces.includes(place.title)
      ? atlasCitySavedPlaces.filter(t => t !== place.title)
      : [...atlasCitySavedPlaces, place.title];
    await atlasCityPersistSaved(next);
  };

  const atlasCitySharePlace = (place: AtlasCityPlace) => {
    Share.share({
      message: `${place.title}\nCoordinates: ${place.coordinates}\n\n${place.description}`,
    });
  };

  return (
    <Atlascitytrffclayout>
      <View style={styles.atlasCityMapScreen}>
        <Text style={styles.atlasCityMapTitle}>Map</Text>

        <LinearGradient
          colors={['#4C4C4C', '#2D2D2D']}
          style={styles.atlasCityHintCard}>
          <View style={{padding: 14}}>
            <Text style={styles.atlasCityHintTitle}>Click on the pins:</Text>
            <View style={styles.atlasCityHintRow}>
              <View style={styles.atlasCityPinDemo}>
                <Image source={require('../../assets/i/atlasmappin.png')} />
              </View>
              <Image source={require('../../assets/i/atlascitytarrrmap.png')} />
              <View style={styles.atlasCityMiniCard}>
                <Image
                  source={atlasCityTokyoPreview.image}
                  style={styles.atlasCityMiniImg}
                />
                <Text style={styles.atlasCityMiniTitle} numberOfLines={1}>
                  {atlasCityTokyoPreview.title}
                </Text>
                <Text style={styles.atlasCityMiniCoords} numberOfLines={1}>
                  {atlasCityTokyoPreview.coordinates}
                </Text>
                <View style={styles.atlasCityMiniActions}>
                  <View style={styles.atlasCityMiniShare}>
                    <Image
                      source={require('../../assets/i/atlascitytrshare.png')}
                      style={styles.atlasCityMiniIcon}
                    />
                  </View>
                  <View style={styles.atlasCityMiniSave}>
                    <Image
                      source={require('../../assets/i/atlascitytrsave.png')}
                      style={styles.atlasCityMiniIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.atlasCityHintFooter}>
              and a place will open up for you.
            </Text>
          </View>
        </LinearGradient>

        <View style={[styles.atlasCityMapWrap, {height: mapHeight}]}>
          <MapView
            style={StyleSheet.absoluteFill}
            userInterfaceStyle="dark"
            initialRegion={atlasCityRegion}
            mapType="hybrid"
            scrollEnabled
            zoomEnabled>
            {atlasCityPlacesData.map(place => {
              const coord = atlasCityParseCoords(place.coordinates);
              if (!coord) {
                return null;
              }
              return (
                <Marker
                  key={place.title}
                  coordinate={coord}
                  onPress={() => setAtlasCitySelectedPlace(place)}>
                  <Image source={require('../../assets/i/atlasmappin.png')} />
                </Marker>
              );
            })}
          </MapView>

          {atlasCitySelectedPlace ? (
            <View style={styles.atlasCityOverlayCard} pointerEvents="box-none">
              <LinearGradient
                colors={['#3F3F3F', '#2A2A2A']}
                style={styles.atlasCityOverlayInner}>
                <View style={{padding: 14}}>
                  <TouchableOpacity
                    style={styles.atlasCityOverlayClose}
                    hitSlop={12}
                    onPress={() => setAtlasCitySelectedPlace(null)}
                    activeOpacity={0.8}>
                    <Image
                      source={require('../../assets/i/atlascitytarrclosse.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      atlasCityNavigateStack(
                        navigation,
                        'Atlascitytrffckplacedetail',
                        {
                          placeTitle: atlasCitySelectedPlace.title,
                        },
                      )
                    }>
                    <View style={styles.atlasCityOverlayRow}>
                      <Image
                        source={atlasCitySelectedPlace.image}
                        style={styles.atlasCityOverlayImg}
                      />
                      <View style={styles.atlasCityOverlayTextCol}>
                        <Text
                          style={styles.atlasCityOverlayName}
                          numberOfLines={2}>
                          {atlasCitySelectedPlace.title}
                        </Text>
                        <View style={styles.atlasCityOverlayCoordsRow}>
                          <Image
                            source={require('../../assets/i/atlascitytpcaloc.png')}
                          />
                          <Text style={styles.atlasCityOverlayCoords}>
                            {atlasCitySelectedPlace.coordinates}
                          </Text>
                        </View>
                        <Text
                          style={styles.atlasCityOverlayDesc}
                          numberOfLines={2}>
                          {atlasCitySelectedPlace.description}
                        </Text>
                        <View style={styles.atlasCityOverlayActions}>
                          <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() =>
                              atlasCityToggleSave(atlasCitySelectedPlace)
                            }>
                            <Image
                              source={
                                atlasCitySavedPlaces.includes(
                                  atlasCitySelectedPlace.title,
                                )
                                  ? require('../../assets/i/atlascitytrfsaved.png')
                                  : require('../../assets/i/atlascitytrsave.png')
                              }
                              style={styles.atlasCityOverlayActionIcon}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() =>
                              atlasCitySharePlace(atlasCitySelectedPlace)
                            }>
                            <Image
                              source={require('../../assets/i/atlascitytrshare.png')}
                              style={styles.atlasCityOverlayActionIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ) : null}
        </View>
      </View>
    </Atlascitytrffclayout>
  );
};

const styles = StyleSheet.create({
  atlasCityMapScreen: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 150,
  },
  atlasCityMapTitle: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 24,
  },
  atlasCityHintCard: {
    borderRadius: 14,

    marginBottom: 14,
  },
  atlasCityHintTitle: {
    color: '#FFFFFFCC',
    fontSize: 12,
    fontWeight: '600',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  atlasCityHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  atlasCityPinDemo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityPinDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD60A',
    borderWidth: 3,
    borderColor: '#FFF8CC',
  },
  atlasCityHintArrow: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },
  atlasCityMiniCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888888',
    padding: 8,
    width: 109,
  },
  atlasCityMiniImg: {
    width: '100%',
    height: 56,
    borderRadius: 6,
    marginBottom: 6,
  },
  atlasCityMiniTitle: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 9,
    textTransform: 'uppercase',
  },
  atlasCityMiniCoords: {
    color: '#FFAE62',
    fontSize: 5,
    marginTop: 2,
  },
  atlasCityMiniActions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  atlasCityMiniShare: {},
  atlasCityMiniSave: {},
  atlasCityMiniIcon: {
    width: 14,
    height: 14,
  },
  atlasCityHintFooter: {
    color: '#FFFFFFCC',
    fontSize: 12,
    marginTop: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '60%',
  },
  atlasCityMapWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#555555',
    position: 'relative',
  },
  atlasCityMarkerOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 214, 10, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityMarkerInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFD60A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  atlasCityOverlayCard: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 8,
  },
  atlasCityOverlayInner: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#666666',
  },
  atlasCityOverlayClose: {
    position: 'absolute',
    top: 4,
    right: 3,
    zIndex: 2,
    padding: 4,
  },
  atlasCityOverlayCloseText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  atlasCityOverlayRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  atlasCityOverlayImg: {
    width: 166,
    height: 112,
    borderRadius: 12,
  },
  atlasCityOverlayTextCol: {
    flex: 1,
  },
  atlasCityOverlayName: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  atlasCityOverlayCoordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  atlasCityOverlayCoords: {
    color: '#FFAE62',
    fontSize: 10,
  },
  atlasCityOverlayDesc: {
    color: '#C8C8C8',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 6,
  },
  atlasCityOverlayActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    marginTop: 10,
  },

  atlasCityOverlayActionIcon: {
    width: 32,
    height: 32,
  },
});

export default Atlascitytrffckmap;
