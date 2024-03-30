import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Home = () => {
  const navigation = useNavigation();
  const sets = ["Buy Bread", "Buy Milk", "Buy Eggs"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {sets.map((value, i) => {
          return (
            <Text style={styles.todo_list} key={i}>
              {value}
            </Text>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(`Add New Todo`)}
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
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    margin: 5,
  },
  header: {
    borderBottomColor: "#dadada",
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#DE9A8B",
  },
  footer: {
    borderTopColor: "#dadada",
    borderTopWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    fontFamily: "sans-serif",
  },
  todo_list: {
    padding: 10,
    marginVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f5c5ba",
    color: "#1D2134",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#rgb(117,149,120)",
    minWidth: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFF",
    textTransform: "uppercase",
    marginLeft: 8,
  },
});

export default Home;
