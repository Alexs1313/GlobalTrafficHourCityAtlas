// stories

import AsyncStorage from '@react-native-async-storage/async-storage';

import Atlascitytrffclayout from '../Atlascitytrffccopnts/Atlascitytrffclayout';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type AtlasCityStoryItem = {
  category: string;
  image: number;
  storyimage: number;
  story: string;
  tips: string[];
};

export const atlasCityStoryData: AtlasCityStoryItem[] = [
  {
    category: 'Sedan',
    image: require('../../assets/i/atlascitytrtip1.png'),
    storyimage: require('../../assets/i/atlascitytstrs1.png'),
    story:
      "In big cities, the sedan has long been considered the smartest compromise between comfort and handling. When traffic gets heavy, drivers appreciate the car's stability on the road, predictable cornering, and ample interior space. This is where the sedan really shines. Four doors make it practical for everyday commutes, and a separate trunk lets you carry things without cluttering up the interior. In megacities where people are constantly moving between offices, neighborhoods, and meetings, the sedan is often a car that's equally suited to morning traffic and evening commutes across the city. Thanks to its longer wheelbase, it handles well on fast highways, but at the same time remains maneuverable enough for narrow city streets. That's why sedans are so common in financial districts, near business centers, and on central avenues, where the car should look restrained but confident.",
    tips: [
      'In dense city traffic, it is best to keep a sedan at a medium distance from other cars.',
      'When parking in a metropolis, it is worth using a camera or sensors because a separate trunk can reduce rear clearance visibility.',
      'A sedan is well suited for long city avenues and expressways, so choose routes with smoother traffic.',
      'Always check the condition of the suspension because comfort in traffic depends on good shock absorption.',
      'In the center of large cities, it is better to choose underground or multi-level parking lots with standard spaces.',
    ],
  },
  {
    category: 'Hatchback',
    image: require('../../assets/i/atlascitytrtip2.png'),
    storyimage: require('../../assets/i/atlascitytstrs2.png'),
    story:
      'The hatchback was born as a response to one simple problem of big cities - the lack of space. In the old areas of megacities, streets are often narrow, parking spaces are small, and traffic density is very high. This is where the compact body of a hatchback becomes a great advantage. The short rear overhang makes it easy to maneuver between cars, quickly find a parking space and confidently move in narrow neighborhoods. But the main feature of a hatchback is its practicality. The tailgate opens together with the rear window, and this makes access to the luggage compartment much more convenient. In everyday city life, this means that you can easily load shopping, bags or small luggage. In many megacities, hatchbacks have become a symbol of mobility - they are compact, economical and quickly respond to changes in traffic. In a dense stream, where every second and every meter of the road is important, such a car often feels even more confident than larger cars.',
    tips: [
      'A hatchback is ideal for narrow streets, so use its maneuverability to change lanes in slow traffic.',
      'Thanks to the short body, the hatchback is easier to parallel park in tight places.',
      'When transporting things, fold the rear seats to significantly increase usable space.',
      'In old areas of megacities, a hatchback can pass through narrow alleys where large cars struggle.',
      'In heavy traffic, maintain a smooth driving style because a light car reacts faster to steering inputs.',
    ],
  },
  {
    category: 'SUV',
    image: require('../../assets/i/atlascitytrtip6.png'),
    storyimage: require('../../assets/i/atlascitytstrs6.png'),
    story:
      'SUVs have appeared in cities relatively recently, but they have quickly become one of the most noticeable cars on the road. In megacities, where roads can change dramatically from wide avenues to rough terrain, high ground clearance and a strong suspension are a big advantage. The driver of an SUV sits higher than in most passenger cars, so there is better visibility in heavy traffic. This helps assess the situation faster and react confidently to changes in traffic flow. In addition, the large interior makes SUVs convenient for long trips through the city or for trips outside its borders. In many megacities, such cars have become popular among people who value safety and space. In heavy traffic, an SUV looks massive and confident, but modern models remain maneuverable enough to move in difficult urban conditions.',
    tips: [
      'Use the high seating position of an SUV for a better view of the road in dense traffic.',
      'Due to larger dimensions, leave more space when turning at narrow intersections.',
      'An SUV handles road irregularities well, so it is convenient on roads with potholes or cobblestones.',
      'Park carefully in underground parking lots because tall cars can face height restrictions.',
      "At large traffic junctions, maintain smooth speed to use the car's stability.",
    ],
  },
  {
    category: 'Crossover',
    image: require('../../assets/i/atlascitytrtip4.png'),
    storyimage: require('../../assets/i/atlascitytstrs4.png'),
    story:
      'A crossover is often called a car that combines the best qualities of several classes. It looks like an SUV, but is built on a passenger-car platform, so it handles more smoothly and comfortably. This has made crossovers extremely popular in megacities. They are compact enough for dense city traffic, but still provide a raised seating position and good visibility. In a big city, this means that the driver can assess road situations faster and feel more confident in the flow of cars. Crossovers often have a spacious trunk and a versatile interior, which makes them convenient for everyday trips. In city traffic, such a car easily adapts to different conditions: from narrow streets to wide traffic junctions. That is why crossovers can now be seen in almost every major city.',
    tips: [
      'A crossover combines compactness and high seating, so it is well suited for everyday city traffic.',
      'Use the rear-view camera while parking because a high rear end can limit visibility.',
      'In difficult traffic, maintain a steady pace because the crossover responds well to smooth acceleration.',
      'Thanks to a versatile interior, the crossover is convenient for luggage, shopping, or sports equipment.',
      'In large cities, crossovers are practical for mixed routes: city center plus expressways.',
    ],
  },
  {
    category: 'Coupe',
    image: require('../../assets/i/atlascitytrtip5.png'),
    storyimage: require('../../assets/i/atlascitytstrs5.png'),
    story:
      'A coupe has always been a car that stands out in traffic. Two doors, a sporty silhouette and a low roofline create an image focused on style and driving emotion. In megacities, coupes are often chosen by those who love driving and want to enjoy daily commutes. Thanks to compact proportions, these cars can be very maneuverable, which helps with lane changes and difficult city intersections. The sporty suspension and precise steering make coupes pleasant even in dense traffic. In big cities, such cars are often seen in the evening, when roads become a little freer and drivers can enjoy the process more. A coupe is not just transport, but a way to make trips through the city more emotional.',
    tips: [
      'A coupe has a sporty seating position, so keep more distance to improve forward visibility in traffic.',
      'Because of long doors, park where there is enough room to open them.',
      'A coupe often has a stiffer suspension, so drive carefully on uneven city roads.',
      "Use the car's maneuverability for smooth lane changes on large avenues.",
      'At night, a coupe is especially comfortable on wide roads where traffic flow is more even.',
    ],
  },
  {
    category: 'Convertible (Cabriolet)',
    image: require('../../assets/i/atlascitytrtip3.png'),
    storyimage: require('../../assets/i/atlascitytstrs3.png'),
    story:
      'A convertible is a car that turns a regular city ride into a small journey. Its main feature is a foldable roof that opens the interior to air and light. In big cities, these cars are often associated with embankments, wide avenues and warm evenings. When the roof is open, driver and passengers feel the atmosphere of the city more strongly: street sounds, building lights and nightlife rhythm. Despite a stylish character, modern convertibles remain practical for city traffic. They have compact dimensions, good handling and enough power for quick movement in traffic flow. In megacities, a convertible is often a car for those who want not only to move around the city, but to feel its atmosphere during each trip.',
    tips: [
      'In the city, open the roof mainly on roads with moderate traffic and less dust.',
      'Park convertibles in safe places or parking lots to protect the interior from weather.',
      'On express city roads, keep the roof up to reduce noise in the cabin.',
      'In warm weather, a convertible is ideal for embankments and wide boulevards.',
      'Always check the roof mechanism because city weather can change quickly.',
    ],
  },
];

