import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cart: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Cart </Text>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
});
