import {View, Button, Image, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import { useState } from 'react'
import { validateEmail } from '../utils'

export default function Onboarding(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

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
                        onChange={text => setName(text)} 
                        style ={styles.input} 
                    ></TextInput>
                    
                    
                    <Text style={styles.text}>Email</Text>
                    <TextInput 
                        value={email}
                        onChange={text => setEmail(text)}
                        style ={styles.input}
                        keyboardType={'email-address'}     
                    ></TextInput>
                </View>
                
            </View>
            

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} disabled={ name==''?true:false || validateEmail(email)?false:true}>
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
