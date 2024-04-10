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
    const [localtodos, setlocalTodos] = useState([]);
    const sets = ["Buy Bread", "Buy Milk", "Buy Eggs"];

    const fetchTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (JSON.parse(storedTodos).length != 0) {
                setTodos(JSON.parse(storedTodos).map(todo => ({ ...todo, expanded: false })));
            } else {
                setlocalTodos(
                    sets.map((title, index) => ({
                        id: index + 1,
                        title,
                        description: '',
                        expanded: false,
                        finished: false,
                        local: true
                    }))
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch todos. Please try again.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTodos();
        }, [])
    );
    
    useEffect(() => {
        AsyncStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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

    const handleFinishTodo = async (todoId) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, finished: true } : todo
            )
        );
    };

    const handleDeleteTodo = async (todoId) => {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Todo List</Text>
            </View>
            <FlatList
                data={todos.length === 0 ? localtodos : todos }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.todoContainer} onPress={() => toggleTodoExpansion(item.id)}>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.todoTitle}>{item.title}</Text>
                            {item.expanded ? (
                                <Icon name="caret-up" size={20} style={styles.icon} />
                            ) : (
                                <Icon name="caret-down" size={20} style={styles.icon} />
                            )}
                        </View>
                        {item.expanded && (
                            <View style={styles.expandedContent}>
                                <Text style={styles.todoDescription}>{item.description}</Text>

                                {item.finished === false ? (
                                    <View style={styles.controlPanel}>
                                        <TouchableOpacity
                                            style={styles.todobutton}
                                            onPress={() => handleFinishTodo(item.id)}
                                        >
                                            <Icon name="check-circle" size={20} color="#DE9A8B" />
                                            <Text style={styles.todobuttonLabel}>Complete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.todobutton}
                                            onPress={() => handleDeleteTodo(item.id)}
                                        >
                                            <Icon name="trash-o" size={20} color="#DE9A8B" />
                                            <Text style={styles.todobuttonLabel}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.controlPanel}>
                                        <TouchableOpacity
                                            style={styles.todobutton}
                                            onPress={() => handleDeleteTodo(item.id)}
                                        >
                                            <Icon name="trash-o" size={20} color="#DE9A8B" />
                                            <Text style={styles.todobuttonLabel}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scrollView}
            />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddTodo}
                >
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
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#759578',
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
    bodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    todoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D2134',
        flex: 1,
        marginRight: 8,
    },
    icon: {
        color: 'black', // Optional: Set icon color
    },
    todoDescription: {
        fontSize: 14,
        color: '#777',
        flex: 1,
        marginRight: 8,
    },
    controlPanel: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
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
        // color: '#FFF',
        textTransform: 'uppercase',
        marginLeft: 8,
    },
});

export default Home;
