// qz

import Atlascitytrffclayout from '../Atlascitytrffccopnts/Atlascitytrffclayout';
import {useFocusEffect} from '@react-navigation/native';

import {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

type AtlasCityQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const atlasCityQuizQuestions: AtlasCityQuestion[] = [
  {
    question:
      'Which city is often considered one of the most organized in the world in terms of traffic, where even during rush hour traffic moves very orderly?',
    options: ['Tokyo', 'Bangkok', 'Rome', 'Madrid'],
    correctAnswer: 'Tokyo',
  },
  {
    question:
      'In which metropolis have the large number of yellow taxis become a symbol of urban transport and daily traffic?',
    options: ['New York', 'Chicago', 'Boston', 'Toronto'],
    correctAnswer: 'New York',
  },
  {
    question:
      'In which city do cars drive on the left side of the road, which distinguishes it from most cities in the world?',
    options: ['Paris', 'London', 'Berlin', 'Vienna'],
    correctAnswer: 'London',
  },
  {
    question:
      'Which city is known for its large roundabouts, where dozens of cars can move at the same time?',
    options: ['Amsterdam', 'Prague', 'Paris', 'Budapest'],
    correctAnswer: 'Paris',
  },
  {
    question:
      'In which city in the United States, most residents travel by car due to the long distances between districts?',
    options: ['Los Angeles', 'Seattle', 'Miami', 'Dallas'],
    correctAnswer: 'Los Angeles',
  },
  {
    question:
      'Which type of car is most often used in dense urban traffic due to its compact size?',
    options: ['Truck', 'Hatchback', 'Pickup', 'Bus'],
    correctAnswer: 'Hatchback',
  },
  {
    question:
      'Which city has one of the largest road systems in the world with multi-lane highways?',
    options: ['Los Angeles', 'Lisbon', 'Athens', 'Oslo'],
    correctAnswer: 'Los Angeles',
  },
  {
    question:
      'Which city is popular for very small kei cars designed specifically for narrow streets?',
    options: ['Tokyo', 'Seoul', 'Beijing', 'Shanghai'],
    correctAnswer: 'Tokyo',
  },
  {
    question:
      'Which city is known for its huge traffic flows and constant traffic jams on ring roads?',
    options: ['Sao Paulo', 'Madrid', 'Warsaw', 'Zurich'],
    correctAnswer: 'Sao Paulo',
  },
  {
    question:
      'Which city has two continents connected by bridges, which creates a special traffic flow between different parts of the city?',
    options: ['Barcelona', 'Istanbul', 'Rome', 'Vienna'],
    correctAnswer: 'Istanbul',
  },
  {
    question:
      'Which Asian city is known for its extremely dense traffic and the large number of motorcycles on the roads?',
    options: ['Bangkok', 'Tokyo', 'Seoul', 'Osaka'],
    correctAnswer: 'Bangkok',
  },
  {
    question:
      'Which type of car body is often used by families because of its large interior space?',
    options: ['SUV', 'Coupe', 'Roadster', 'Mini'],
    correctAnswer: 'SUV',
  },
  {
    question:
      'Which city has one of the most complex transportation systems in the world with multi-level roads?',
    options: ['Shanghai', 'Lisbon', 'Prague', 'Brussels'],
    correctAnswer: 'Shanghai',
  },
  {
    question: 'Which type of car usually has a separate trunk and four doors?',
    options: ['Sedan', 'Pickup', 'Van', 'Truck'],
    correctAnswer: 'Sedan',
  },
  {
    question:
      'Which city is known for its huge number of cars and very long traffic jams?',
    options: ['Helsinki', 'Stockholm', 'Copenhagen', 'Mexico City'],
    correctAnswer: 'Mexico City',
  },
  {
    question:
      'Which city in South Korea has a very developed transportation infrastructure and a complex road system?',
    options: ['Seoul', 'Busan', 'Daegu', 'Incheon'],
    correctAnswer: 'Seoul',
  },
  {
    question:
      'Which type of car usually has a raised ride height and is better suited for poor roads?',
    options: ['SUV', 'Hatchback', 'Sedan', 'Coupe'],
    correctAnswer: 'SUV',
  },
  {
    question:
      'In which city, due to its huge population, traffic can seem almost continuous?',
    options: ['Mumbai', 'Doha', 'Dublin', 'Bratislava'],
    correctAnswer: 'Mumbai',
  },
  {
    question:
      'Which city in the Middle East is known for its wide roads and large number of modern cars?',
    options: ['Dubai', 'Amman', 'Muscat', 'Riyadh'],
    correctAnswer: 'Dubai',
  },
  {
    question:
      'Which element of urban infrastructure helps regulate the movement of cars at intersections?',
    options: ['Traffic lights', 'Billboards', 'Bridges', 'Tunnels'],
    correctAnswer: 'Traffic lights',
  },
];

const Atlascitytrffckquiz = () => {
  const [atlasCityQuestionIdx, setAtlasCityQuestionIdx] = useState(0);
  const [atlasCityCorrectCount, setAtlasCityCorrectCount] = useState(0);
  const [atlasCitySelectedAnswer, setAtlasCitySelectedAnswer] = useState('');
  const [atlasCityFinished, setAtlasCityFinished] = useState(false);
  const atlasCityTotalQuestions = atlasCityQuizQuestions.length;
  const atlasCityCurrentQuestion = atlasCityQuizQuestions[atlasCityQuestionIdx];
  const atlasCityProgressPercent = useMemo(
    () => Math.round((atlasCityCorrectCount / atlasCityTotalQuestions) * 100),
    [atlasCityCorrectCount, atlasCityTotalQuestions],
  );

  const atlasCityRestartQuiz = () => {
    setAtlasCityQuestionIdx(0);
    setAtlasCityCorrectCount(0);
    setAtlasCitySelectedAnswer('');
    setAtlasCityFinished(false);
  };

  useFocusEffect(
    useCallback(() => {
      atlasCityRestartQuiz();
    }, []),
  );

  const atlasCityShareResult = async () => {
    await Share.share({
      message: `I scored ${atlasCityCorrectCount}/${atlasCityTotalQuestions} correct answers in quiz.`,
    });
  };

  const atlasCityHandleAnswer = (answer: string) => {
    if (atlasCitySelectedAnswer) {
      return;
    }

    setAtlasCitySelectedAnswer(answer);
    const atlasCityIsCorrect =
      answer === atlasCityCurrentQuestion.correctAnswer;

    if (atlasCityIsCorrect) {
      setAtlasCityCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      if (atlasCityQuestionIdx + 1 >= atlasCityTotalQuestions) {
        setAtlasCityFinished(true);
        return;
      }

      setAtlasCityQuestionIdx(prev => prev + 1);
      setAtlasCitySelectedAnswer('');
    }, 420);
  };

  return (
    <Atlascitytrffclayout>
      <View style={styles.atlasCityQuizContainer}>
        <Text style={styles.atlasCityQuizTitle}>Interesting quiz</Text>

        <LinearGradient
          colors={['#3F3F3F', '#282828']}
          style={styles.atlasCityQuizTopCard}>
          <View style={{padding: 20}}>
            <Text style={styles.atlasCityQuizProgressLabel}>
              Quiz-progress:
            </Text>
            <View style={styles.atlasCityQuizProgressTrack}>
              <View
                style={[
                  styles.atlasCityQuizProgressFill,
                  {width: `${atlasCityProgressPercent}%`} as ViewStyle,
                ]}
              />
              <Text style={styles.atlasCityQuizProgressText}>
                {atlasCityProgressPercent}%
              </Text>
            </View>

            {!atlasCityFinished ? (
              <View style={styles.atlasCityQuizQuestionCard}>
                <Text style={styles.atlasCityQuizQuestionText}>
                  {atlasCityCurrentQuestion.question}
                </Text>
              </View>
            ) : (
              <View style={styles.atlasCityQuizQuestionCard}>
                <Text style={styles.atlasCityQuizResultText}>
                  The quiz is over. Your result is in front of you.
                </Text>
                <Text style={styles.atlasCityQuizResultScore}>
                  {atlasCityCorrectCount} / {atlasCityTotalQuestions} correct
                  answers
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {!atlasCityFinished ? (
          <View style={styles.atlasCityQuizAnswersWrap}>
            {atlasCityCurrentQuestion.options.map(option => {
              const atlasCityIsSelected = option === atlasCitySelectedAnswer;
              const atlasCityIsCorrect =
                option === atlasCityCurrentQuestion.correctAnswer;
              const atlasCityBtnColor =
                atlasCitySelectedAnswer &&
                atlasCityIsSelected &&
                !atlasCityIsCorrect
                  ? '#BD2F2F'
                  : '#00BD2C';

              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.atlasCityQuizAnswerButton,
                    {backgroundColor: atlasCityBtnColor},
                  ]}
                  activeOpacity={0.85}
                  disabled={Boolean(atlasCitySelectedAnswer)}
                  onPress={() => atlasCityHandleAnswer(option)}>
                  <Text style={styles.atlasCityQuizAnswerText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.atlasCityQuizResultActions}>
            <TouchableOpacity
              style={styles.atlasCityQuizRestartButton}
              activeOpacity={0.85}
              onPress={atlasCityRestartQuiz}>
              <LinearGradient
                colors={['#5390D2', '#007AFF', '#002853']}
                style={styles.atlasCityQuizShareButton}>
                <Text style={styles.atlasCityQuizResultActionText}>
                  Restart Quiz
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={atlasCityShareResult}>
              <LinearGradient
                colors={['#70D570', '#00BE00', '#016B01']}
                style={styles.atlasCityQuizShareButton}>
                <Image
                  source={require('../../assets/i/atlascitytrffshr.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Atlascitytrffclayout>
  );
};

const styles = StyleSheet.create({
  atlasCityQuizContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 81,
    paddingBottom: 150,
  },
  atlasCityQuizTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  atlasCityQuizTopCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555555',
  },
  atlasCityQuizProgressLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 10,
    marginBottom: 8,
    fontWeight: '300',
  },
  atlasCityQuizProgressTrack: {
    width: '100%',
    height: 24,
    borderRadius: 30,
    backgroundColor: '#282828',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  atlasCityQuizProgressFill: {
    position: 'absolute',
    top: 5,
    left: 5,
    bottom: 5,
    borderRadius: 20,
    backgroundColor: '#00BE00',
  },
  atlasCityQuizProgressText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '800',
  },
  atlasCityQuizQuestionCard: {
    borderWidth: 1,
    borderColor: '#6C6C6C',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  atlasCityQuizQuestionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '500',
  },
  atlasCityQuizAnswersWrap: {
    marginTop: 24,
    gap: 14,
  },
  atlasCityQuizAnswerButton: {
    minHeight: 69,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  atlasCityQuizAnswerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  atlasCityQuizResultText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  atlasCityQuizResultScore: {
    marginTop: 10,
    color: '#00BD2C',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Orbitron-Bold',
  },
  atlasCityQuizResultActions: {
    marginTop: 34,
    alignItems: 'center',
    gap: 14,
  },
  atlasCityQuizRestartButton: {
    width: 230,
    height: 66,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityQuizShareButton: {
    width: 230,
    height: 66,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atlasCityQuizResultActionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default Atlascitytrffckquiz;
