import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Favorite: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Favorite </Text>
        </View>
    );
};

export default Favorite;

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
