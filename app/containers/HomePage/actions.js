import {
  ADD_IDEA,
  DELETE_IDEA,
  UPDATE_IDEA,
  SAVE_IDEA,
  LOAD_IDEAS,
  SORT_IDEAS,
} from './constants';

export function loadIdeas() {
  return {
    type: LOAD_IDEAS,
  };
}

export function saveIdea(idea) {
  return {
    type: SAVE_IDEA,
    idea,
  };
}

export function sort(field) {
  return {
    type: SORT_IDEAS,
    field,
  };
}

export function updateIdea(id, property, value) {
  return {
    type: UPDATE_IDEA,
    id,
    property,
    value,
  };
}

export function addIdea() {
  return {
    type: ADD_IDEA,
  };
}

export function deleteIdea(id) {
  return {
    type: DELETE_IDEA,
    id,
  };
}
