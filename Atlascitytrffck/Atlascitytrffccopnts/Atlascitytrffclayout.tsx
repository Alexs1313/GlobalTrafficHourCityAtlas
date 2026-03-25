import {ImageBackground, ScrollView} from 'react-native';

const Atlascitytrffclayout = ({children}) => {
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/i/atlascitytrffctbgg.png')}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Atlascitytrffclayout;
