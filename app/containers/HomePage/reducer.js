import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_IDEAS_SUCCEEDED,
  UPDATE_IDEA,
  SAVE_IDEA_SUCCEEDED,
  ADD_IDEA_SUCCEEDED,
  DELETE_IDEA,
} from './constants';

const initialState = fromJS({
  ideas: [],
  changeTrigger: false,
  changeTriggerTarget: 'none',
});

function removeMatchingItem(array, property, value) {
  return array.filter((item) => item.get(property) !== value);
}

function updateObjectInArray(array, action) {
  return array.map((item) => {
    if (item.get('id') !== action.id) {
      return item;
    }
    return item.set(action.property, action.value);
  });
}

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return state;
    }
    case ADD_IDEA_SUCCEEDED: {
      return state.update('ideas', (arr) => arr.push(fromJS(action.idea)));
    }
    case DELETE_IDEA: {
      return state.update('ideas', (arr) => removeMatchingItem(arr, 'id', action.id));
    }
    case UPDATE_IDEA: {
      return state.update('ideas', (arr) => updateObjectInArray(arr, action));
    }
    case SAVE_IDEA_SUCCEEDED: {
      console.log('saved');
      return state;
    }
    case LOAD_IDEAS_SUCCEEDED: {
      return state.set('ideas', fromJS(action.ideas));
    }
    default: {
      return state;
    }
  }
}

export default homePageReducer;
