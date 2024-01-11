import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomTextInput from '../../CommonComponents/CustomTextInput';
function PassengerForm(props: any) {
  return (
    <View style={styles.container}>
      <CustomTextInput label={"First Name"} index={props?.index} value={props?.data?.firstName} onChange={props?.onChange} name={"firstName"} />
      <CustomTextInput label={"Last Name"} index={props?.index} value={props?.data?.lastName} onChange={props?.onChange} name={"lastName"} />
      <CustomTextInput label={"Email"} index={props?.index} value={props?.data?.email} onChange={props?.onChange} name={"email"} />
      <CustomTextInput label={"Phone"} index={props?.index} value={props?.data?.phone} onChange={props?.onChange} name={"phone"} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16, paddingVertical: 20, backgroundColor: "#edfbfc", borderWidth: 0.5, borderRadius: 20, margin: 5 },
  textStyle: { color: "black", fontWeight: "700" }
})
export default PassengerForm