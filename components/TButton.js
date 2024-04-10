import React from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TButton = ({ onPress, children, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Icon name={icon} size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#rgb(117,149,120)",
    minWidth: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
    marginLeft: 8,
  },
});

export default TButton;