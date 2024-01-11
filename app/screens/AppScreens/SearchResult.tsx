import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal'
import { cabinBagIcon, closeIcon, downIcon, listDownIcon, luggageIcon, teaIcon, toiletIcon } from '../../../assets/Svg/FlightSearchIcon';
import { SvgXml } from 'react-native-svg';
import moment from 'moment';
const { width } = Dimensions.get("window")
function SearchResult(props: any) {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [sortPrice, setSort] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const [showModal, setModal] = useState(false);
  const [airplaneCodes, setCode] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [modifyCode, setModify] = useState("")
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (!!fullData) {
      fullData.forEach((item: any) => {
        const val = item?.displayData?.airlines[0]?.airlineCode
        if (airplaneCodes?.indexOf(val) == -1) {
          const codes = airplaneCodes;
          codes.push(val)
          setCode(codes)
        }
      })
    }
  }, [fullData])
  async function fetchData() {
    try {
      const response = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7");
      const res = await response.json();
      setData(res?.data?.result.filter((item: any, index: any) => item?.displayData?.source?.airport?.cityName == props?.route?.params?.from && item?.displayData?.destination?.airport?.cityName == props?.route?.params?.to));
      setFullData(res?.data?.result.filter((item: any, index: any) => item?.displayData?.source?.airport?.cityName == props?.route?.params?.from && item?.displayData?.destination?.airport?.cityName == props?.route?.params?.to));
      setLoader(false);
    }
    catch (err) {
      console.log(err);
      setLoader(false)
    }
  }

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer} onPress={() => {
            props?.navigation?.goBack()
          }}>
          <SvgXml xml={downIcon} height={20} width={20} />
        </TouchableOpacity>
        <View style={{ marginLeft: 30 }}>
          <Text style={styles.headerTitle}>{`${props?.route?.params?.from} -> ${props?.route?.params?.to}`}</Text>
          <Text style={styles.headerSubtitle}>{`${moment(props?.route?.params?.date).format("DD MMM")} || ${props?.route?.params?.number} Pax `}</Text>
        </View>
      </View>
    )
  }
  function renderRow({ item, index }: any) {
    return (<TouchableOpacity
      onPress={() => {
        if (selectedIndex == index) {
          setSelectedIndex(-1)
        }
        else {
          setSelectedIndex(index)
        }
      }}
      style={styles.rowContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.airplaneName}>{item?.displayData?.airlines[0]?.airlineName}</Text>
        <Text style={styles.airplaneCode}>{` (${item?.displayData?.airlines[0]?.airlineCode})`}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.timeText}><Text style={{ color: "black", fontWeight: "600" }}>{moment(item?.displayData?.source?.depTime).format("hh:mm")}</Text>{` (T${item?.displayData?.source?.airport?.terminal})`}</Text>
            <Text style={styles.cityName}>{item?.displayData?.source?.airport?.cityName}</Text>
          </View>
          <Text>{'  ---  '}</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.durationText}>{item?.displayData?.totalDuration}</Text>
            <Text style={styles.stopText}>{item?.displayData?.stopInfo}</Text>
          </View>
          <Text>{'  ---  '}</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.timeText}><Text style={{ color: "black", fontWeight: "600" }}>{moment(item?.displayData?.destination?.arrTime).format("hh:mm")}</Text>{` (T${item?.displayData?.destination?.airport?.terminal})`}</Text>
            <Text style={styles.cityName}>{item?.displayData?.destination?.airport?.cityName}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.fairContainer}>
            <Text style={styles.fareText}>{`₹ ${item?.fare}`}</Text>
            <Text style={styles.perPersonText}>per person</Text>
          </View>
          <SvgXml xml={listDownIcon} height={15} width={15} />
        </View>
      </View>
      {selectedIndex == index && <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row" }}>
          <View >
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <SvgXml xml={luggageIcon} height={15} width={15} />
              <Text style={styles.infoText}>30 Kg Check-in Bag</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <SvgXml xml={teaIcon} height={15} width={15} />
              <Text style={styles.infoText}>FREE Meal</Text>
            </View>
          </View>
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <SvgXml xml={cabinBagIcon} height={15} width={15} />
              <Text style={styles.infoText}>7 Kg Cabin Bag</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <SvgXml xml={toiletIcon} height={15} width={15} />
              <Text style={styles.infoText}>FREE Standard Seat</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.bookNowButton} onPress={
          () => {
            props?.navigation?.navigate("PassengersDetail", { number: props?.route?.params?.number, airCraftName: item?.displayData?.airlines[0]?.airlineName })
          }
        }>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>}
    </TouchableOpacity>
    )
  }
  function renderList() {
    return (

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
      />

    )
  }
  function renderModify() {
    return (
      <View style={styles.modifyContainer}>
        <TouchableOpacity
          onPress={() => {
            // setLoader(true)
            if (sortPrice) {
              setData(fullData)
            }
            else {
              setData(data.sort((a: any, b: any) => a?.fare - b?.fare));
            }
            setSort(!sortPrice)
            setModify("")
          }}
          style={[styles.sortContainer, { backgroundColor: sortPrice ? "#88fbaf" : "#e2f3f9" }]}>
          <Text style={styles.priceSortText}>Price Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modifyButton} onPress={() => setModal(true)}>
          <Text style={styles.modifyText}>Modify</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function renderLoader() {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={"large"} />
        <Text style={styles.loaderTitle}>Keep your seatbelts fastend!</Text>
        <Text style={styles.loaderSubtitle}>Loading Best Fares..</Text>
      </View>
    )
  }

  function renderModal() {
    return (
      <Modal
        backdropOpacity={0.5}
        onBackdropPress={() => setModal(false)}
        style={styles.modalContainer}
        isVisible={showModal}
        animationInTiming={400}
        animationOutTiming={400}
      >
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <SvgXml xml={closeIcon} height={30} width={30} />
          </TouchableOpacity>
          <Text style={styles.filterByCodeHeader}>Filter By Airplane Codes</Text>
          <FlatList
            numColumns={4}
            data={airplaneCodes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setData(fullData.filter((data: any) => data?.displayData?.airlines[0]?.airlineCode == item));
                    setModify(item)
                    setModal(false);
                    setSort(false)
                  }} style={{ borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, margin: 10, backgroundColor: modifyCode == item ? "#88fbaf" : "transparent" }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )
            }}
          />

        </View>
      </Modal>

    )
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {isLoader ?
        renderLoader() :
        data.length == 0 ?
          <View style={styles.noflightContainer}>
            <Text style={styles.noflightText}>No Flights Found</Text>
            <Text style={styles.noflightSubtitle}>Please change the search criteria</Text>
          </View> :
          <View style={{ flex: 1 }}>
            {renderModify()}
            {renderList()}
          </View>}
      {renderModal()}
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  textStyle: { color: "black", fontWeight: "700" },
  backContainer: { marginLeft: 10, height: 30, width: 30, justifyContent: "center", alignItems: "center", transform: [{ rotate: "90deg" }] },
  airplaneName: { fontWeight: "500", color: "#86d1ea", letterSpacing: 0.1, fontSize: 15, marginBottom: 5 },
  airplaneCode: { fontWeight: "500", color: "#86d1ea", letterSpacing: 0.1, fontSize: 15, marginBottom: 5 },
  noflightContainer: { flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
  noflightText: { fontSize: 20, color: "black", fontWeight: "700", letterSpacing: 0.2 },
  rowContainer: { marginBottom: 5, borderRadius: 20, backgroundColor: "white", padding: 10 },
  durationText: { fontSize: 12, fontWeight: "500" },
  stopText: { fontSize: 10, fontWeight: "400", marginTop: 1 },
  cityName: { fontSize: 13, letterSpacing: 0.1, fontWeight: "400", marginTop: 1 },
  fareText: { fontSize: 15, color: "black", fontWeight: "600", marginRight: 4 },
  perPersonText: { fontSize: 10, color: "grey", fontWeight: "400" },
  fairContainer: { alignItems: "center", marginRight: 5 },
  rightContainer: { flexDirection: "row", alignItems: "center" },
  timeText: { fontSize: 15, letterSpacing: 0.2 },
  infoText: { marginLeft: 5, fontSize: 8, color: "black", fontWeight: "400" },
  infoContainer: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#edfbfc", borderWidth: 0.5, padding: 8, borderRadius: 10 },
  bookNowButton: { backgroundColor: "#86d1ea", height: 40, width: 90, justifyContent: "center", alignItems: "center", borderRadius: 20 },
  bookNowText: { color: "white", fontSize: 12, fontWeight: "500", letterSpacing: 0.3 },
  noflightSubtitle: { fontSize: 15, fontWeight: "400", marginTop: 5 },
  listContentStyle: { paddingVertical: 20, paddingHorizontal: 16, backgroundColor: "#edfbfc" },
  modifyContainer: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingRight: 16, paddingVertical: 15, backgroundColor: "#e2f3f9" },
  priceSortText: { fontSize: 12, color: "grey", fontWeight: "500" },
  modifyText: { fontSize: 16, lineHeight: 20, color: "black", fontWeight: "700" },
  modifyButton: { height: 20, width: 80 },
  sortContainer: { overflow: "hidden", borderWidth: 1, borderRadius: 4, padding: 8, paddingHorizontal: 5, marginRight: 10 },
  filterByCodeHeader: { color: "black", fontSize: 20, letterSpacing: 0.2, fontWeight: "700", marginVertical: 20 },
  modalView: { backgroundColor: "white", minHeight: 200, paddingLeft: 16, paddingTop: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderTitle: { fontSize: 20, letterSpacing: 0.2, color: "black", fontWeight: "700", marginTop: 6 },
  loaderSubtitle: { fontSize: 15, fontWeight: "500", marginTop: 5 },
  modalContainer: { margin: 0, width: width, justifyContent: "flex-end" },
  headerContainer: { flexDirection: "row", alignItems: "center", paddingBottom: 10, borderBottomWidth: 0.5, borderColor: "grey", paddingVertical: 20 },
  headerTitle: { fontWeight: "500", color: "black", fontSize: 16 },
  headerSubtitle: { fontWeight: "400", fontSize: 12 }
})
export default SearchResult

