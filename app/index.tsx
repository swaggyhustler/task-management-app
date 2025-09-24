import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Entypo} from "@expo/vector-icons";
import { Link } from "expo-router";
// import {data} from '@/constants/data'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Index() {
  const data = useSelector((state: RootState)=>state.todo);

  const counts = {
    inProgress: data.filter((item)=>item.status==="InProgress").length,
    inReview: data.filter((item)=>item.status==="InReview").length,
    onHold: data.filter((item)=>item.status==="OnHold").length,
    completed: data.filter((item)=>item.status==="Completed").length
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={{color: 'black', marginLeft: 30, marginBottom: 10, fontWeight: 'bold', fontSize: 18}}>Profile Summary</Text>
        <View>
          <View style={styles.summaryContainer}>
            <View style={[styles.summaryWrapper, {backgroundColor: '#00b4d8'}]}>
              <View>
                <Text style={styles.summaryText}>{counts.inProgress}</Text>
                <Text style={styles.status}>In Progress</Text>
              </View>
              <View style={styles.options}>
                <Entypo name="dots-three-horizontal" size={18} color="black" />
              </View>
            </View>
            <View style={[styles.summaryWrapper, {backgroundColor: '#c8b6ff'}]}>
              <View>
                <Text style={styles.summaryText}>{counts.inReview}</Text>
                <Text style={styles.status}>In Review</Text>
              </View>
              <View style={styles.options}>
                <Entypo name="dots-three-horizontal" size={18} color="black" />
              </View>
            </View>
            <View style={[styles.summaryWrapper, {backgroundColor: '#ffc600'}]}>
              <View>
                <Text style={styles.summaryText}>{counts.onHold}</Text>
                <Text style={styles.status}>On Hold</Text>
              </View>
              <View style={styles.options}>
                <Entypo name="dots-three-horizontal" size={18} color="black" />
              </View>
            </View>
            <View style={[styles.summaryWrapper, {backgroundColor: '#a5be00'}]}>
              <View>
                <Text style={styles.summaryText}>{counts.completed}</Text>
                <Text style={styles.status}>Completed</Text>
              </View>
              <View style={styles.options}>
                <Entypo name="dots-three-horizontal" size={18} color="black" />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <Link href="/TaskList" style={{borderWidth: 1, padding: 8, borderRadius: 5, color: 'white', backgroundColor: 'black', fontWeight: 'bold', margin: 30}}>
          Task List Page
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  summaryContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 30,
  },
  summaryWrapper: {
    width: '40%',
    height: 150,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryText: {
    color: 'black',
    fontWeight: 500,
    fontSize: 28
  },
  status: {
    fontSize: 12,
    fontWeight: 500
  },
  options: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

