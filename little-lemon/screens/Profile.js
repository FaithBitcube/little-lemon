import { View, StyleSheet, Text, TextInput, Image, Pressable, ScrollView} from "react-native";
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from "../components/Header";

export default function Profile({navigation}){
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhoneNum] = useState('')
    const [orderStatus, setOrderStatus] = useState(false)
    const [passwordChanges, setPasswordChanges] = useState(false)
    const [specialOffers, setSpecialOffers] = useState(false)
    const [newsletter, setNewsletter] = useState(false)

    saveChanges = async () => {
        const customerName = ['name', name]
        const customerLastName = ['lastname', lastName]
        const customerEmail = ['email', email]
        const customerPhone = ['phone', phone]
        const order = ['order', JSON.stringify(orderStatus)]
        const password = ['passwordChanges', JSON.stringify(passwordChanges)]
        const specials = ['specials', JSON.stringify(specialOffers)]
        const news = ['newsletter', JSON.stringify(orderStatus)]
        
        console.log('pressed')
        try{
            await AsyncStorage.multiSet([
                customerName, 
                customerLastName, 
                customerEmail, 
                customerPhone,
                order,
                password,
                specials,
                news
            ])
            console.log('clicked pressable')
        } catch (error){
            console.log(error.message)
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.clear()
            navigation.navigate('Onboarding')
        } catch (e){
            console.log('error' + e)
        }
    }

    useEffect(() => {
        (async () => {
          try {
            const values = await AsyncStorage.multiGet(['name', 'email']);
            setName(values[0][1])
            setEmail(values[1][1])
          } catch (e) {
            //Alert.alert(`An error occurred: ${e.message}`);
            console.log('error')
            console.log(e)
          }
        })();
      }, []);

    return (
        <>
        <Header />
        <View style={styles.container}>
            
            <ScrollView>

            
            <Text style={styles.headings}>Personal Information</Text>
            <Text >Avatar</Text>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.image} 
                    source={require('../assets/jane.jpg')}
                />
                <Pressable onPress={() => signedIn(name, email)} style={styles.buttonPrimary}  >
                    <Text style={styles.buttonText}>Change</Text>
                </Pressable>
                <Pressable onPress={() => signedIn(name, email)} style={styles.buttonOutline} >
                    <Text style={styles.buttonTextOutline}>Remove</Text>
                </Pressable>
            </View>
            <View>
                <Text>First Name</Text>
                <TextInput 
                    value={name}
                    onChangeText={setName}
                    style ={styles.input}
                />

                <Text>Last Name</Text>
                <TextInput 
                    value={lastName}
                    onChangeText={setLastName}
                    style ={styles.input}
                />

                <Text>Email</Text>
                <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    style ={styles.input}
                    keyboardType={'email-address'}
                />

                <Text>Phone Number</Text>
                <TextInput 
                    value={phone}
                    onChangeText={setPhoneNum}
                    style ={styles.input}
                />
                <Text style={styles.headings}>Email Nofications</Text>

                <View style={styles.section}>
                    <Checkbox 
                    value={orderStatus}
                    onValueChange={setOrderStatus}
                    style={styles.checkbox}
                    color={orderStatus? '#495e57':undefined}
                    />
                    <Text>Order statuses</Text>
                </View>

                <View style={styles.section}>
                    <Checkbox 
                    value={passwordChanges}
                    onValueChange={setPasswordChanges}
                    style={styles.checkbox}
                    color={passwordChanges? '#495e57':undefined}
                    />
                    <Text>Password Changes</Text>
                </View>
                
                <View style={styles.section}>
                    <Checkbox 
                    value={specialOffers}
                    onValueChange={setSpecialOffers}
                    style={styles.checkbox}
                    color={specialOffers? '#495e57':undefined}
                    />
                    <Text>Special Offers</Text>
                </View>

                <View style={styles.section}>
                    <Checkbox 
                    value={newsletter}
                    onValueChange={setNewsletter}
                    style={styles.checkbox}
                    color={newsletter? '#495e57':undefined}
                    />
                    <Text>Newsletter</Text>
                </View>
            </View>
            <Pressable onPress={() => logout()} style={styles.buttonSecondary} >
                <Text style={styles.buttonTextSecondary}>Logout</Text>
            </Pressable>
            <View style={styles.avatarContainer}>
                <Pressable onPress={() => {}} style={styles.buttonOutline} >
                    <Text style={styles.buttonTextOutline}>Discard Changes</Text>
                </Pressable>
                <Pressable onPress={() => saveChanges()} style={styles.buttonPrimary}  >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </Pressable>
            </View>
            </ScrollView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20 
    },
    formContainer: {
        flex: 5, 
        justifyContent: 'space-between',
        padding: 30,
    },
    input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 25,
        height: 50,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#4e6170',
        fontSize: 17,
    },
    headings: {
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333'
    },
    buttonPrimary: {
        backgroundColor: '#495e57',
        color: '#ffffff',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        margin: 4
    }, 
    buttonSecondary: {
        backgroundColor: '#f4ce14',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        margin: 4
    }, 
    buttonOutline: {
        borderColor: '#cad2da',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        borderWidth: 2,
        margin: 4
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonTextSecondary:{
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonTextOutline:{
        color: '#4e6170',
        fontWeight: 'bold'
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10
    }, 
    image:{
        height: 80,
        width: 80,
        resizeMode: 'contain',
        borderRadius: 50
    },
    imageContainer: {
        height: 100,
        backgroundColor: '#dee3e9',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 5
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
        marginVertical:8
    },
})