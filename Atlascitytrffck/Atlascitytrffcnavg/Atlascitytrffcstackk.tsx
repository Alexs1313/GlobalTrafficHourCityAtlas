// stack

import Atlascitytrffcksplaces from '../Atlascitytrffckscrnn/Atlascitytrffcksplaces';
import Atlascitytrffckplacedetail from '../Atlascitytrffckscrnn/Atlascitytrffckplacedetail';
import Atlascitytrffcldr from '../Atlascitytrffccopnts/Atlascitytrffcldr';
import {createStackNavigator} from '@react-navigation/stack';
import Atlascitytrtabs from '../../Atlascitytrtabs';
import Atlascitytrffcksonb from '../Atlascitytrffckscrnn/Atlascitytrffcksonb';

const Stack = createStackNavigator();

const Atlascitytrffcstackk = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Atlascitytrffcldr" component={Atlascitytrffcldr} />
      <Stack.Screen
        name="Atlascitytrffcksonb"
        component={Atlascitytrffcksonb}
      />
      <Stack.Screen name="Atlascitytrtabs" component={Atlascitytrtabs} />
      <Stack.Screen
        name="Atlascitytrffcksplaces"
        component={Atlascitytrffcksplaces}
      />
      <Stack.Screen
        name="Atlascitytrffckplacedetail"
        component={Atlascitytrffckplacedetail}
      />
    </Stack.Navigator>
  );
};

export default Atlascitytrffcstackk;
