import React, { useEffect, useState } from 'react';
import {
  Dimensions,
    FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal'
import PassengerForm from './PassengerForm';
import { Svg, SvgXml } from 'react-native-svg';
import { downIcon, listDownIcon, successIcon } from '../../../assets/Svg/FlightSearchIcon';
import { CommonActions } from '@react-navigation/native';
function PassengersDetail(props:any){
  const {width}=Dimensions.get("window")
 const [selectedIndex,setIndex]=useState(0);
 const [showModal,setModal]=useState(false);
 const [passArr,setPassArr]=useState([{
   "firstName":"",
   "lastName":"",
   "email":"",
   "phone":""
 }])
 useEffect(()=>{
    setPassArr(Array(props?.route?.params?.number).fill({
        "firstName":"",
        "lastName":"",
        "email":"",
        "phone":""
      }))
 },[])
 function onChange(index:any,key:any,val:any){
    setPassArr( passArr.map((item:any,idx:number)=>{
             if(index == idx){
                const ele= item
             ele[key]=val;
             return ele
             }
             else{
                return {
                    ...item
                }
             }
        })
    )
 }
 function renderHeader(){
   return(
    <View style={{flexDirection:"row",alignItems:"center",paddingBottom:10}}>
        <TouchableOpacity 
        style={{height:30,width:30,justifyContent:"center",alignItems:"center",transform:[{rotate:"90deg"}]}} onPress={()=>{
            props?.navigation?.pop()
        }}>
     <SvgXml xml={downIcon} height={20} width={20}/>
     </TouchableOpacity>
     <View style={{marginLeft:30}}>
     <Text style={{fontWeight:"600",color:"black",fontSize:20}}>{`Add Travellers Details`}</Text>
      <Text style={{fontSize:12,fontWeight:"400"}}>{`for ${props?.route?.params?.airCraftName}`}</Text>
     </View>
     
    </View>
   )
 }
 function renderButton(){
    return(
        <View style={{marginBottom:20,marginHorizontal:16}}>
      <TouchableOpacity onPress={()=>{setModal(true)}} style={{backgroundColor:"#86d1ea",height:50,width:"100%",justifyContent:"center",alignItems:"center"}}>
      <Text style={{color:"white",fontSize:16,fontWeight:"500",letterSpacing:0.3}}>BOOK FLIGHT</Text>
      </TouchableOpacity>
      </View>
    )
  }
  function renderSuccessButton(){
    return(
      <TouchableOpacity onPress={()=>{ 
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'TabScreens' },
            ],
          })
        );

      }} style={{backgroundColor:"#86d1ea",marginTop:20,height:50,width:"90%",justifyContent:"center",alignItems:"center"}}>
      <Text style={{color:"white",fontSize:16,fontWeight:"500",letterSpacing:0.3}}>Book Next Flight</Text>
      </TouchableOpacity>
    )
  }
  function renderModal(){
    return(
      <Modal
      backdropOpacity={0.5}
      onBackdropPress={()=>setModal(false)}
          style={{ margin: 0, width: width}}
          isVisible={showModal}
          animationInTiming={400}
          animationOutTiming={400}
      >
        <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
          
      <SvgXml xml={successIcon} height={150} width={150}/>
          <Text style={{fontSize:22,color:"black",fontWeight:"700",letterSpacing:0.2,marginTop:10}}>{`Successfully Booked ${props?.route?.params?.airCraftName}`}</Text>
          <Text style={{fontSize:16,fontWeight:"400",marginTop:5}}>{`For ${props?.route?.params?.number} Pax`}</Text>

        {renderSuccessButton()}
        </View>
      </Modal>
    )
  }
return(
    <View style={styles.container}>
        {renderHeader()}
        <FlatList
        style={{flex:1}}
        data={passArr}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item,index})=>{
            return(
                <View key={index} style={{marginBottom:2}}>
                <TouchableOpacity 
                style={{backgroundColor:"grey",height:30,alignItems:"center",justifyContent:"space-between",paddingHorizontal:12,flexDirection:"row"}}
                onPress={()=>{
                    if(selectedIndex == index){
                      setIndex(-1)
                    }
                    else{
                  setIndex(index)
                    }
                }}>
                    <Text style={{fontSize:16,fontWeight:"500",color:"white",letterSpacing:0.3}}>
                        {`Add Passengers ${index+1} Details`}
                    </Text>
                    <SvgXml xml={listDownIcon} height={15} width={15}/>
                </TouchableOpacity>
                {selectedIndex == index && 
                <PassengerForm 
                data={passArr[index]}
                index={index}
                onChange={onChange}
                />
                }
                </View>
            )
        }}
        />
        {renderButton()}
        {renderModal()}
    </View>
)
}
const styles=StyleSheet.create({
    container:{flex:1,backgroundColor:"white",paddingTop:24},
    textStyle:{color:"black",fontWeight:"700"}
})
export default PassengersDetail