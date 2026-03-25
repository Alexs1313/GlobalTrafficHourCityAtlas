// HOME

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ATLAS_CITY_SAVED_TIPS_KEY = 'atlascitytrffck_saved_tips_categories';
const ATLAS_CITY_SAVED_STORIES_KEY = 'atlascitytrffck_saved_stories_categories';
const ATLAS_CITY_SAVED_PLACES_KEY = 'atlascitytrffck_saved_places_titles';
const ATLAS_CITY_SAVED_FACTS_KEY = 'atlascitytrffck_saved_facts_ids';

export const atlasCityFacts = [
  'In Tokyo, there is a special category of small cars called kei cars. They are designed for narrow streets and dense city traffic, so they have very compact dimensions and economical engines.',
  'In New York, most of the streets of Manhattan are built according to a clear rectangular pattern. Thanks to this structure, it is easier for drivers to navigate the city even without a navigation system.',
  'In Los Angeles, one of the largest freeway networks in the world. Some roads have more than ten lanes of traffic in one direction.',
  'In Singapore, an electronic toll system is used, which automatically charges a fee for entering congested areas. This helps reduce the number of cars in the city center.',
  'In Paris, many streets were designed back in the 19th century during a large-scale reconstruction of the city. It was then that the wide boulevards that are used for car traffic today appeared.',
  'In London, drivers drive on the left side of the road, which can be unusual for tourists. Because of this, renting a car in the city requires some time to adapt.',
  'Toronto has one of the longest city roads in the world, Yonge Street. It stretches for tens of kilometers through different areas of the city.',
  'In Dubai, most major roads are equipped with automatic speed cameras. Thanks to this, drivers are less likely to violate traffic rules.',
  'In Barcelona, many neighborhoods have a square shape with wide intersections. This makes it easier for cars to maneuver in a dense stream.',
  'In Seoul, the traffic light system is often synchronized so that cars can move in waves without frequent stops.',
  'In Tokyo, some parking lots work like automatic car elevators. The car drives onto a platform, after which the system automatically places it in a free space.',
  'In New York, the yellow taxi has become one of the symbols of the city. Thousands of such cars transport passengers through Manhattan every day.',
  'In Los Angeles, many people spend more than 90 hours a year in traffic jams. Because of this, cars there are often equipped with comfortable interiors.',
  'In Singapore, you need to get a special certificate to buy a car. Its cost sometimes exceeds the price of the car itself.',
  'In Paris, more than ten roads converge at the same time on some squares. Because of this, roundabouts can look very complicated.',
  'In London, there is a special toll for entering the central part of the city. This helps reduce the number of cars in the busiest areas.',
  'In Toronto, many roads run along Lake Ontario. Thanks to this, some routes offer beautiful views of the water.',
  'In Dubai, large SUVs are very popular. They are well suited for both city roads and trips to the desert.',
  'In Barcelona, many people use compact cars. This is due to the fact that the old streets of the city are quite narrow.',
  'In Seoul, some traffic intersections are on several levels. This allows the flow of cars to be distributed between different roads.',
  'In Chicago, some roads run below the city level. Such routes are used for technical transport and delivery.',
  'In Berlin, there are many bicycle lanes next to the highways. This helps to reduce the pressure on the transportation system.',
  'In Tokyo, most drivers have a very relaxed driving style. This makes even heavy traffic seem more organized.',
  'In New York, some intersections can accommodate hundreds of cars at a time. The flow is regulated by a complex system of traffic lights.',
  'In Los Angeles, many of the interchanges are in the form of large traffic hubs. They allow cars to quickly switch between different highways.',
];

const atlasCityRecommendedPlaces = [
  {
    title: 'Tokyo, Japan',
    coordinates: '35.6762, 139.6503',
    image: require('../../assets/i/atlascitytplace1.png'),
    description:
      'Tokyo traffic is dense but highly organized, with compact cars and structured road levels.',
  },
  {
    title: 'New York, USA',
    coordinates: '40.7128, -74.0060',
    image: require('../../assets/i/atlascitytplace2.png'),
    description:
      'New York has nonstop urban motion where taxis, buses, and cars share a tight street grid.',
  },
];

