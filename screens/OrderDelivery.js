import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  icons,
  images,
  COLORS,
  FONTS,
  SIZES,
  GOOGLE_API_KEY,
} from './../constants';
import MapViewDirections from 'react-native-maps-directions';

export default function OrderDelivery({route}) {
  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const mapView = useRef();

  useEffect(() => {
    const {restaurant, location} = route.params;

    let fromLoc = location.gps;
    let toLoc = restaurant.location;
    let street = location.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude),
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude),
    };

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  const destinationMarker = () => {
    return (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{width: 25, height: 25, tintColor: COLORS.white}}
            />
          </View>
        </View>
      </Marker>
    );
  };

  const carIcon = () => {
    return (
      <Marker coordinate={fromLocation} anchor={{x: 0.5, y: 0.5}} flat={true}>
        <Image source={icons.car} style={{width: 40, height: 40}} />
      </Marker>
    );
  };

  function renderMap() {
    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          initialRegion={region}
          style={{flex: 1}}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={'AIzaSyD_lMXvGFGsiO2qhvX7Vs49r-sdICRtrAQ'}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }

  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            // justifyContent: 'center',
          }}>
          <Image
            source={icons.red_pin}
            style={{width: 30, height: 30, marginRight: SIZES.padding}}
          />
          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3, color: COLORS.black}}>
              {streetName}
            </Text>
          </View>
          <Text style={{...FONTS.body3, color: COLORS.black}}>10 min</Text>
        </View>
      </View>
    );
  }

  function renderDeliveryInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 50,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* avatar */}
            <Image
              source={images.avatar_1}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View style={{flex: 1, marginLeft: SIZES.padding}}>
              {/* name and rating */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...FONTS.h4}}>{restaurant?.courier.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={icons.star}
                    style={{width: 18, height: 18, tintColor: COLORS.primary}}
                  />
                  <Text style={{marginLeft: SIZES.padding, ...FONTS.body3}}>
                    {restaurant?.rating}
                  </Text>
                </View>
              </View>
              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                {' '}
                {restaurant?.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.padding * 2,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.body3}}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.body3}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}>
        {/* Zoom In */}
        <TouchableOpacity
          onPress={() => zoomIn()}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body1}}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => zoomOut()}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body1}}> - </Text>
        </TouchableOpacity>

        {/* Zoom Out */}
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderButtons()}
    </View>
  );
}

const styles = StyleSheet.create({});
