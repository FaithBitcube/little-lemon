import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

// export default function Chips(props){
//     return (
//         <TouchableOpacity
//         >
//             <View key={props.i} style={styles.container}>
//                 <Text style={styles.text}>{props.name}</Text>
//             </View>
//         </TouchableOpacity>
        
//     );
// }

const darkGreen = '#495e57'
const grey = '#edefee'
const styles = StyleSheet.create({
    container: {
        backgroundColor: grey,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 20,
        margin: 4,
    }, 
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkGreen
    },
      filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
  },
});

const Chips = ({ onChange, selections, category }) => {
  return (
    <View style={styles.filtersContainer}>
      {category.map((category, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / category.length,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 20,
            backgroundColor: selections[index] ? '#EE9972' : grey,
            margin: 4,
          }}>
            <View >
                <Text style={styles.text}>{category}</Text>
            </View>

        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Chips

// const styles = StyleSheet.create({
//   filtersContainer: {
//     backgroundColor: 'green',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
// });