const Atlascitytrffckhome = () => {
  const navigation = useNavigation();
  const [atlasCityNow, setAtlasCityNow] = useState(new Date());
  const [atlasCityFactIdx, setAtlasCityFactIdx] = useState(0);
  const [atlasCitySavedFacts, setAtlasCitySavedFacts] = useState<number[]>([]);
  const [atlasCitySavedPlacesTitles, setAtlasCitySavedPlacesTitles] = useState<
    string[]
  >([]);
  const [atlasCitySavedCount, setAtlasCitySavedCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setAtlasCityNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const atlasCityLoadSavedCounter = useCallback(async () => {
    try {
      const [rawTips, rawStories, rawPlaces, rawFacts] = await Promise.all([
        AsyncStorage.getItem(ATLAS_CITY_SAVED_TIPS_KEY),
        AsyncStorage.getItem(ATLAS_CITY_SAVED_STORIES_KEY),
        AsyncStorage.getItem(ATLAS_CITY_SAVED_PLACES_KEY),
        AsyncStorage.getItem(ATLAS_CITY_SAVED_FACTS_KEY),
      ]);

      const tips = rawTips ? (JSON.parse(rawTips) as string[]) : [];
      const stories = rawStories ? (JSON.parse(rawStories) as string[]) : [];
      const places = rawPlaces ? (JSON.parse(rawPlaces) as string[]) : [];
      const facts = rawFacts ? (JSON.parse(rawFacts) as number[]) : [];

      const safeTips = Array.isArray(tips) ? tips : [];
      const safeStories = Array.isArray(stories) ? stories : [];
      const safePlaces = Array.isArray(places) ? places : [];
      const safeFacts = Array.isArray(facts) ? facts : [];

      setAtlasCitySavedFacts(safeFacts);
      setAtlasCitySavedPlacesTitles(safePlaces);
      setAtlasCitySavedCount(
        safeTips.length +
          safeStories.length +
          safePlaces.length +
          safeFacts.length,
      );
    } catch (error) {
      setAtlasCitySavedFacts([]);
      setAtlasCitySavedPlacesTitles([]);
      setAtlasCitySavedCount(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      atlasCityLoadSavedCounter();
    }, [atlasCityLoadSavedCounter]),
  );

  const atlasCityDate = useMemo(
    () =>
      atlasCityNow.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    [atlasCityNow],
  );

  const atlasCityTime = useMemo(
    () =>
      atlasCityNow.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    [atlasCityNow],
  );

  const atlasCityCurrentFact = atlasCityFacts[atlasCityFactIdx];

  const atlasCityNextFact = () => {
    setAtlasCityFactIdx(prev => {
      const next = Math.floor(Math.random() * atlasCityFacts.length);
      return next === prev ? (prev + 1) % atlasCityFacts.length : next;
    });
  };

  const atlasCityToggleFactSave = async () => {
    const nextSaved = atlasCitySavedFacts.includes(atlasCityFactIdx)
      ? atlasCitySavedFacts.filter(id => id !== atlasCityFactIdx)
      : [...atlasCitySavedFacts, atlasCityFactIdx];

    setAtlasCitySavedFacts(nextSaved);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_FACTS_KEY,
      JSON.stringify(nextSaved),
    );
    await atlasCityLoadSavedCounter();
  };

  const atlasCityShareFact = async () => {
    await Share.share({
      message: `${atlasCityCurrentFact}`,
    });
  };

  const atlasCitySharePlace = async (title: string, description: string) => {
    await Share.share({
      message: `${title}\n\n${description}`,
    });
  };

  const atlasCityTogglePlaceSave = async (title: string) => {
    const nextSaved = atlasCitySavedPlacesTitles.includes(title)
      ? atlasCitySavedPlacesTitles.filter(t => t !== title)
      : [...atlasCitySavedPlacesTitles, title];
    setAtlasCitySavedPlacesTitles(nextSaved);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_PLACES_KEY,
      JSON.stringify(nextSaved),
    );
    await atlasCityLoadSavedCounter();
  };

  const atlasCityOpenAllPlaces = () => {
    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.navigate('Atlascitytrffcksplaces' as never);
      return;
    }
    navigation.navigate('Atlascitytrffcksplaces' as never);
  };

  return (
    <ImageBackground
      source={require('../../assets/i/atlascitytrffcthomebgg.png')}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.atlasCityHomeRoot}>
          <View style={styles.atlasCityHomeBadgesRow}>
            <View style={styles.atlasCityBadge}>
              <Image source={require('../../assets/i/atlascitytpcalln.png')} />
              <Text style={styles.atlasCityBadgeText}>{atlasCityDate}</Text>
            </View>
            <View style={styles.atlasCityBadge}>
              <Image source={require('../../assets/i/atlascitytpltmr.png')} />
              <Text style={styles.atlasCityBadgeText}>{atlasCityTime}</Text>
            </View>
            <View style={styles.atlasCityBadge}>
              <Image source={require('../../assets/i/atlascitytplsvd.png')} />
              <Text style={styles.atlasCityBadgeText}>
                {atlasCitySavedCount > 0
                  ? `${atlasCitySavedCount} saves`
                  : 'Not saved'}
              </Text>
            </View>
          </View>

          <LinearGradient
            colors={['#4C4C4C', '#2D2D2D']}
            style={styles.atlasCityFactCard}>
            <View style={{padding: 14}}>
              <Text style={styles.atlasCitySectionTitle}>Random facts</Text>
              <View style={styles.atlasCityFactInner}>
                <View style={styles.atlasCityFactAccent} />
                <Text style={styles.atlasCityFactText}>
                  {atlasCityCurrentFact}
                </Text>
                <View style={styles.atlasCityFactActions}>
                  <TouchableOpacity onPress={atlasCityToggleFactSave}>
                    <Image
                      source={
                        atlasCitySavedFacts.includes(atlasCityFactIdx)
                          ? require('../../assets/i/atlascitytrfsaved.png')
                          : require('../../assets/i/atlascitytrsave.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={atlasCityShareFact}>
                    <Image
                      source={require('../../assets/i/atlascitytrshare.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.atlasCityNewFactBtn}
                onPress={atlasCityNextFact}
                activeOpacity={0.85}>
                <Text style={styles.atlasCityNewFactText}>New fact</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <Text
            style={[
              styles.atlasCitySectionTitle,
              {marginTop: 12, marginBottom: 2},
            ]}>
            Recomended place
          </Text>
          <LinearGradient
            colors={['#4C4C4C', '#2D2D2D']}
            style={styles.atlasCityPlacesCard}>
            <View style={{padding: 14}}>
              <View style={styles.atlasCityPlaceRow}>
                {atlasCityRecommendedPlaces.map(place => (
                  <View key={place.title} style={styles.atlasCityMiniPlaceCard}>
                    <Image
                      source={place.image}
                      style={styles.atlasCityMiniPlaceImage}
                    />
                    <Text style={styles.atlasCityMiniPlaceTitle}>
                      {place.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <Image
                        source={require('../../assets/i/atlascitytpcaloc.png')}
                      />
                      <Text style={styles.atlasCityMiniPlaceCoords}>
                        {place.coordinates}
                      </Text>
                    </View>
                    <Text
                      style={styles.atlasCityMiniPlaceDescription}
                      numberOfLines={3}>
                      {place.description}
                    </Text>
                    <View style={styles.atlasCityMiniActions}>
                      <TouchableOpacity
                        onPress={() =>
                          atlasCitySharePlace(place.title, place.description)
                        }>
                        <Image
                          source={require('../../assets/i/atlascitytrshare.png')}
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => atlasCityTogglePlaceSave(place.title)}>
                        <Image
                          source={
                            atlasCitySavedPlacesTitles.includes(place.title)
                              ? require('../../assets/i/atlascitytrfsaved.png')
                              : require('../../assets/i/atlascitytrsave.png')
                          }
                          style={{
                            width: 25,
                            height: 25,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.atlasCityOpenAllBtn}
                onPress={atlasCityOpenAllPlaces}
                activeOpacity={0.85}>
                <Text style={styles.atlasCityOpenAllText}>Open all</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  atlasCityHomeRoot: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 150,
    gap: 14,
  },
  atlasCityHomeBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  atlasCityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    paddingHorizontal: 10,
    minHeight: 40,
    flex: 1,
    justifyContent: 'center',
  },
  atlasCityBadgeDot: {
    width: 14,
    height: 14,
    borderRadius: 99,
    backgroundColor: '#E6FF2A',
  },
  atlasCityBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  atlasCityFactCard: {
    borderRadius: 12,
  },
  atlasCitySectionTitle: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
    fontSize: 18,
    marginBottom: 11,
  },
  atlasCityFactInner: {
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    minHeight: 102,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  atlasCityFactAccent: {
    width: 3,
    borderRadius: 10,
    backgroundColor: '#FFA247',
    height: 50,
  },
  atlasCityFactText: {
    color: '#DFDFDF',
    fontSize: 11,
    flex: 1,
  },
  atlasCityFactActions: {
    gap: 8,
  },
  atlasCityActionBtnDark: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666666',
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityActionBtnGreen: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#00BD2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  atlasCityNewFactBtn: {
    marginTop: 14,
    width: 140,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#00BD2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityNewFactText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 15,
  },
  atlasCityPlacesCard: {
    borderRadius: 12,
  },
  atlasCityPlaceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  atlasCityMiniPlaceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    padding: 10,
  },
  atlasCityMiniPlaceImage: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  atlasCityMiniPlaceTitle: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  atlasCityMiniPlaceCoords: {
    marginTop: 4,
    color: '#FFAE62',
    fontSize: 10,
  },
  atlasCityMiniPlaceDescription: {
    marginTop: 6,
    color: '#BDBDBD',
    fontSize: 9,
  },
  atlasCityMiniActions: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 8,
  },
  atlasCityOpenAllBtn: {
    marginTop: 14,
    width: 156,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#00BD2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityOpenAllText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default Atlascitytrffckhome;
