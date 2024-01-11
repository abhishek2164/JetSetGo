import React, { useEffect, useRef } from 'react';
import {
    Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
function CustomTextInput(props:any){
 
   
return(
    <View style={styles.container}>
       <TextInput 
       keyboardType={props?.name == "phone" ? "number-pad":"default"}
       onChangeText={
        val=>
        {
        props?.onChange(props?.index,props?.name,val)
        }}
        value={props?.value}
        placeholder={props?.label}
       style={{position:"absolute",paddingLeft:10,width:"100%"}} />
     
    </View>
)
}
const styles=StyleSheet.create({
    container:{height:40,borderColor:"grey",borderWidth:0.5,marginBottom:20,paddingLeft:12,justifyContent:"center",width:"100%"},
    textStyle:{color:"black",fontWeight:"400"}
})
export default CustomTextInput