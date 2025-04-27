import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';

import store from './store/storeRedux';



import HomeScreen from './screens/HomeScreen';
import HDCategory from './screens/HDCategory';
import HFCategory from './screens/HFCategory';
import HICategory from './screens/HICategory';
import ArticleScreen from './screens/ArticleScreen';
import FavoritesScrenn from './screens/FavoritesScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

  // const [isFavoriteArticle, setIsFavoriteArticle] = useState(false);

  // function pressedFavoritesHandler() {

  //   setIsFavoriteArticle((prev) => !prev);
  //   // const itemObjFavorites = route.params.itemObjPassed;
  // }


  // function favoritesButton() {
  //   return (
  //     <Pressable
  //       onPress={pressedFavoritesHandler}
  //       style={({ pressed }) => pressed ? styles.pressedFavorites : null}
  //     >
  //       {
  //         isFavoriteArticle ?
  //           (
  //             <MaterialCommunityIcons
  //               name="heart-multiple"
  //               size={24}
  //               color="black"
  //             />
  //           )
  //           :
  //           (
  //             <MaterialCommunityIcons name="heart-multiple-outline" size={24} color="black" />
  //           )
  //       }
  //       {/* <MaterialCommunityIcons name="heart-multiple" size={24} color="black" /> */}
  //     </Pressable>
  //   );
  // }


  function DrawerNavigation() {
    return (
      <Drawer.Navigator
        screenOptions={{

        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="HisDashurie" component={HDCategory} />
        <Drawer.Screen name="HisFamiljare" component={HFCategory} />
        <Drawer.Screen name="HisInspiruese" component={HICategory} />
        <Drawer.Screen name="Favorites" component={FavoritesScrenn} />
      </Drawer.Navigator>
    );
  }


  function backButtonHandler() {
    return (
      <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
        <MaterialCommunityIcons name="heart-broken" size={28} color="#e91e63" />
      </Pressable>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="Drawer" component={DrawerNavigation} options={{
              headerShown: false,
            }} />
            <Stack.Screen
              name="Article"
              component={ArticleScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={({ pressed }) => [
                      styles.buttonBase,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="arrow-left-circle"
                      size={30}
                      color="#1a237e"
                    />

                  </Pressable>
                ),
                headerTitle: "",
                headerStyle: {
                  backgroundColor: "#f9f9f9",
                  shadowColor: "transparent",
                },
              })}
            />
            

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressedFavorites: {
    opacity: 0.5
  },
  buttonBase: {
    marginLeft: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 50,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    transform: [{ scale: 1 }],
  },
  buttonPressed: {
    opacity: 0.6,
    elevation: 1,
    transform: [{ scale: 0.95 }],
  },

});
