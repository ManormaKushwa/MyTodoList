import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateTodo = () => {

    const navigation = useNavigation();
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add New Todo</Text>
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput style={styles.input} placeholder="Enter title" />
                </View>
                <View>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Enter description"
                        multiline
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
                <TouchableOpacity onPress={() => { }}>
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
