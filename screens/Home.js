import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {icons, images, COLORS, FONTS, SIZES} from './../constants';
import {
  categoryData,
  restaurantData,
  initialCurrentLocation,
} from './dummyData';

export default function Home({navigation}) {
  const [selectedCategory, setSelectedCategories] = useState({});
  const [restaurants, setRestaurants] = useState([]);

  function onSelectCategory(category) {
    // filter restaurants
    let restaurantsList = restaurantData.filter(a =>
      a.categories.includes(category.id),
    );

    setSelectedCategories(category);
    setRestaurants(restaurantsList);
  }

  const getCategoryNameById = categoryId => {
    let category = categoryData.filter(ele => ele.id === categoryId);

    if (category.length > -1) {
      return category[0].name;
    } else {
      return '';
    }
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50, marginTop: 10}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingLeft: SIZES.padding * 2,
            width: 50,
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>Current Location</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingRight: SIZES.padding * 2,
            width: 50,
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainCategories = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => onSelectCategory(item)}
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: SIZES.padding,
            marginTop: 20,
            ...styles.shadow,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{height: 30, width: 30}}
              source={item.icon}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          marginTop: 30,
          paddingLeft: SIZES.padding * 2,
          paddingRight: SIZES.padding * 2,
          marginBottom: SIZES.padding * 2,
        }}>
        <Text style={{...FONTS.h1, color: COLORS.black}}>Main</Text>
        <Text style={{...FONTS.h1, color: COLORS.black}}>Categories</Text>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const renderRestaurantsList = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{marginBottom: SIZES.padding * 2}}
          // navigate to restaurant details
          onPress={() =>
            navigation.navigate('Restaurant', {item, initialCurrentLocation})
          }>
          <View style={{marginBottom: SIZES.padding}}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{width: '100%', height: 200, borderRadius: SIZES.radius}}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.white,
                width: SIZES.width * 0.3,
                height: 50,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.black}}>
                {item.duration}
              </Text>
            </View>
          </View>

          {/* RESTAURANT INFO */}
          <Text style={{...FONTS.body2, color: COLORS.black}}>{item.name}</Text>
          <View style={{marginTop: SIZES.padding, flexDirection: 'row'}}>
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>
            {/* CATEGORIES */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.categories.map((categoryId, index) => {
                return (
                  <View
                    style={{flexDirection: 'row', marginLeft: 10}}
                    key={categoryId}>
                    <Text style={{...FONTS.body3}}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{...FONTS.body3}}> .</Text>
                  </View>
                );
              })}
              {/* PRICE SETCION */}
              <Text style={{marginLeft: 10, ...FONTS.body3}}>$ 15</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 30,
          paddingHorizontal: SIZES.padding * 2,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantsList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
