import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Animated} from 'react-native';

// const av = new Animated.Value(0);
// av.addListener(() => {
//   return;
// });

const atlsCityhtmlLoader = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader {
    --color: #a5a5b0;
    --size: 70px;
    width: var(--size);
    height: var(--size);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }

  .loader span {
    width: 100%;
    height: 100%;
    background-color: var(--color);
    animation: blink 0.6s alternate infinite linear;
  }

  .loader span:nth-child(1) { animation-delay: 0ms; }
  .loader span:nth-child(2) { animation-delay: 200ms; }
  .loader span:nth-child(3) { animation-delay: 300ms; }
  .loader span:nth-child(4) { animation-delay: 400ms; }
  .loader span:nth-child(5) { animation-delay: 500ms; }
  .loader span:nth-child(6) { animation-delay: 600ms; }

  @keyframes blink {
    0% {
      opacity: 0.3;
      transform: scale(0.5) rotate(5deg);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
</head>
<body>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</body>
</html>`;

const Atlascitytrffcldr = () => {
  const navigation = useNavigation();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace('Atlascitytrffcksonb');
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('timer cleared');
      }
    };
  }, [navigation]);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/i/atlascitytarrcloderbg.png')}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <WebView
            originWhitelist={['*']}
            source={{html: atlsCityhtmlLoader}}
            style={styles.atlsCitywebView}
            scrollEnabled={false}
            transparent={true}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  atlsCitywebView: {
    width: 260,
    height: 80,
    backgroundColor: 'transparent',
  },
});

export default Atlascitytrffcldr;
