import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Chips from '../components/Chips';

const chipItems = ['Starters', 'Mains', 'Desserts', 'Drinks', '']

export default function Home() {

  return (
    <>
        <Header />
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
                <Image 
                    source={require('../assets/search.png')}
                    style={styles.icon} />
            </View>
            <Text>Order For Delivery!</Text>
            
            {
                chipItems.map((item) => {
                    return <Chips name={item} />
                })
            }
            
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'start',

  },
  headerContainer :{
    backgroundColor: '#495e57',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  image:{   
    height: 140,
    width: 140,
    resizeMode: 'cover',
    borderRadius: 10,
    flex: 0.4
    },
    icon:{   
        height: 35,
        width: 35,
        resizeMode: 'center',
        backgroundColor: '#edefee',
        padding: 10,
        borderRadius: 20
        },
    heading:{
        color: '#f4ce14',
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
    }
});
