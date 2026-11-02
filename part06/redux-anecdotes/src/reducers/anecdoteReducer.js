import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    toggleVote(state, action) {
      const updatedAnec = action.payload;
      return state.map((anec) =>
        anec.id !== updatedAnec.id ? anec : updatedAnec,
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { setAnecdotes, createAnecdote, toggleVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteToggle = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote);
    dispatch(toggleVote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
