import {View, Button, Image, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import { useState, useEffect } from 'react'
import { validateEmail } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function Onboarding(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    signedIn = async (name, email) => {
    const customerName = ['name', name]
    const customerEmail = ['email', email]
    const signedIn = ['signedIn', JSON.stringify(true)]
    console.log('pressed')
    try{
        await AsyncStorage.multiSet([signedIn, customerName, customerEmail])
        console.log('clicked pressable')
    } catch (error){
        console.log(error.message)
    }
}

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/logo.jpg')}
                    style={styles.image}
                />
            </View>

            <View style={styles.formContainer}>
                
                <View style={styles.spaceContainer}>
                    <Text style={styles.text}>Let us get to know you</Text>
                </View>
                <View>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName} 
                        style ={styles.input} 
                    ></TextInput>
                    
                    
                    <Text style={styles.text}>Email</Text>
                    <TextInput 
                        value={email}
                        onChangeText={setEmail}
                        style ={styles.input}
                        keyboardType={'email-address'}     
                    ></TextInput>
                </View>
                
            </View>
            

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => signedIn(name, email)} style={styles.button} disabled={ name==''?true:false }>
                    <Text style={styles.text}>Next</Text>
                </Pressable>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cad2da',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', 
    },
    formContainer: {
        flex: 5, 
        justifyContent: 'space-between',
        padding: 30,
    },
    spaceContainer: {
        height: 70
    },
    input: {
        padding: 10,
        margin: 12,
        height: 50,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#4e6170',
        fontSize: 17,
    },
    text: {
        fontSize: 22, 
        textAlign: 'center',
        color: '#4e6170'
    },
    button: {
        backgroundColor: '#cad2da',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
    }, 
    buttonContainer: {
        backgroundColor: '#edefee',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 30,
    }, 
    image:{
        height: 80,
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain'
    },
    imageContainer: {
        height: 100,
        backgroundColor: '#dee3e9',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 5
    }
})
