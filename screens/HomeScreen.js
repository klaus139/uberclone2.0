import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";


const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://img.freepik.com/free-vector/branding-identity-corporate-c-logo-vector-design-template_460848-13936.jpg?w=740&t=st=1673957177~exp=1673957777~hmac=586f045edf5b5bb534a8551539efe410b3f3b1c3b76ec38cedaa8f845287295b" }}
        />
        <GooglePlacesAutocomplete //this is the search bar that enables the autocomplete when typing
        placeholder="Where from?"
        styles={{
            container:{
                flex: 0,
            },
            textInput: {
                fontSize: 18,
            },
        }}
        enablePoweredByContainer={false}
        returnKeyType={"search"}
        fetchDetails={true}
        onPress={(data, details = null)=>{
            dispatch(setOrigin({
                location: details.geometry.location,//this gives the location of the place in long and lat
                description: data.description, //this gives the name of the place
            }))
            dispatch(setDestination(null))
            
        }}
        minLength={2}
        query={{
            key:GOOGLE_MAPS_APIKEY,
            language: 'en',
        }}
        nearByPlacesAPI="GooglePlacesSearch"
        debounce={400}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
