import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SpalshScreen: React.FC = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}> SpalshScreen </Text>
            </View>
    );
};

export default SpalshScreen;

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
