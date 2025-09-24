import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Task } from "@/constants/data";
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "@/redux/todoSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";


const RadioComp = () => {
  const [value, setValue] = useState('OnHold');
  

  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{alignItems: 'flex-start'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <RadioButton value="InProgress" />
            <Text>In Progress</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <RadioButton value="OnHold" />
            <Text >On Hold</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <RadioButton value="Completed" />
            <Text >Completed</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <RadioButton value="InReview" />
            <Text >In Review</Text>
        </View>
      </View>
    </RadioButton.Group>
  );
};

const AddTask = () =>{
    const router = useRouter();
    const allTodos = useSelector((state: RootState)=>state.todo);

    const [newTodo, setNewTodo] = useState<Task>({
        "id": allTodos.length+1,
        "title": "",
        "completed": false,
        "priority": "Low",
        "date": '24/09/25',
        "status": "InProgress"
    });

    const dispatch = useDispatch();
    const todo = useSelector((state:RootState)=>state.todo)

    const handleSubmit = () =>{
        // newTodo?.status(value)
        dispatch(addTodo(newTodo))
        console.log(todo.length);
        router.push("/TaskList");
    }

    return <SafeAreaView>
        <View style={{padding: 20, gap: 20}}>
            <View style={{backgroundColor: 'white', padding: 10, borderWidth: 1, borderRadius: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Title: </Text>
                <TextInput style={{borderWidth: 1, borderRadius: 5, padding: 5, marginHorizontal: 5, marginTop: 10}} placeholder="Enter title here..." value={newTodo?.title} onChangeText={(text)=>setNewTodo((prev)=>({...prev, "title": text}))} />
            </View>
            <View style={{backgroundColor: 'white', padding: 10, borderWidth: 1, borderRadius: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Status: </Text>
                <RadioComp/>
            </View>
            <View style={{backgroundColor: 'white', padding: 10, borderWidth: 1, borderRadius: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Due Date: </Text>
                <TextInput style={{borderWidth: 1, borderRadius: 5, padding: 5, marginHorizontal: 5, marginTop: 10}} placeholder="Enter your due date here..." value={newTodo?.date} onChangeText={(text)=>setNewTodo((prev)=>({...prev, "date": text}))} />
            </View>
            <TouchableOpacity style={{backgroundColor: 'black', padding: 10, borderRadius: 5}} onPress={handleSubmit}>
                <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Submit</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

export default AddTask;