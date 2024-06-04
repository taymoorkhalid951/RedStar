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
  const docRef = doc(db, "todos", todo.id);
  await updateDoc(docRef, { completed: todo.completed });
  return todo;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const docRef = doc(db, "todos", id);
  await deleteDoc(docRef);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
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

export const { toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
