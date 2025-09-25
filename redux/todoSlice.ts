import { createSlice } from "@reduxjs/toolkit";
import {data} from '@/constants/data'

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  date: string;
  status: "InProgress" | "InReview" | "OnHold" | "Completed";
};

const initialState: Task[] = [
    ...data
]

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, actions)=>{
            state.push(actions.payload);
        },
        editTodo: (state, actions)=>{
            const index = state.findIndex((todo)=>todo.id===parseInt(actions.payload.id));
            state[index] = {...actions.payload};
        },
        removeTodo: (state, actions)=>{
            state.filter((item)=>item.id!==actions.payload);
        }
    }
})

export default todoSlice.reducer;

export const {addTodo, removeTodo, editTodo} = todoSlice.actions;