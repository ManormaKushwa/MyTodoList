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

const CreateTodo = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveTodo = async () => {
        if (title.trim() === '' || description.trim() === '') {
            Alert.alert('Error', 'Please enter all the inputs.');
            return;
        }

        // Create a new todo object
        const newTodo = {
            id: String(Date.now()), // Generate a unique ID (in a real app, use a proper ID generator)
            title: title.trim(),
            description: description.trim(),
            finished: false // Set initial state as not finished
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
            {/* <View style={styles.header}>
                <Text style={styles.title}>Add New Todo</Text>
            </View> */}
            <View style={styles.body}>
                <View>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Enter description"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.button}>
                        <Icon name="times" size={20} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveTodo}>
                    <View style={styles.button}>
                        <Icon name="save" size={14} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
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
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
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
