import { fromJS } from 'immutable';
import {
  updateObjectInArray,
  removeMatchingItem,
} from 'service/ImmutableServices';
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
  msg: undefined,
});

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
      return state.update('ideas', (arr) => updateObjectInArray(
        arr, action.id, action.property, action.value));
    }
    case SAVE_IDEA_SUCCEEDED: {
      const lastMsg = state.get('message');
      const msg = {
        id: lastMsg ? lastMsg.get('id') + 1 : 1,
        msg: 'Saved',
      };
      return state.set('message', fromJS(msg));
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
