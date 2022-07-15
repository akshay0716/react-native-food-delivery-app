import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
import {icons, images, COLORS, FONTS, SIZES} from './../constants';
import React, {useEffect, useState} from 'react';

export default function Restaurant({navigation, route}) {
  const [item, setRestaurant] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const {item, initialCurrentLocation} = route.params;
    console.log('item', item);
    setRestaurant(item);
    setLocation(location);
  }, []);

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50, marginTop: 10}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            paddingLeft: SIZES.padding * 2,
            width: 50,
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{item?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingRight: SIZES.padding * 2,
            width: 50,
          }}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={5}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={true}>
        {item?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            {/* FOOD IMAGE */}
            <View style={{height: SIZES.height * 0.35}}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{width: SIZES.width, height: '100%'}}
              />

              {/* QUANTITY SECTION */}

              <View
                style={{
                  position: 'absolute',
                  height: 50,
                  bottom: -20,
                  width: SIZES.width,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    width: 50,
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}>
                  <Text style={{...FONTS.body1}}> - </Text>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    backgroundColor: COLORS.white,
                  }}>
                  <Text style={{...FONTS.h2}}>5</Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    width: 50,
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}>
                  <Text style={{...FONTS.body1}}> + </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