const ATLAS_CITY_SAVED_TIPS_KEY = 'atlascitytrffck_saved_tips_categories';
const ATLAS_CITY_SAVED_STORIES_KEY = 'atlascitytrffck_saved_stories_categories';

const Atlascitytrffcstories = () => {
  const route = useRoute();
  const [atlasCityActiveTab, setAtlasCityActiveTab] = useState<
    'stories' | 'tips'
  >('stories');
  const [atlasCitySelectedTipIdx, setAtlasCitySelectedTipIdx] = useState(0);
  const [atlasCitySavedTips, setAtlasCitySavedTips] = useState<string[]>([]);
  const [atlasCitySavedStories, setAtlasCitySavedStories] = useState<string[]>(
    [],
  );
  const [atlasCityExpandedStories, setAtlasCityExpandedStories] = useState<
    string[]
  >([]);

  const atlasCityInitialTabParam = (
    route.params as {initialTab?: 'stories' | 'tips'} | undefined
  )?.initialTab;

  useEffect(() => {
    if (
      atlasCityInitialTabParam === 'tips' ||
      atlasCityInitialTabParam === 'stories'
    ) {
      setAtlasCityActiveTab(atlasCityInitialTabParam);
    }
  }, [atlasCityInitialTabParam]);

  const atlasCitySelectedTipItem = atlasCityStoryData[atlasCitySelectedTipIdx];
  const atlasCityOtherTipItems = atlasCityStoryData.filter(
    (_, index) => index !== atlasCitySelectedTipIdx,
  );

  const atlasCityHandleChangeBody = () => {
    setAtlasCitySelectedTipIdx(prev => (prev + 1) % atlasCityStoryData.length);
  };

  useEffect(() => {
    const atlasCityLoadSavedData = async () => {
      try {
        const [rawTips, rawStories] = await Promise.all([
          AsyncStorage.getItem(ATLAS_CITY_SAVED_TIPS_KEY),
          AsyncStorage.getItem(ATLAS_CITY_SAVED_STORIES_KEY),
        ]);

        const parsedTips = rawTips ? (JSON.parse(rawTips) as string[]) : [];
        const parsedStories = rawStories
          ? (JSON.parse(rawStories) as string[])
          : [];

        if (Array.isArray(parsedTips)) {
          setAtlasCitySavedTips(parsedTips);
        }
        if (Array.isArray(parsedStories)) {
          setAtlasCitySavedStories(parsedStories);
        }
      } catch (error) {
        setAtlasCitySavedTips([]);
        setAtlasCitySavedStories([]);
      }
    };

    atlasCityLoadSavedData();
  }, []);

  const atlasCityToggleSavedTip = async (category: string) => {
    const nextSaved = atlasCitySavedTips.includes(category)
      ? atlasCitySavedTips.filter(item => item !== category)
      : [...atlasCitySavedTips, category];

    setAtlasCitySavedTips(nextSaved);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_TIPS_KEY,
      JSON.stringify(nextSaved),
    );
  };

  const atlasCityShareTip = async (category: string, tip: string) => {
    await Share.share({
      message: `${category} tip:\n\n${tip}`,
    });
  };

  const atlasCityToggleSavedStory = async (category: string) => {
    const nextSaved = atlasCitySavedStories.includes(category)
      ? atlasCitySavedStories.filter(item => item !== category)
      : [...atlasCitySavedStories, category];

    setAtlasCitySavedStories(nextSaved);
    await AsyncStorage.setItem(
      ATLAS_CITY_SAVED_STORIES_KEY,
      JSON.stringify(nextSaved),
    );
  };

  const atlasCityToggleExpandedStory = (category: string) => {
    setAtlasCityExpandedStories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category],
    );
  };

  const atlasCityShareStory = async (category: string, story: string) => {
    await Share.share({
      message: `${category} story:\n\n${story}`,
    });
  };

  return (
    <>
      <Atlascitytrffclayout>
        <View style={styles.atlasCityStoriesRoot}>
          <View style={styles.atlasCityStoriesTabsRow}>
            <TouchableOpacity
              style={styles.atlasCityStoriesTabButton}
              activeOpacity={0.85}
              onPress={() => setAtlasCityActiveTab('stories')}>
              <Text
                style={[
                  styles.atlasCityStoriesTabText,
                  atlasCityActiveTab === 'stories' &&
                    styles.atlasCityStoriesTabTextActive,
                ]}>
                Stories
              </Text>
              {atlasCityActiveTab === 'stories' && (
                <View style={styles.atlasCityStoriesTabUnderline} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.atlasCityStoriesTabButton}
              activeOpacity={0.85}
              onPress={() => setAtlasCityActiveTab('tips')}>
              <Text
                style={[
                  styles.atlasCityStoriesTabText,
                  atlasCityActiveTab === 'tips' &&
                    styles.atlasCityStoriesTabTextActive,
                ]}>
                Tips
              </Text>
              {atlasCityActiveTab === 'tips' && (
                <View style={styles.atlasCityStoriesTabUnderline} />
              )}
            </TouchableOpacity>
          </View>

          {atlasCityActiveTab === 'stories' ? (
            <>
              {atlasCityStoryData.map(item => (
                <LinearGradient
                  key={item.category}
                  colors={['#474747', '#2D2D2D']}
                  style={styles.atlasCityStoriesCard}>
                  <View style={{padding: 14}}>
                    <View style={styles.atlasCityStoriesImagePlaceholder}>
                      <Image
                        source={item.storyimage}
                        style={{width: 270, height: 100, resizeMode: 'contain'}}
                      />
                    </View>
                    <Text style={styles.atlasCityStoriesCategory}>
                      {item.category}
                    </Text>

                    <Text
                      style={styles.atlasCityStoriesText}
                      numberOfLines={
                        atlasCityExpandedStories.includes(item.category)
                          ? undefined
                          : 9
                      }>
                      {item.story}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        atlasCityToggleExpandedStory(item.category)
                      }>
                      <Text style={styles.atlasCityReadMoreText}>
                        {atlasCityExpandedStories.includes(item.category)
                          ? 'Read less'
                          : 'Read more'}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.atlasCityStoryActionsRow}>
                      <TouchableOpacity
                        onPress={() =>
                          atlasCityToggleSavedStory(item.category)
                        }>
                        <Image
                          source={
                            atlasCitySavedStories.includes(item.category)
                              ? require('../../assets/i/atlascitytrfsaved.png')
                              : require('../../assets/i/atlascitytrsave.png')
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          atlasCityShareStory(item.category, item.story)
                        }>
                        <Image
                          source={require('../../assets/i/atlascitytrshare.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </>
          ) : (
            <>
              <LinearGradient
                colors={['#474747', '#2D2D2D']}
                style={styles.atlasCityTipsMainCard}>
                <View style={{padding: 20}}>
                  <View style={styles.atlasCityTipsMainHeader}>
                    <Text style={styles.atlasCityTipsMainTitle}>
                      {atlasCitySelectedTipItem.category} tip:
                    </Text>
                    <View style={styles.atlasCityTipsMainImagePlaceholder}>
                      <Image
                        source={atlasCitySelectedTipItem.image}
                        style={{width: 126, height: 60, resizeMode: 'contain'}}
                      />
                    </View>
                  </View>

                  <View style={styles.atlasCityTipsMainBodyCard}>
                    <View style={styles.atlasCityTipBodyRow}>
                      <View style={styles.atlasCityTipAccentBars}>
                        <View style={styles.atlasCityTipAccentBar} />
                      </View>
                      <Text style={styles.atlasCityTipsMainText}>
                        {atlasCitySelectedTipItem.tips[0]}
                      </Text>
                      <View style={styles.atlasCityTipActionsCol}>
                        <TouchableOpacity
                          style={styles.atlasCityTipActionButton}
                          onPress={() =>
                            atlasCityToggleSavedTip(
                              atlasCitySelectedTipItem.category,
                            )
                          }>
                          <Image
                            source={
                              atlasCitySavedTips.includes(
                                atlasCitySelectedTipItem.category,
                              )
                                ? require('../../assets/i/atlascitytrfsaved.png')
                                : require('../../assets/i/atlascitytrsave.png')
                            }
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[]}
                          onPress={() =>
                            atlasCityShareTip(
                              atlasCitySelectedTipItem.category,
                              atlasCitySelectedTipItem.tips[0],
                            )
                          }>
                          <Image
                            source={require('../../assets/i/atlascitytrshare.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              <TouchableOpacity
                style={styles.atlasCityTipsChangeBodyButton}
                activeOpacity={0.85}
                onPress={atlasCityHandleChangeBody}>
                <Text style={styles.atlasCityTipsChangeBodyButtonText}>
                  Change body
                </Text>
              </TouchableOpacity>

              <Text style={styles.atlasCityOtherTipsTitle}>Other tips:</Text>

              {atlasCityOtherTipItems.map(item => (
                <LinearGradient
                  key={item.category}
                  colors={['#FFFFFF1C', '#FFFFFF1C']}
                  style={styles.atlasCityOtherTipCard}>
                  <View style={{padding: 14}}>
                    <View style={styles.atlasCityTipBodyRow}>
                      <View style={styles.atlasCityTipAccentBars}>
                        <View style={styles.atlasCityTipAccentBar} />
                      </View>
                      <Text style={styles.atlasCityOtherTipText}>
                        {item.tips[0]}
                      </Text>
                      <View style={styles.atlasCityTipActionsCol}>
                        <TouchableOpacity
                          style={styles.atlasCityTipActionButton}
                          onPress={() =>
                            atlasCityToggleSavedTip(item.category)
                          }>
                          <Image
                            source={
                              atlasCitySavedTips.includes(item.category)
                                ? require('../../assets/i/atlascitytrfsaved.png')
                                : require('../../assets/i/atlascitytrsave.png')
                            }
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.atlasCityTipActionButton}
                          onPress={() =>
                            atlasCityShareTip(item.category, item.tips[0])
                          }>
                          <Image
                            source={require('../../assets/i/atlascitytrshare.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </>
          )}
        </View>
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
  atlasCityStoriesRoot: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 150,
    gap: 16,
  },
  atlasCityStoriesTabsRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 36,
    marginBottom: 8,
  },
  atlasCityStoriesTabButton: {
    alignItems: 'center',
  },
  atlasCityStoriesTabText: {
    textTransform: 'uppercase',
    color: '#A0A0A0',
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
  },
  atlasCityStoriesTabTextActive: {
    color: '#FFFFFF',
  },
  atlasCityStoriesTabUnderline: {
    marginTop: 4,
    width: '100%',
    height: 2,
    borderRadius: 999,
    backgroundColor: '#57C1FF',
  },
  atlasCityStoriesCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555555',
  },
  atlasCityStoriesCategory: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 10,
  },
  atlasCityStoriesImagePlaceholder: {
    height: 145,
    borderRadius: 12,
    borderWidth: 1,

    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  atlasCityStoriesImagePlaceholderText: {
    color: '#A9A9A9',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  atlasCityStoriesText: {
    color: '#B3B3B3',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
  atlasCityReadMoreText: {
    color: '#70D570',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
    marginBottom: 14,
  },
  atlasCityStoryActionsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
  },
  atlasCityStoryShareActionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BD2C',
  },
  atlasCityStoriesTipsTitle: {
    marginTop: 16,
    marginBottom: 10,
    color: '#57C1FF',
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
  },
  atlasCityStoriesTipsWrap: {
    gap: 8,
  },
  atlasCityStoriesTipLine: {
    color: '#F0F0F0',
    fontSize: 14,
    lineHeight: 21,
  },
  atlasCityTipsMainCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555555',
  },
  atlasCityTipsMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  atlasCityTipsMainTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
    flex: 1,
  },
  atlasCityTipsMainImagePlaceholder: {
    width: 150,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  atlasCityTipsMainBodyCard: {
    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555555',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  atlasCityTipsMainText: {
    color: '#E6E6E6',
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
  },
  atlasCityTipBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  atlasCityTipAccentBars: {
    width: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityTipAccentBar: {
    width: 4,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#FFA247',
  },
  atlasCityTipActionsCol: {
    gap: 8,
  },
  atlasCityTipActionButton: {},
  atlasCityTipShareActionButton: {
    backgroundColor: '#00BD2C',
    borderColor: '#00BD2C',
  },
  atlasCityTipActionButtonText: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '700',
  },
  atlasCityTipsChangeBodyButton: {
    marginTop: 8,
    height: 47,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BD2C',
  },
  atlasCityTipsChangeBodyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  atlasCityOtherTipsTitle: {
    marginTop: 20,
    marginBottom: 4,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
  },
  atlasCityOtherTipCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2F2F2F',
    width: '93%',
    alignSelf: 'center',
  },
  atlasCityOtherTipCategory: {
    color: '#57C1FF',
    fontSize: 15,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  atlasCityOtherTipText: {
    color: '#DEDEDE',
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
});

export default Atlascitytrffcstories;
