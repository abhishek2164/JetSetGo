import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { SvgXml } from 'react-native-svg';
import { closeIcon, searchIcon } from '../../../assets/Svg/FlightSearchIcon';
import { FlatList, TextInput } from 'react-native-gesture-handler';
function SearchModal(props: any) {
    const [fromValue, setFrom] = useState("");
    const [toValue, setTo] = useState("");
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        if (props?.visible) {
            setFrom(props?.fromData);
            setTo(props?.toData)
        }
    }, [props?.visible])
    const width = Dimensions.get('window').width
    function renderClose() {
        return (
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => {
                    setSearchText("");
                    props?.onClose()
                }}>
                <SvgXml xml={closeIcon} height={30} width={30} />
            </TouchableOpacity>
        )
    }
    function renderTextField(isFrom: boolean) {
        return (
            <View style={styles.textFieldContainer}>
                <Text style={styles.textFieldHeader}>{isFrom ? "FROM" : "TO"}</Text>
                <View style={styles.searchContainer}>
                    <SvgXml xml={searchIcon} height={18} width={18} />
                    <TextInput
                        onChangeText={(val) => {
                            isFrom ? setFrom(val) : setTo(val);
                            setSearchText(val)
                        }}
                        placeholder='Search City'
                        value={isFrom ? fromValue : toValue}
                        onFocus={() => {
                            setSearchText("");
                            if (isFrom) {
                                props?.setFocus(true); setFrom("")
                            }
                            else {
                                props?.setFocus(false); setTo("")
                            }
                        }}
                        onBlur={() => {
                            isFrom ? setFrom(props?.fromData) : setTo(props?.toData)
                        }}
                        style={styles.textInputStyle} cursorColor={"black"} />
                    <TouchableOpacity onPress={() => {
                        isFrom ? setFrom("") : setTo("")
                    }}>
                        <SvgXml xml={closeIcon} height={18} width={18} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                {renderClose()}
                <Text style={styles.headerTitle}>Select Arrival Airport/City</Text>
            </View>
        )
    }
    function renderTop() {
        return (
            <View style={{ borderBottomWidth: 0.5, width: width, paddingHorizontal: 16 }} >
                {renderTextField(true)}
                {renderTextField(false)}
            </View>
        )
    }
    function renderRow({ item, index }: any) {
        return (
            <TouchableOpacity onPress={() => {
                if (props?.focus) {
                    props?.setFromData(`${item?.cityName} (${item?.cityCode})`)
                }
                else {
                    props?.setToData(`${item?.cityName} (${item?.cityCode})`)
                }
                setSearchText("");
                props?.onClose()
            }} style={{ paddingVertical: 10 }}>
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.cityText}>{`${item?.cityName}, ${item?.countryName}`}</Text>
                        <Text style={styles.airportNameStyle}>{item?.airportName}</Text>
                    </View>
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeTextStyle}>{item?.cityCode}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    function renderStateList() {
        return (
            <FlatList
                keyboardShouldPersistTaps={"handled"}
                keyExtractor={(item, index) => index.toString()}
                data={props?.stateList.filter((item: any) => {
                    return item?.cityName?.toLowerCase().includes(searchText.toLowerCase()) && !(item?.cityName?.toLowerCase().includes(props?.fromData?.split(" ")[0].toLowerCase()) || item?.cityName?.toLowerCase().includes(props?.toData?.split(" ")[0].toLowerCase()))
                })}
                style={{ marginTop: 20 }}
                renderItem={renderRow}
            />
        )
    }
    return (

        <View style={{ flex: 1, paddingTop: 16, backgroundColor: "white" }} >
            {renderHeader()}
            {renderTop()}
            {renderStateList()}
        </View>

    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
    textStyle: { color: "black", fontWeight: "700" },
    textFieldContainer: { backgroundColor: "#e4e5e6", marginBottom: 20, paddingHorizontal: 20, paddingVertical: 8 },
    textFieldHeader: { marginLeft: 30, fontSize: 16, letterSpacing: 0.6 },
    headerTitle: { fontSize: 22, color: "black", letterSpacing: 0.1, fontWeight: "700", marginTop: 20, marginBottom: 10 },
    headerContainer: { paddingHorizontal: 16 },
    searchContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    textInputStyle: { marginLeft: 10, fontSize: 20, height: 25, padding: 0, flex: 1, letterSpacing: 0.2 },
    rowContainer: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 },
    cityText: { color: "black", marginBottom: 2, fontWeight: "bold", fontSize: 15 },
    airportNameStyle: { color: "grey", fontWeight: "400", fontSize: 12 },
    codeContainer: { borderWidth: 1, borderColor: "grey", borderRadius: 10, paddingHorizontal: 10, alignSelf: "center" },
    codeTextStyle: { color: "grey", fontWeight: "500", fontSize: 13 }
})
export default SearchModal