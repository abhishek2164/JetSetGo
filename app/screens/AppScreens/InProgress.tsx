import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
function InProgress(props:any){
return(
    <View style={styles.container}>
        <Text style={styles.textStyle}>Screen In-Progress</Text>
    </View>
)
}
const styles=StyleSheet.create({
    container:{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"},
    textStyle:{color:"black",fontWeight:"700"}
})
export default InProgress