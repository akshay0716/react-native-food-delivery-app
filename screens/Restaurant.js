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
  const scrollX = new Animated.Value(0);
  const [item, setRestaurant] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const {item, initialCurrentLocation} = route.params;
    console.log('item', item);
    setRestaurant(item);
    setLocation(initialCurrentLocation);
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
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
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
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    flexDirection: 'row',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
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
                      // width: 50,
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
              {/* name and description */}
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 30,
                }}>
                <Text style={{...FONTS.h2, color: COLORS.black}}>
                  {item.name} - {item.price.toFixed(2)}
                </Text>
                <Text style={{...FONTS.body3}}>{item.description}</Text>
              </View>
              {/* calories */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={icons.fire}
                  style={{width: 20, height: 20, marginRight: 10}}></Image>
                <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                  {item.calories.toFixed(2)} Cal
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPossition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {item?.menu.map((item, index) => {
            const opacity = dotPossition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPossition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPossition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>
              Items in cart
            </Text>
            <Text style={{...FONTS.h3, color: COLORS.black}}>$ 46.00</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}></Image>
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                Location
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: 10, ...FONTS.h4}}>8888</Text>
            </View>
          </View>
          {/* order button */}
          <View
            style={{
              padding: SIZES.padding,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: item,
                  location,
                })
              }
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
