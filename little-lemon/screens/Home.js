import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import debounce from 'lodash.debounce';
import { getSectionListData, useUpdateEffect } from '../utils/index';
import Header from '../components/Header';
import HomeHeader from '../components/HomeHeader';
import Chips from '../components/Chips';

const chipItems = ['Starters', 'Mains', 'Desserts', 'Drinks']
const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'


export default function Home({navigation}) {
  const [foodMenu, setFoodMenu] = useState([])
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('')
  const [filterSelections, setFilterSelections] = useState(
    chipItems.map(() => false)
  );

  const navigateProfile = () => {
    navigation.navigate('Profile')
  }

  const fetchData = async () => {
    var menu = []
    try {
      const response = await fetch(API_URL);
      var data = await response.json();
      for(var i=1; i<=data.menu.length; i++){
            menu = [
              ...menu,
              {
                id: i,
                name: data.menu[i]['name'],
                price: data.menu[i]['price'],
                description: data.menu[i]['description'],
                image: data.menu[i]['image'],
                category: data.menu[i]['category'],
              }
            ]
            menu.push({
              id: i,
              name: data[i]['name'],
              price: data[i]['price'],
              description: data[i]['description'],
              image: data[i]['image'],
              category: data[i]['category'],
            })
          }
    } catch (error) {
      console.log(error.message)
      //Alert.alert(error.message);
    }
    return menu;
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        if (!menuItems.length) {
          const apiItems = await fetchData();
          saveMenuItems(apiItems);
          
        }
        console.log(menuItems)
        //const sectionListData = getSectionListData(menuItems);
        setFoodMenu(menuItems);
      } catch (error) {
        // Handle error
        //Alert.alert(e.message);
        console.log(error.message)
      }
    })();
  }, []);

  const Item = ({name, description, price, image}) => (
    <View style={styles.list}>
      <View style={styles.row}>
        <View style={styles.flatListContainer}>
          <Text style={styles.bodyHeading}>{name}</Text>
          <Text style={styles.bodyText} numberOfLines={2}>{description}</Text>
          <Text style={styles.price}>$ {price}</Text>
        </View>
        <Image
          source={{
            uri:
            `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}}
          style={styles.flatlistImage}
        />
      </View>
    </View>
    
    
  )

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = chipItems.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        console.log('the filtered list')
          console.log(menuItems)
        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
        console.log(e.message)
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <>
        <HomeHeader navigateProfile={navigateProfile}/>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Lemon Lemon</Text>
                <Text style={styles.subHeading}>Chicago</Text>
                <View style={styles.row}>
                    <Text style={styles.headerText}>
                    We are a family owned 
                    Mediterraneanresturant, 
                    focused on traditional recipies 
                    served with a modern twist</Text>
                    <Image 
                        source={require('../assets/salad.jpg')}
                        style={styles.image} />
                    
                </View>
                <View style={styles.search}>
                  <Image 
                    source={require('../assets/search.png')}
                    style={styles.icon} />
                  <TextInput 
                    style={styles.input}
                    placeholder='Search'
                    value={searchBarText}
                    onChangeText={handleSearchChange}
                  />
                </View>
                
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyHeading}>Order For Delivery!</Text>
              <View style={styles.row}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <Chips
                    selections={filterSelections}
                    onChange={handleFiltersChange} 
                    category ={chipItems}
                  />
                </ScrollView>
              </View>
              
              <FlatList 
                data={foodMenu}
                renderItem={({item}) => <Item name={item.name} 
                  description={item.description} price={item.price} image={item.image}/>}
                keyExtractor={item => item.id}
              />
            </View>
            
        </View>
    </>
  );
}

const darkGreen = '#495e57'
const lightGrey = '#edefee'
const yellow = '#f4ce14'
const darkGrey = '#333333'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'start',

  },
  headerContainer :{
    backgroundColor: darkGreen,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20 
  },
  bodyContainer: {
    paddingHorizontal: 15
  },
  flatListContainer:{
    paddingVertical: 8,
    flex: 0.7
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightGrey,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    height: 42,
    fontSize: 17,
    backgroundColor: lightGrey,
    flex: 0.9
},
  image:{   
    height: 140,
    width: 140,
    resizeMode: 'cover',
    borderRadius: 10,
    flex: 0.4
    },
    flatlistImage:{   
      height: 70,
      width: 70,
      resizeMode: 'cover',
      borderRadius: 5,
      flex: 0.3
      },
    icon:{   
        height: 25,
        width: 25,
        resizeMode: 'contain',
        backgroundColor: lightGrey,
        padding: 10,
        flex: 0.1
        },
    heading:{
        color: yellow,
        textAlign: 'left',
        fontSize: 32,
        fontWeight: 'bold'
    },
    subHeading:{
        color: '#fff',
        textAlign: 'left',
        fontSize: 28,
    },
    headerText:{
        color: '#fff',
        flex:0.6,
        textAlign: 'left',
        fontSize: 18,
        marginRight: 5
    },
    bodyHeading:{
      fontWeight: 'bold',
      fontSize: 20,
      paddingVertical: 8
    },
    bodyText:{
      color: darkGreen,
      fontSize: 16,
      paddingBottom: 4,
      marginRight: 5
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkGreen,
      paddingTop: 5
    },
    list: {
      borderBottomWidth: 0.5,
      borderBottomColor: darkGreen
    }
});
