import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../services/firebase';

const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching documents: ", err);
  }
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  try {
    const docRef = await addDoc(collection(db, "todos"), todo);
    return { id: docRef.id, ...todo };
  } catch (err) {
    console.error("Error adding document: ", err);
  }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  try{
    const docRef = doc(db, "todos", todo.id);
    await updateDoc(docRef, { title:todo.title, completed: todo.completed });
    return todo;
  }catch(err){
    console.error("Error updating document: ", err);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  try{
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    return id;
  }catch(err){
    console.error("Error deleting document: ", err);  
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  }
});

export default todosSlice.reducer;
