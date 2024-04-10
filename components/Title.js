import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Title = ({ children }) => {
    return <View style={styles.header}>
        <Text style={styles.title}>{children}</Text>
    </View>;
};

const styles = StyleSheet.create({
    header: {
        borderBottomColor: '#dadada',
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#DE9A8B',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'sans-serif',
    },
});

export default Title;