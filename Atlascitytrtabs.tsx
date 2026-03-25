import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Atlascitytrffckhome from './Atlascitytrffck/Atlascitytrffckscrnn/Atlascitytrffckhome';
import Atlascitytrffcsaved from './Atlascitytrffck/Atlascitytrffckscrnn/Atlascitytrffcsaved';
import Atlascitytrffckmap from './Atlascitytrffck/Atlascitytrffckscrnn/Atlascitytrffckmap';
import Atlascitytrffckquiz from './Atlascitytrffck/Atlascitytrffckscrnn/Atlascitytrffckquiz';
import Atlascitytrffcstories from './Atlascitytrffck/Atlascitytrffckscrnn/Atlascitytrffcstories';

const Tab = createBottomTabNavigator();

const AnimatedTabButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.totemGuidetabButton]}
      {...rest}>
      <Animated.View
        style={[styles.totemGuidetabButtonInner, {transform: [{scale}]}]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const Atlascitytrtabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.totemGuidetabBar],
        tabBarActiveTintColor: '#555555',
        tabBarButton: props => (
          <AnimatedTabButton {...(props as Record<string, unknown>)} />
        ),
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={['#3F3F3F', '#282828']}
              style={[StyleSheet.absoluteFill]}
            />
          </View>
        ),
      }}>
      <Tab.Screen
        name="Atlascitytrffckhome"
        component={Atlascitytrffckhome}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./assets/i/atlascitytrffctab1.png')}
                tintColor={focused ? '#57C1FF' : 'rgb(168, 164, 164)'}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Atlascitytrffcsaved"
        component={Atlascitytrffcsaved}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./assets/i/atlascitytrffctab2.png')}
                tintColor={focused ? '#57C1FF' : 'rgb(168, 164, 164)'}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Atlascitytrffckmap"
        component={Atlascitytrffckmap}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./assets/i/atlascitytrffctab3.png')}
                tintColor={focused ? '#57C1FF' : 'rgb(168, 164, 164)'}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Atlascitytrffckquiz"
        component={Atlascitytrffckquiz}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./assets/i/atlascitytrffctab4.png')}
                tintColor={focused ? '#57C1FF' : 'rgb(168, 164, 164)'}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Atlascitytrffcstories"
        component={Atlascitytrffcstories}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./assets/i/atlascitytrffctab5.png')}
                tintColor={focused ? '#57C1FF' : 'rgb(168, 164, 164)'}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  totemGuidetabButton: {
    flex: 1,
  },
  totemGuidetabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidetabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidetabDot: {
    width: 24,
    height: 2,
    borderRadius: 25,
    backgroundColor: '#57C1FF',
    position: 'absolute',
    top: 28,
  },
  totemGuidetabBar: {
    marginHorizontal: 46,
    elevation: 0,
    paddingTop: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 45,
    paddingHorizontal: 18,
    borderColor: '#555555',
    borderTopWidth: 1.9,
    borderTopColor: '#555555',
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 77,
    paddingBottom: 20,
    overflow: 'hidden',
    borderWidth: 1.9,
  },
});

export default Atlascitytrtabs;
