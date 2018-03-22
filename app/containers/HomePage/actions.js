import {
  NEW_IDEA,
  DELETE_IDEA,
  SAVE_IDEA,
  UPDATE_IDEA,
  GET_IDEAS,
} from './constants';

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
    type: NEW_IDEA,
  };
}

export function deleteIdea(id) {
  return {
    type: DELETE_IDEA,
    id,
  };
}

export function saveIdea(idea) {
  return {
    type: SAVE_IDEA,
    idea,
  };
}

export function getIdeas() {
  return {
    type: GET_IDEAS,
  };
}
