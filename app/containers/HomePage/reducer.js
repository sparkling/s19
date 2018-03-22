import { fromJS } from 'immutable';
import uuid from 'uuid/v1';
import {
  DEFAULT_ACTION,
  UPDATE_IDEA,
  GET_IDEAS,
  GET_IDEAS_SUCCEEDED,
  GET_IDEAS_FAILED,
  SAVE_IDEA,
  SAVE_IDEA_SUCCEEDED,
  SAVE_IDEA_FAILED,
  NEW_IDEA,
  NEW_IDEA_SUCCEEDED,
  NEW_IDEA_FAILED,
  DELETE_IDEA,
  DELETE_IDEA_SUCCEEDED,
  DELETE_IDEA_FAILED,
} from './constants';

const initialState = fromJS({
  ideas: [
    {
      id: 1,
      createdOn: '04 Dec 1995 00:12:00 GMT',
      title: 'My title 1',
      body: 'My body 1',
    },
    {
      id: 2,
      createdOn: '04 Dec 1995 00:12:00 GMT',
      title: 'My title 2',
      body: 'My body 2',
    },
    {
      id: 3,
      createdOn: '04 Dec 1995 00:12:00 GMT',
      title: 'My title 3',
      body: 'My body 3',
    },
  ],
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
    case NEW_IDEA: {
      return state.update('ideas', (arr) => arr.push(fromJS({ id: uuid() })));
    }
    case DELETE_IDEA: {
      return state.update('ideas', (arr) => removeMatchingItem(arr, 'id', action.id));
    }
    case UPDATE_IDEA: {
      return state.update('ideas', (arr) => updateObjectInArray(arr, action));
    }
    case GET_IDEAS: {
      break;
    }
    default: {
      return state;
    }
  }
  return state;
}

export default homePageReducer;
