// saved
import {atlasCityPlacesData, AtlasCityPlace} from './Atlascitytrffckplacesdata';
import {atlasCityStoryData} from './Atlascitytrffcstories';

import {useCallback, useState} from 'react';
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

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Atlascitytrffclayout from '../Atlascitytrffccopnts/Atlascitytrffclayout';
import {atlasCityFacts} from './Atlascitytrffckhome';

const ATLAS_CITY_SAVED_TIPS_KEY = 'atlascitytrffck_saved_tips_categories';
const ATLAS_CITY_SAVED_STORIES_KEY = 'atlascitytrffck_saved_stories_categories';
const ATLAS_CITY_SAVED_PLACES_KEY = 'atlascitytrffck_saved_places_titles';
const ATLAS_CITY_SAVED_FACTS_KEY = 'atlascitytrffck_saved_facts_ids';

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

const Atlascitytrffcsaved = () => {
  const navigation = useNavigation();
  const [atlasCitySavedPlaces, setAtlasCitySavedPlaces] = useState<string[]>(
    [],
  );
  const [atlasCitySavedTips, setAtlasCitySavedTips] = useState<string[]>([]);
  const [atlasCitySavedStories, setAtlasCitySavedStories] = useState<string[]>(
    [],
  );
  const [atlasCitySavedFactIds, setAtlasCitySavedFactIds] = useState<number[]>(
    [],
  );
  const [
    atlasCityExpandedStoryCategories,
    setAtlasCityExpandedStoryCategories,
  ] = useState<string[]>([]);

  const atlasCityLoadAll = useCallback(async () => {
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
      setAtlasCitySavedTips(Array.isArray(tips) ? tips : []);
      setAtlasCitySavedStories(Array.isArray(stories) ? stories : []);
      setAtlasCitySavedPlaces(Array.isArray(places) ? places : []);
      setAtlasCitySavedFactIds(Array.isArray(facts) ? facts : []);
    } catch {
      setAtlasCitySavedTips([]);
      setAtlasCitySavedStories([]);
      setAtlasCitySavedPlaces([]);
      setAtlasCitySavedFactIds([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      atlasCityLoadAll();
    }, [atlasCityLoadAll]),
  );

  const atlasCityHasSaved =
    atlasCitySavedPlaces.length > 0 ||
    atlasCitySavedTips.length > 0 ||
    atlasCitySavedStories.length > 0 ||
    atlasCitySavedFactIds.length > 0;

  const atlasCityRecommendPlace =
    atlasCityPlacesData.find(p => p.title === 'New York, USA') ??
    atlasCityPlacesData[0];

  const atlasCityPersistPlaces = async (next: string[]) => {
    setAtlasCitySavedPlaces(next);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_PLACES_KEY,
      JSON.stringify(next),
    );
  };

  const atlasCityToggleRecommendSave = async () => {
    const title = atlasCityRecommendPlace.title;
    const next = atlasCitySavedPlaces.includes(title)
      ? atlasCitySavedPlaces.filter(t => t !== title)
      : [...atlasCitySavedPlaces, title];
    await atlasCityPersistPlaces(next);
  };

  const atlasCityRemovePlace = async (title: string) => {
    await atlasCityPersistPlaces(atlasCitySavedPlaces.filter(t => t !== title));
  };

  const atlasCityRemoveTip = async (category: string) => {
    const next = atlasCitySavedTips.filter(c => c !== category);
    setAtlasCitySavedTips(next);
    await AsyncStorage.setItem(ATLAS_CITY_SAVED_TIPS_KEY, JSON.stringify(next));
  };

  const atlasCityRemoveStory = async (category: string) => {
    const next = atlasCitySavedStories.filter(c => c !== category);
    setAtlasCitySavedStories(next);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_STORIES_KEY,
      JSON.stringify(next),
    );
  };

  const atlasCityRemoveFact = async (id: number) => {
    const next = atlasCitySavedFactIds.filter(i => i !== id);
    setAtlasCitySavedFactIds(next);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_FACTS_KEY,
      JSON.stringify(next),
    );
  };

  const atlasCitySharePlace = (place: AtlasCityPlace) => {
    Share.share({
      message: `${place.title}\nCoordinates: ${place.coordinates}\n\n${place.description}`,
    });
  };

  const atlasCityShareText = (title: string, body: string) => {
    Share.share({message: `${title}\n\n${body}`});
  };

  const atlasCityOpenAllPlaces = () =>
    atlasCityNavigateStack(navigation, 'Atlascitytrffcksplaces');

  const atlasCityOpenTipsTab = () => {
    (navigation as {navigate: (n: string, p?: object) => void}).navigate(
      'Atlascitytrffcstories',
      {initialTab: 'tips'},
    );
  };

  const atlasCityOpenStoriesTab = () => {
    (navigation as {navigate: (n: string, p?: object) => void}).navigate(
      'Atlascitytrffcstories',
      {initialTab: 'stories'},
    );
  };

  const atlasCityToggleStoryExpand = (category: string) => {
    setAtlasCityExpandedStoryCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    );
  };

  const atlasCityPlacesResolved = atlasCitySavedPlaces
    .map(title => atlasCityPlacesData.find(p => p.title === title))
    .filter((p): p is AtlasCityPlace => Boolean(p));

  return (
    <>
      <Atlascitytrffclayout>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.atlasCitySavedScroll}>
          <Text style={styles.atlasCitySavedTitle}>My saved</Text>

          {!atlasCityHasSaved ? (
            <>
              <LinearGradient
                colors={['#4C4C4C', '#2D2D2D']}
                style={styles.atlasCityEmptyCard}>
                <View
                  style={{
                    padding: 14,
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.atlasCityEmptyText}>
                    You do not have any saved content, if you like something,
                    click the button:
                  </Text>
                  <View style={styles.atlasCityEmptyHintRow}>
                    <Image
                      source={require('../../assets/i/atlascitytrsave.png')}
                    />
                    <Image
                      source={require('../../assets/i/atlascitytpcmarr.png')}
                    />
                    <Image
                      source={require('../../assets/i/atlascitytrfsaved.png')}
                    />
                  </View>
                  <Text style={styles.atlasCityEmptyFooter}>
                    and it will be saved here.
                  </Text>
                </View>
              </LinearGradient>

              <TouchableOpacity
                style={styles.atlasCityGreenBtn}
                activeOpacity={0.85}
                onPress={atlasCityOpenAllPlaces}>
                <Text style={styles.atlasCityGreenBtnText}>
                  Open all places
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.atlasCityGreenBtn}
                activeOpacity={0.85}
                onPress={atlasCityOpenTipsTab}>
                <Text style={styles.atlasCityGreenBtnText}>Open tips</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.atlasCityGreenBtn}
                activeOpacity={0.85}
                onPress={atlasCityOpenStoriesTab}>
                <Text style={styles.atlasCityGreenBtnText}>Open stories</Text>
              </TouchableOpacity>

              <Text style={styles.atlasCitySectionLabel}>
                We recommend saving:
              </Text>
              <LinearGradient
                colors={['#FFFFFF1C', '#FFFFFF1C']}
                style={styles.atlasCityRecCard}>
                <View style={{padding: 14}}>
                  <View style={styles.atlasCityRecRow}>
                    <Image
                      source={atlasCityRecommendPlace.image}
                      style={styles.atlasCityRecImage}
                    />
                    <View style={styles.atlasCityRecContent}>
                      <Text style={styles.atlasCityRecName}>
                        {atlasCityRecommendPlace.title}
                      </Text>
                      <View style={styles.atlasCityRecCoordsRow}>
                        <Image
                          source={require('../../assets/i/atlascitytpcaloc.png')}
                        />
                        <Text style={styles.atlasCityRecCoords}>
                          {atlasCityRecommendPlace.coordinates}
                        </Text>
                      </View>
                      <Text style={styles.atlasCityRecDesc} numberOfLines={2}>
                        {atlasCityRecommendPlace.description}
                      </Text>
                      <View style={styles.atlasCityRecActions}>
                        <TouchableOpacity
                          style={styles.atlasCityRecSaveBtn}
                          onPress={atlasCityToggleRecommendSave}
                          activeOpacity={0.85}>
                          <Image
                            source={
                              atlasCitySavedPlaces.includes(
                                atlasCityRecommendPlace.title,
                              )
                                ? require('../../assets/i/atlascitytrfsaved.png')
                                : require('../../assets/i/atlascitytrsave.png')
                            }
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.atlasCityRecShareBtn}
                          onPress={() =>
                            atlasCitySharePlace(atlasCityRecommendPlace)
                          }
                          activeOpacity={0.85}>
                          <Image
                            source={require('../../assets/i/atlascitytrshare.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </>
          ) : (
            <>
              {atlasCityPlacesResolved.map(place => (
                <LinearGradient
                  key={place.title}
                  colors={['#FFFFFF1C', '#FFFFFF1C']}
                  style={styles.atlasCitySavedItemCard}>
                  <View style={{padding: 14}}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        atlasCityNavigateStack(
                          navigation,
                          'Atlascitytrffckplacedetail',
                          {
                            placeTitle: place.title,
                          },
                        )
                      }>
                      <View style={styles.atlasCityRecRow}>
                        <Image
                          source={place.image}
                          style={styles.atlasCityRecImage}
                        />
                        <View style={styles.atlasCityRecContent}>
                          <Text style={styles.atlasCityRecName}>
                            {place.title}
                          </Text>
                          <View style={styles.atlasCityRecCoordsRow}>
                            <Image
                              source={require('../../assets/i/atlascitytpcaloc.png')}
                            />
                            <Text style={styles.atlasCityRecCoords}>
                              {place.coordinates}
                            </Text>
                          </View>
                          <Text
                            style={styles.atlasCityRecDesc}
                            numberOfLines={2}>
                            {place.description}
                          </Text>
                          <View style={styles.atlasCitySavedItemActions}>
                            <TouchableOpacity
                              style={styles.atlasCityUnsaveBtn}
                              onPress={() => atlasCityRemovePlace(place.title)}
                              activeOpacity={0.85}>
                              <Image
                                source={require('../../assets/i/atlascitytrfsaved.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.atlasCityRecShareBtn}
                              onPress={() => atlasCitySharePlace(place)}
                              activeOpacity={0.85}>
                              <Image
                                source={require('../../assets/i/atlascitytrshare.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              ))}

              {atlasCitySavedFactIds.map(id => {
                const text = atlasCityFacts[id];
                if (!text) {
                  return null;
                }
                return (
                  <View key={`fact-${id}`}>
                    <LinearGradient
                      colors={['#FFFFFF1C', '#FFFFFF1C']}
                      style={styles.atlasCityFactCard}>
                      <View style={{padding: 14}}>
                        <Text style={styles.atlasCitySectionLabel}>
                          Random fact
                        </Text>
                        <View style={styles.atlasCityFactRow}>
                          <View style={styles.atlasCityFactAccent} />
                          <Text style={styles.atlasCityFactBody}>{text}</Text>
                          <View style={styles.atlasCityFactActions}>
                            <TouchableOpacity
                              style={styles.atlasCityUnsaveBtn}
                              onPress={() => atlasCityRemoveFact(id)}
                              activeOpacity={0.85}>
                              <Image
                                source={require('../../assets/i/atlascitytrfsaved.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.atlasCityRecShareBtn}
                              onPress={() =>
                                atlasCityShareText('Random fact', text)
                              }
                              activeOpacity={0.85}>
                              <Image
                                source={require('../../assets/i/atlascitytrshare.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                );
              })}

              {atlasCitySavedTips.map(category => {
                const item = atlasCityStoryData.find(
                  s => s.category === category,
                );
                const tipText = item?.tips[0] ?? '';
                return (
                  <View key={`tip-${category}`}>
                    <LinearGradient
                      colors={['#FFFFFF1C', '#FFFFFF1C']}
                      style={styles.atlasCityFactCard}>
                      <View style={{padding: 14}}>
                        <View style={styles.atlasCityFactRow}>
                          <View style={styles.atlasCityFactAccent} />
                          <View style={styles.atlasCityTipTextBlock}>
                            <Text style={styles.atlasCityTipCat}>
                              Tips ({category})
                            </Text>
                            <Text style={styles.atlasCityFactBody}>
                              {tipText}
                            </Text>
                          </View>
                          <View style={styles.atlasCityFactActions}>
                            <TouchableOpacity
                              style={styles.atlasCityUnsaveBtn}
                              onPress={() => atlasCityRemoveTip(category)}
                              activeOpacity={0.85}>
                              <Image
                                source={require('../../assets/i/atlascitytrfsaved.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.atlasCityRecShareBtn}
                              onPress={() =>
                                atlasCityShareText(`${category} tip`, tipText)
                              }
                              activeOpacity={0.85}>
                              <Image
                                source={require('../../assets/i/atlascitytrshare.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                );
              })}

              {atlasCitySavedStories.map(category => {
                const item = atlasCityStoryData.find(
                  s => s.category === category,
                );
                if (!item) {
                  return null;
                }
                const expanded =
                  atlasCityExpandedStoryCategories.includes(category);
                return (
                  <View key={`story-${category}`}>
                    <LinearGradient
                      colors={['#FFFFFF1C', '#FFFFFF1C']}
                      style={styles.atlasCityStoryCard}>
                      <View style={{padding: 14}}>
                        <Text style={styles.atlasCitySectionLabel}>
                          Stories
                        </Text>
                        <View style={styles.atlasCityStoryImgPlaceholder}>
                          <Image
                            source={item.storyimage}
                            style={styles.atlasCityStoryImg}
                          />
                        </View>
                        <Text style={styles.atlasCityStoryCat}>
                          {item.category}
                        </Text>
                        <Text
                          style={styles.atlasCityStoryBody}
                          numberOfLines={expanded ? undefined : 4}>
                          {item.story}
                        </Text>
                        <TouchableOpacity
                          onPress={() => atlasCityToggleStoryExpand(category)}
                          activeOpacity={0.85}>
                          <Text style={styles.atlasCityReadMore}>
                            {expanded ? 'Read less' : 'Read more'}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.atlasCitySavedItemActions}>
                          <TouchableOpacity
                            style={styles.atlasCityUnsaveBtn}
                            onPress={() => atlasCityRemoveStory(category)}
                            activeOpacity={0.85}>
                            <Image
                              source={require('../../assets/i/atlascitytrfsaved.png')}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.atlasCityRecShareBtn}
                            onPress={() =>
                              atlasCityShareText(item.category, item.story)
                            }
                            activeOpacity={0.85}>
                            <Image
                              source={require('../../assets/i/atlascitytrshare.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </Atlascitytrffclayout>
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(80, 79, 79, 0.04)', 'rgba(0, 0, 0, 0.84)']}
        style={{
          height: 200,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}></LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  atlasCitySavedScroll: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 160,
    gap: 14,
  },
  atlasCitySavedTitle: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 12,
  },
  atlasCityEmptyCard: {
    borderRadius: 14,
  },
  atlasCityEmptyText: {
    color: '#FFFFFFCC',
    fontSize: 12,
    lineHeight: 18,

    fontWeight: '600',
  },
  atlasCityEmptyHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  atlasCityEmptyArrow: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  atlasCityEmptyFooter: {
    color: '#FFFFFFCC',
    fontSize: 12,
    textAlign: 'center',
  },
  atlasCityGreenBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#00BD2C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  atlasCityGreenBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  atlasCitySectionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 15,
    textTransform: 'uppercase',

    marginBottom: 6,
    textAlign: 'center',
  },
  atlasCityRecCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  atlasCityRecRow: {
    flexDirection: 'row',
    gap: 12,
  },
  atlasCityRecImage: {
    width: 166,
    height: 114,
    borderRadius: 10,
  },
  atlasCityRecContent: {
    flex: 1,
  },
  atlasCityRecName: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  atlasCityRecCoordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  atlasCityRecCoords: {
    color: '#FFAE62',
    fontSize: 10,
  },
  atlasCityRecDesc: {
    color: '#C4C4C4',
    fontSize: 11,
    marginTop: 6,
    lineHeight: 16,
  },
  atlasCityRecActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  atlasCityRecSaveBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666666',
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityRecShareBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#00BD2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCitySavedItemCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#666666',
  },
  atlasCitySavedItemActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    justifyContent: 'flex-start',
  },
  atlasCityUnsaveBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#C62828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityFactCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#666666',
  },
  atlasCityFactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  atlasCityFactAccent: {
    width: 4,
    alignSelf: 'stretch',
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: '#FFA247',
  },
  atlasCityFactBody: {
    flex: 1,
    color: '#E8E8E8',
    fontSize: 13,
    lineHeight: 20,
  },
  atlasCityTipTextBlock: {
    flex: 1,
  },
  atlasCityTipCat: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 15,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  atlasCityFactActions: {
    gap: 8,
  },
  atlasCityStoryCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#666666',
  },
  atlasCityStoryImgPlaceholder: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    marginTop: 5,
    marginBottom: 12,
  },
  atlasCityStoryImg: {
    width: 270,
    height: 100,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  atlasCityStoryCat: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  atlasCityStoryBody: {
    color: '#C4C4C4',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  atlasCityReadMore: {
    marginTop: 8,
    color: '#00BD2C',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default Atlascitytrffcsaved;
