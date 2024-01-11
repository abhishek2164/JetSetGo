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
function PassengerModal(props: any) {
    const passengersList = [{ type: "Adults", subTitle: "Age Over 12" }, { type: "Senior Citizen(s)", subTitle: "Age Above 60" }, { type: "Children", subTitle: "Age 2 - 12" }, { type: "Infants", subTitle: "3 days to 2 years" }];
    function decrement(index: any) {
        props?.setPassengers((prev: any) => {
            return prev.map((item: any, idx: number) => {
                if (index == idx) {
                    return item - 1
                }
                else {
                    return item
                }
            })
        })
    }
    function increment(index: any) {
        props?.setPassengers((prev: any) => {
            return prev.map((item: any, idx: number) => {
                if (index == idx) {
                    return item + 1
                }
                else {
                    return item
                }
            })
        })
    }
    function renderTop() {
        return (
            <>
                <TouchableOpacity onPress={() => {
                    props?.onClose()
                }}>
                    <SvgXml xml={closeIcon} height={30} width={30} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Passengers</Text>
            </>
        )
    }
    function customButton(index: number) {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    disabled={props?.passengers[index] == 0}
                    onPress={
                        () => {
                            decrement(index)
                        }
                    }
                    style={styles.decrementContainer}
                >
                    <Text style={styles.decrementText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{props?.passengers[index]}</Text>
                <TouchableOpacity
                    onPress={
                        () => {
                            increment(index)
                        }
                    }
                    style={styles.incrementContainer}
                >
                    <Text style={styles.incrementText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderPassengers() {
        return (
            <>
                <FlatList
                    data={passengersList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={styles.rowContainer}>
                            <View>
                                <Text style={styles.typeText}>{item?.type}</Text>
                                <Text style={styles.subTitle}>{item?.subTitle}</Text>
                            </View>
                            {customButton(index)}
                        </View>
                    }
                />
            </>
        )
    }

    function renderButton() {
        return (
            <TouchableOpacity onPress={() => { props?.onClose() }} style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Done</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            {renderTop()}
            {renderPassengers()}
            {renderButton()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: { backgroundColor: "white", borderTopWidth: 0.5, borderColor: "#6b6e6d", paddingHorizontal: 16, paddingTop: 25, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    textStyle: { color: "black", fontWeight: "700" },
    buttonContainer: { backgroundColor: "#86d1ea", height: 50, width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 15 },
    buttonTextStyle: { color: "white", fontSize: 16, fontWeight: "500", letterSpacing: 0.3 },
    rowContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    typeText: { fontWeight: "600", fontSize: 16, color: "black" },
    subTitle: { fontWeight: "400", fontSize: 12, color: "grey" },
    headerTitle: { fontWeight: "800", color: "black", letterSpacing: 0.1, marginTop: 10, marginBottom: 20, fontSize: 25 },
    incrementText: { fontSize: 20, fontWeight: "400", color: "white", marginTop: -3 },
    incrementContainer: { height: 25, width: 25, borderRadius: 13, backgroundColor: "#cbcccc", justifyContent: "center", alignItems: "center" },
    countText: { marginHorizontal: 10, fontSize: 18, fontWeight: "600" },
    decrementText: { fontSize: 20, fontWeight: "800", color: "white", marginTop: -3 },
    decrementContainer: { height: 25, width: 25, borderRadius: 13, backgroundColor: "#cbcccc", justifyContent: "center", alignItems: "center" }
})
export default PassengerModal