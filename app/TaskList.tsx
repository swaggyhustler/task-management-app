import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Fontisto from '@expo/vector-icons/Fontisto';
import {data} from '@/constants/data'
import {Entypo} from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import { Link, RelativePathString } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type TaskItemProps = {
  taskItem: typeof data[0];
};

const TaskItem: React.FC<TaskItemProps> = ({taskItem}) => {

    const bgColor = {
        backgroundColor: ""
    }

    if(taskItem.priority==='High'){
        bgColor.backgroundColor='#fb6107'
    }else if(taskItem.priority==='Medium'){
        bgColor.backgroundColor='#dda15e'
    }else{
        bgColor.backgroundColor='#9ef01a'
    }

    return <View style={{padding: 15, gap: 15, borderWidth: 2, borderColor: 'grey', borderRadius: 20, marginHorizontal: 20, marginVertical: 10, backgroundColor: taskItem.status==='Completed'?'#99d98c':''}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{taskItem.title}</Text>
            <Entypo name="dots-three-horizontal" size={18} color="black" />
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={{borderWidth: 1, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 5, fontSize: 12, fontWeight: 'bold', ...bgColor}}>{taskItem.priority}</Text>
            <Text style={{borderWidth: 1, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 5, fontSize: 12, fontWeight: 'bold'}}>Medium</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text><Fontisto name="date" size={18} color="black" /> {taskItem.date}</Text>
            <Text>Comments, Link...</Text>
        </View>
    </View>
}

const TaskList = () =>{

    const todo = useSelector((state: RootState)=>state.todo);

    const [tasks, setTasks] = useState<typeof data>([])
    const [active, setActive] = useState("All");

    const filterTodos = (status: string) => {
        if(status==='All'){
            // const filteredList = todo.sort((a,b)=>b.id - a.id)
             const filteredList = [...todo].sort((a, b) => b.id - a.id);
            setTasks(filteredList)
        }else{
            setTasks([...todo].filter((item)=>item.status===status).sort((a,b)=>b.id-a.id))
        }
    }
    

    useEffect(()=>{
        // setTasks(data);
        const filteredList = [...todo].sort((a, b) => b.id - a.id);
        setTasks(filteredList)
    }, [todo])

    const handleLinkPress = (status: string) =>{
        filterTodos(status);
        setActive(status)
    }

    const linkColor = StyleSheet.create({
        linkBGColor: {
            backgroundColor: 'black',
            color: 'white'
        },
        textColor: {
            color: 'white'
        }
    })

    return <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10, padding: 10}}>
                
                <TouchableOpacity onPress={()=>handleLinkPress('All')} style={[styles.scrollTab, active==='All'? linkColor.linkBGColor : ""]}><Text style={active==='All'? linkColor.textColor: ""}>All</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleLinkPress('InProgress')} style={[styles.scrollTab, {backgroundColor: active==='InProgress' ? 'black': 'white'}]}><Text style={active==='InProgress'? linkColor.textColor: ""}>In Progress</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleLinkPress('Completed')} style={[styles.scrollTab, {backgroundColor: active==='Completed' ? 'black': 'white'}]}><Text style={active==='Completed'? linkColor.textColor: ""}>Completed</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleLinkPress('OnHold')} style={[styles.scrollTab, {backgroundColor: active==='OnHold' ? 'black': 'white'}]}><Text style={active==='OnHold'? linkColor.textColor: ""}>On Hold</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleLinkPress('InReview')} style={[styles.scrollTab, {backgroundColor: active==='InReview' ? 'black': 'white'}]}><Text style={active==='InReview'? linkColor.textColor: ""}>In Review</Text></TouchableOpacity>

            </ScrollView>
            <ScrollView style={{paddingBottom: 10}}>
                {tasks.map((item)=><TaskItem taskItem={item} key={item.id}/>)}
            </ScrollView>
        </View>
        <Link href={"/AddTask" as RelativePathString} asChild>
            <TouchableOpacity style={styles.addIconContainer}>
                <Entypo name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
        </Link>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    scrollTab: {
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
        // padding: 10,
        height: 40,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 30,
        backgroundColor: '#AE75DA',
        padding: 15,
        borderRadius: 20
    }
})

export default TaskList;