import { View, Text, Image, Pressable , StyleSheet} from "react-native";

export default function HomeHeader({navigateProfile}){
    return (
        <View style={styles.container}>
            <Image 
            source={require('../assets/logo.jpg')}
            style={styles.logo} />
            <Pressable onPress={navigateProfile}>
                <Image 
                source={require('../assets/jane.jpg')}
                style={styles.avatar} />
            </Pressable>            
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