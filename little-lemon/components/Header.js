import { View, Text, Image, Pressable , StyleSheet} from "react-native";

export default function Header(){
    return (
        <View style={styles.container}>
            <Pressable>
                <Image 
                source={require('../assets/arrow-icon.png')}
                style={styles.arrow} />
            </Pressable>
            <Image 
            source={require('../assets/logo.jpg')}
            style={styles.logo} />
            <Image 
            source={require('../assets/jane.jpg')}
            style={styles.avatar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: '#edefee' 
    },
    avatar:{
        height: 50,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 50
    },
    logo:{
        height: 50,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain'
    },
    arrow:{
        height: 35,
        width: 35,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain'
    },
})