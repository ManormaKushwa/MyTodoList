import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ControlButton = ({ onPress, children, icon }) => {
    return (
        <TouchableOpacity
            style={styles.todobutton}
            onPress={onPress}
        >
            <Icon name={icon} size={20} color="#DE9A8B" />
            <Text style={styles.todobuttonLabel}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    todobutton: {
        padding: 7,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#DE9A8B',
        minWidth: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    todobuttonLabel: {
        fontSize: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginLeft: 8,
    },
});

export default ControlButton;