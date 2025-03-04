import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    id: nanoid(),
    title: "title",
    description: "description",
    completed: false,
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            
        }
    }
});


export default todoSlice.reducer;