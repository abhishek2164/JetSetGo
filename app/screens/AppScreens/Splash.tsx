import React, { useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { appLogo } from '../../../assets/Svg/SplashIcon';
export default function Splash(props: any) {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace('TabScreens');
        }, 1000);
    },[])
    return (
        <View style={styles.splashContainer}>
            <SvgXml xml={appLogo} height={150} width={150}/>
            <Text style={styles.splashText}>JetSetGo</Text>
        </View>
    )

}
const styles=StyleSheet.create({
splashContainer:{flex:1,backgroundColor:"#9bd5e3",justifyContent:"center",alignItems:"center"},
splashText:{fontSize:20,color:"white",fontWeight:"bold",letterSpacing:0.2,marginTop:20}
})