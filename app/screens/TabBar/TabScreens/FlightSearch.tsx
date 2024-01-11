import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg';
import { calendarIcon, closeIcon, colorProfileIcon, downIcon, infoIcon, notificationIcon, passengerIcon, radioSelected, radioUnselected, switchIcon } from '../../../../assets/Svg/FlightSearchIcon';
import CustomTextInput from '../../../CommonComponents/CustomTextInput';
import SearchModal from '../../AppScreens/SearchModal';
import { useDispatch } from 'react-redux';
import PassengerModal from '../../AppScreens/PassengerModal';
import { appLogo } from '../../../../assets/Svg/SplashIcon';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
const width = Dimensions.get('window').width;
function FlightSearch(props: any) {
  const todayDate = moment(new Date()).format("YYYY-MM-DD")
  const sections = ["One Way", "Round Trip", "Multi City"];
  const stateList = [{
    "cityCode": "BOM",
    "cityName": "Mumbai",
    "countryName": "India",
    "airportName": "Chhatrapati Shivaji International Airport",

  },
  {
    "cityCode": "MAA",
    "cityName": "Chennai",
    "countryName": "India",
    "airportName": "Chennai International Airport",
  },
  {
    "cityCode": "DEL",
    "cityName": "Delhi",
    "countryName": "India",
    "airportName": "Indira Gandhi Airport"
  },
  {
    "cityCode": "BLR",
    "cityName": "Bengaluru",
    "countryName": "India",
    "airportName": "Kempegowda International Airport"
  },
  {
    "cityCode": "IXC",
    "cityName": "Chandigarh",
    "countryName": "India",
    "airportName": "Chandigarh International Airport"
  },
  {
    "cityCode": "JAI",
    "cityName": "Jaipur",
    "countryName": "India",
    "airportName": "Jaipur International Airport"
  },
  {
    "cityCode": "LKO",
    "cityName": "Lucknow",
    "countryName": "India",
    "airportName": "Chaudhary Charan Singh International Airport"
  }
  ];
  const [passengers, setPassengers] = useState([1, 0, 0, 0]);
  const [selectDate, setSelectDate] = useState(todayDate)
  const [sectionIndex, setSectionIndex] = useState(0);
  const [fromModal, setFromModal] = useState(false);
  const [calendarModal, showCalendarModal] = useState(false);
  const [passengerModal, setPassengerModal] = useState(false);
  const [fromFocus, setFromFocus] = useState(true);
  const [fromData, setFromData] = useState(`${stateList[0]?.cityName} (${stateList[0]?.cityCode})`);
  const [toData, setToData] = useState(`${stateList[1]?.cityName} (${stateList[1]?.cityCode})`);

  function modalClose() {
    setFromModal(false);
    setPassengerModal(false)
  }
  function swapFromTo() {
    let data = toData;
    setToData(fromData);
    setFromData(data)

  }
  function renderHeaderButton(icon: any, style?: any) {
    return (<TouchableOpacity style={[styles.headerButton, !!style ? { ...style } : {}]}>
      <SvgXml xml={icon} height={20} width={20} />
    </TouchableOpacity>)
  }
  function renderHeader() {
    return (
      <View>
        <View style={styles.headerContainer}>
          {renderHeaderButton(colorProfileIcon)}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderHeaderButton(notificationIcon, { marginRight: 15 })}
            {renderHeaderButton(infoIcon)}
          </View>
        </View>
        <View style={styles.headerTitleContainer}>
          <SvgXml xml={appLogo} height={30} width={30} />
          <Text style={styles.headerTitleStyle}>JetSetGo</Text>
        </View>
      </View>
    )
  }
  function renderSection(name: string, index: number) {
    const selected = sectionIndex == index
    return (
      <TouchableOpacity onPress={() => setSectionIndex(index)} style={styles.sectionContainer} key={index}>
        <SvgXml xml={selected ? radioSelected : radioUnselected} height={20} width={20} />
        <Text style={{ fontSize: 14, color: selected ? "black" : "grey", fontWeight: selected ? "600" : "400", marginLeft: 6 }}>{name}</Text>
      </TouchableOpacity>
    )
  }
  function renderSectionHeader() {
    return (
      <View style={styles.sectionMainContainer}>
        {sections.map((item, index) => renderSection(item, index))}
      </View>
    )
  }
  function renderTextBox(label: string, value: string) {
    return (
      <TouchableOpacity onPress={() => {
        if (label == 'From') {
          setFromFocus(true)
        }
        else {
          setFromFocus(false)
        }
        setFromModal(true)
      }}
        style={styles.textBoxContainer}>
        <Text style={styles.textBoxLabel}>{label}</Text>
        <View style={styles.textBoxSubContainer}>
          <Text style={styles.textBoxValue}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  function renderTravelDate() {
    return (
      <TouchableOpacity
        onPress={() => {
          showCalendarModal(true)
        }}
        style={{ height: 50, borderColor: "grey", borderWidth: 0.5, marginBottom: 20, paddingLeft: 12, width: "48%" }}>
        <Text style={{ backgroundColor: "white", paddingHorizontal: 5, marginTop: -10, alignSelf: "flex-start", position: "absolute", marginLeft: 12 }}>Travel Date(s)</Text>
        <View style={{ height: 50, alignItems: "center", flexDirection: "row" }}>
          <SvgXml xml={calendarIcon} height={20} width={20} />
          <Text style={{ fontSize: 18, fontWeight: "400", color: "black", letterSpacing: 0.1, marginLeft: 8 }}>{selectDate}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  function renderPassengerBox() {
    return (
      <TouchableOpacity style={{ height: 50, borderColor: "grey", borderWidth: 0.5, marginBottom: 20, paddingHorizontal: 12, width: "48%" }} onPress={() => {
        setPassengerModal(true)
      }}>
        <Text style={{ backgroundColor: "white", paddingHorizontal: 5, marginTop: -10, alignSelf: "flex-start", position: "absolute", marginLeft: 12 }}>Passenger(s)</Text>
        <View style={{ height: 50, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgXml xml={passengerIcon} height={20} width={20} />
            <Text style={{ fontSize: 18, fontWeight: "400", marginLeft: 10, color: "black", letterSpacing: 0.1 }}>
              {passengers.reduce((acc, item) => acc + item)}
            </Text>
          </View>
          <SvgXml xml={downIcon} height={15} width={15} />
        </View>
      </TouchableOpacity>
    )
  }
  function renderDetailForm() {
    return (
      <>
        <View >
          {renderTextBox('From', fromData)}
          {renderTextBox('To', toData)}
          <TouchableOpacity
            onPress={() => {
              swapFromTo()
            }}
            style={{ backgroundColor: "white", borderWidth: 0.5, justifyContent: "center", alignItems: "center", borderRadius: 20, height: 40, width: 40, position: "absolute", right: 10, top: 40 }}>
            <SvgXml xml={switchIcon} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

          {renderTravelDate()}
          {renderPassengerBox()}
        </View>
      </>
    )
  }
  function renderSearchContainer() {
    return (
      <View>
        {renderSectionHeader()}
        {renderDetailForm()}
      </View>
    )
  }
  function renderButton() {
    return (
      <TouchableOpacity onPress={() => {
        props?.navigation?.navigate("SearchResult", {
          date: selectDate,
          number: passengers.reduce((acc, item) => acc + item), from: fromData.split(" ")[0], to: toData.split(" ")[0]
        })
      }} style={styles.buttonContainer}>
        <Text style={styles.buttonTextstyle}>SEARCH FLIGHT</Text>
      </TouchableOpacity>
    )
  }
  function renderModal() {
    return (
      <Modal
        backdropOpacity={0.5}
        onBackdropPress={modalClose}
        style={{ margin: 0, width: width, justifyContent: "flex-end" }}
        isVisible={fromModal || passengerModal}
        animationInTiming={400}
        animationOutTiming={400}
      >
        {fromModal ? <SearchModal visible={fromModal} onClose={modalClose} fromData={fromData} toData={toData} stateList={stateList} setFromData={setFromData} setToData={setToData} setFocus={setFromFocus} focus={fromFocus} />
          : <PassengerModal passengers={passengers} onClose={modalClose} setPassengers={(val: any) => { setPassengers(val) }} />}
      </Modal>
    )
  }
  function dateModal() {
    return (
      <Modal
        style={styles.dateModal}
        isVisible={calendarModal}
        animationInTiming={400}
        animationOutTiming={400}
      >
        <View style={styles.dateModalContainer}>
          <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
            showCalendarModal(false)
          }}>
            <SvgXml xml={closeIcon} height={30} width={30} />
          </TouchableOpacity>
          <Calendar
            initialDate={selectDate}
            minDate={selectDate}
            onDayPress={day => {
              setSelectDate(day.dateString);
              showCalendarModal(false)
            }}
            disableAllTouchEventsForDisabledDays={true}
          />
        </View>
      </Modal>
    )
  }
  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      <View style={styles.contentContainer}>
        {renderSearchContainer()}
        {renderButton()}
      </View>
      {renderModal()}
      {dateModal()}

    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  headerContainer: { width: "100%", padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 0.5 },
  headerButton: { height: 30, width: 30, borderWidth: 0.5, borderRadius: 15, justifyContent: "center", alignItems: "center" },
  headerTitleStyle: { color: "black", fontSize: 20, fontWeight: "600", marginLeft: 5 },
  headerTitleContainer: { position: "absolute", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", flexDirection: "row" },
  contentContainer: { flex: 1, padding: 16 },
  sectionMainContainer: { flexDirection: "row", marginBottom: 30 },
  sectionContainer: { flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "center" },
  dateModalContainer: { flex: 1, backgroundColor: "white" },
  dateModal: { margin: 0, width: width, justifyContent: "flex-end" },
  buttonContainer: { backgroundColor: "#86d1ea", height: 50, width: "100%", justifyContent: "center", alignItems: "center" },
  buttonTextstyle: { color: "white", fontSize: 16, fontWeight: "500", letterSpacing: 0.3 },
  textBoxContainer:{ height: 50, borderColor: "grey", borderWidth: 0.5, marginBottom: 20, paddingLeft: 12, width: "100%" },
  textBoxLabel:{ backgroundColor: "white", paddingHorizontal: 5, marginTop: -10, alignSelf: "flex-start", position: "absolute", marginLeft: 12 },
  textBoxSubContainer:{ height: 50, justifyContent: "center" },
  textBoxValue:{ fontSize: 18, fontWeight: "400", color: "black", letterSpacing: 0.1 }
})
export default FlightSearch