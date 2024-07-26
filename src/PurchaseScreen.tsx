import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

interface Product {
  productId: string;
  title: string;
  description: string;
  price: string;
}

const fakeProducts: Product[] = [
  { productId: 'product1', title: 'Product 1', description: 'Description for product 1', price: '$1.99' },
  { productId: 'product2', title: 'Product 2', description: 'Description for product 2', price: '$2.99' },
];

const PurchaseScreen: React.FC = () => {
  const [products] = useState<Product[]>(fakeProducts);
  const [purchasedProductIds, setPurchasedProductIds] = useState<string[]>([]);

  const handlePurchase = (productId: string) => {
    Alert.alert(
      "Purchase Confirmation",
      "Do you want to buy this product?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            setPurchasedProductIds([...purchasedProductIds, productId]);
            Alert.alert("Purchase Successful", "Thank you for your purchase!");
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>In-App Purchases</Text>
      {products.map((product) => (
        <View key={product.productId} style={styles.productContainer}>
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
          {purchasedProductIds.includes(product.productId) ? (
            <Text style={styles.purchasedText}>Purchased</Text>
          ) : (
            <Button title="Buy" onPress={() => handlePurchase(product.productId)} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
  },
  productContainer: {
    marginBottom: responsiveHeight(3),
    padding: responsiveWidth(4),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: responsiveFontSize(2),
    color: '#555',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: responsiveFontSize(2.2),
    color: '#000',
    marginVertical: responsiveHeight(2),
  },
  purchasedText: {
    fontSize: responsiveFontSize(2.2),
    color: 'green',
  },
});

export default PurchaseScreen;
