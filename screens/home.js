import React, { useState, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();
    const [todos, setTodos] = useState([]);

    // Function to fetch todos from AsyncStorage
    const fetchTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos).map(todo => ({ ...todo, expanded: false })));
            } else {
                setTodos([]); // Set todos to an empty array if no todos are found
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            Alert.alert('Error', 'Failed to fetch todos. Please try again.');
        }
    };

    // Use useFocusEffect hook to refetch todos when the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchTodos(); // Call fetchTodos when the screen is focused
        }, [])
    );

    const handleAddTodo = () => {
        navigation.navigate('Add New Todo');
    };

    const toggleTodoExpansion = (todoId) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, expanded: !todo.expanded } : todo
            )
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Todo List</Text>
            </View>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.todoContainer}
                        onPress={() => toggleTodoExpansion(item.id)}
                    >
                        <Text style={styles.todoTitle}>{item.title} <Icon name="times" size={20} /></Text>
                        {item.expanded && (
                            <View>
                                <Text style={styles.todoDescription}>{item.description}</Text>
                                <Icon name="times" size={20} />
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scrollView}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
                    <Icon name="plus" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonLabel}>Add New Todo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        paddingTop: 2
    },
    scrollView: {
        margin: 5,
    },
    header: {
        borderBottomColor: '#dadada',
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#DE9A8B',
    },
    footer: {
        borderTopColor: '#dadada',
        borderTopWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#fff',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'sans-serif',
    },
    todoContainer: {
        padding: 10,
        marginVertical: 3,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f5c5ba',
        backgroundColor: '#fff',
    },
    todoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D2134',
    },
    todoDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#75-95-78',
        minWidth: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFF',
        textTransform: 'uppercase',
        marginLeft: 8,
    },
});

export default Home;
