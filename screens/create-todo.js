import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TButton from "../components/TButton";

const CreateTodo = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveTodo = async () => {
        if (title.trim() === '' || description.trim() === '') {
            Alert.alert('Error', 'Please enter all the inputs.');
            return;
        }
        const newTodo = {
            id: String(Date.now()), 
            title: title.trim(),
            description: description.trim(),
            finished: false
        };

        try {
            const existingTodos = await AsyncStorage.getItem('todos');
            let todos = [];
            if (existingTodos) {
                todos = JSON.parse(existingTodos);
            }
            todos.push(newTodo);
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
            Alert.alert('Success', 'Todo Added Successfully.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Error saving todo:', error);
            Alert.alert('Error', 'Failed to add todo. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter title"
                        placeholderTextColor="#DE9A8B"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Enter description"
                        placeholderTextColor="#DE9A8B"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TButton onPress={() => navigation.goBack()} icon={'backward'}>Back</TButton>
                <TButton  onPress={saveTodo} icon={'save'}>Save</TButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        borderBottomColor: "#dadada",
        borderBottomWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        backgroundColor: "#DE9A8B",
    },
    body: {
        flex: 9,
        padding: 10
    },
    footer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        borderTopColor: "#dadada",
        borderTopWidth: 2,
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
        fontFamily: "sans-serif",
    },
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
    label: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight:'700',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#DE9A8B',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    multilineInput: {
        height: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase',
        marginLeft: 8,
    },
});

export default CreateTodo;
