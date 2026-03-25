import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const atlsCityhtmlLoader = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=0.3">
<style>
  body {
    margin: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .spinner {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .spinner div {
    position: absolute;
    width: 50%;
    height: 150%;
    background: #fff;
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
  }

  ${[...Array(10)]
    .map(
      (_, i) => `
    .spinner div:nth-child(${i + 1}) {
      --delay: ${(i + 1) / 10};
      --rotation: ${(i + 1) * 36};
      --translation: 150;
    }`,
    )
    .join('')}

  @keyframes spinner-fzua35 {
    0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    }

    50% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
    }
  }
</style>
</head>
<body>
  <div class="spinner">
    ${'<div></div>'.repeat(10)}
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
