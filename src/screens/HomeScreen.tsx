import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import ProductCarousel from '../components/ProductCarousel';
import { BANNERS } from '../data/banners';
import { PRODUCTS } from '../data/products';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FourGridCarousel from '../components/FourGridCarousel';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Custom Header */}
      {/* <Header
        title="Noon"
        rightIcon="search-outline"
        onRightPress={() => navigation.navigate('Search' as never)}
      /> */}

      <SearchBar
        editable={false}
        onPress={() => navigation.navigate('Search' as never)}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <BannerCarousel banners={BANNERS} />

        <ProductCarousel
          title="Featured"
          products={PRODUCTS}
          onPressProduct={p =>
            navigation.navigate('ProductDetails', {
              productId: p.id,
            } as never)
          }
        />

        <FourGridCarousel
          title="Things you might like"
          data={[
            { id: '1', name: 'Item One' },
            { id: '2', name: 'Item Two' },
            { id: '3', name: 'Item Three' },
            { id: '4', name: 'Item Four' },
            { id: '5', name: 'Item Five' },
            { id: '6', name: 'Item Six' },
            { id: '7', name: 'Item Seven' },
            { id: '8', name: 'Item Eight' }            
          ]}
        />

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },

  contentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 40,
  },

  floatingSearch: {
    position: 'absolute',
    bottom: 20,
    right: 16,
  },
});
