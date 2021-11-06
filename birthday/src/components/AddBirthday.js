import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import firebase from "../utils/firebase";
firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);
export default function AddBirthday(props) {
  const { user, setShowList, setReloadData } = props;
  const [formData, setFormData] = useState({});
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [formError, setFormError] = useState({});
  const [date, setDate] = useState(new Date(Date.now()));
  const hideDatePicker = () => {
    setIsDatePicketVisible(false);
  };
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChangeHandle = (event, value) => {
    const dateBirth = value;
 dateBirth.setHours(0);
 dateBirth.setMinutes(0);
 dateBirth.setSeconds(0);
 setFormData({...formData, dateBirth});
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = () => {
    let errors = {};
    
      const data = formData;
      data.dateBirth.setYear(0);
      db.collection(user.uid)
        .add(data)
        .then(() => {
          setReloadData(true);
          setShowList(true);
        })
        .catch(() => {
          setFormError({ name: true, lastname: true, dateBirth: true });
        });
    
    setFormError(errors);
  };
  return (
    <View style={styles.container}>
      {/* Display the selected date */}
      <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>{date.toUTCString()}</Text>
      </View>
      <TextInput
        style={[styles.input, formError.name && { borderColor: "#940c0c" }]}
        placeholder="Nombre"
        placeholderTextColor="#969696"
        onChange={(e) => onChange(e, "name")}
      />
      <TextInput
        style={[styles.input, formError.lastname && { borderColor: "#940c0c" }]}
        placeholder="Apellidos"
        placeholderTextColor="#969696"
        onChange={(e) => onChange(e, "lastname")}
      />

      {/* The button that used to trigger the date picker */}
      {!isPickerShow && (
        <View style={styles.btnContainer}>
          <Button title="Show Picker" color="purple" onPress={showPicker} />
        </View>
      )}
      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.addButton}>Crear cumpleaños</Text>
      </TouchableOpacity>
      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onChangeHandle}
          style={styles.datePicker}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    color: "#fff",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#1e3040",
  },
  datepicker: {
    justifyContent: "center",
  },
  addButton: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#1e3040",
  },
});
