import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { closeIcon } from '../../../assets/Svg/FlightSearchIcon';
import { FlatList } from 'react-native-gesture-handler';
function PassengerModal(props:any){
    const passengersList=[
        {type:"Adults",
        subTitle:"Age Over 12"
    },
    {type:"Senior Citizen(s)",
    subTitle:"Age Above 60"
},
{type:"Children",
subTitle:"Age 2 - 12"
},
{type:"Infants",
subTitle:"3 days to 2 years"
}
    ]
    function renderTop(){
        return (
            <>
            <TouchableOpacity  onPress={() => 
                {
                    props?.onClose()
                }}>
                    <SvgXml xml={closeIcon} height={30} width={30} />
                </TouchableOpacity>
                <Text style={{fontWeight:"800",color:"black",letterSpacing:0.1,marginTop:10,marginBottom:20,fontSize:25}}>Select Passengers</Text>
                </>
        )
    }
    function customButton(index:number){
        return(
          <View style={{flexDirection:"row",alignItems:"center"}}> 
             <TouchableOpacity 
             disabled={props?.passengers[index]== 0}
             onPress={
                ()=>{
                    props?.setPassengers((prev:any)=>{
                        return prev.map((item:any,idx:number)=>{
                             if(index == idx){
                               return item-1
                             }
                             else{
                                return item
                             }
                        })
                    } )
                }
             }
             style={{height:25,width:25,borderRadius:13,backgroundColor:"#cbcccc",justifyContent:"center",alignItems:"center"}}
             >
              <Text style={{fontSize:20,fontWeight:"800",color:"white",marginTop:-3}}>-</Text>
             </TouchableOpacity>
             <Text style={{marginHorizontal:10,fontSize:18,fontWeight:"600"}}>{props?.passengers[index]}</Text>
             <TouchableOpacity 
              onPress={
                ()=>{
                    props?.setPassengers((prev:any)=>{
                        return prev.map((item:any,idx:number)=>{
                             if(index == idx){
                               return item+1
                             }
                             else{
                                return item
                             }
                        })
                    } )
                }
             }
             style={{height:25,width:25,borderRadius:13,backgroundColor:"#cbcccc",justifyContent:"center",alignItems:"center"}}
             >
              <Text style={{fontSize:20,fontWeight:"400",color:"white",marginTop:-3}}>+</Text>
             </TouchableOpacity>
          </View>
        )
    }
    function renderPassengers(){
        return (
            <>
            <FlatList
            data={passengersList}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item,index})=>
                <View key={index} style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
                <View>
                  <Text style={{fontWeight:"600",fontSize:16,color:"black"}}>{item?.type}</Text>
                  <Text style={{fontWeight:"400",fontSize:12,color:"grey"}}>{item?.subTitle}</Text>
                </View>
                {customButton(index)}
            </View>
            }
            />
            </>
        )
    }

    function renderButton(){
        return(
            <TouchableOpacity onPress={()=>{props?.onClose()}} style={{backgroundColor:"#86d1ea",height:50,width:"100%",justifyContent:"center",alignItems:"center",marginVertical:15}}>
            <Text style={{color:"white",fontSize:16,fontWeight:"500",letterSpacing:0.3}}>Done</Text>
            </TouchableOpacity>
        )
    }
return(
    <View style={styles.container}>
      {renderTop()}
      {renderPassengers()}
      {renderButton()}
    </View>
)
}
const styles=StyleSheet.create({
    container:{backgroundColor:"white",borderTopWidth:0.5,borderColor:"#6b6e6d",paddingHorizontal:16,paddingTop:25,borderTopLeftRadius:10,borderTopRightRadius:10},
    textStyle:{color:"black",fontWeight:"700"}
})
export default PassengerModal