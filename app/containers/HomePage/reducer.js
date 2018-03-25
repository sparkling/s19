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
  SORT_IDEAS,
} from './constants';

const initialState = fromJS({
  ideas: [],
  changeTrigger: false,
  changeTriggerTarget: 'none',
  msg: undefined,
  sortField: '',
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
      return state.set('message', fromJS(msg)).set('sortField', '');
    }
    case LOAD_IDEAS_SUCCEEDED: {
      return state.set('ideas', fromJS(action.ideas));
    }
    case SORT_IDEAS: {
      const newState = state.set('sortField', action.field);
      if (action.field === 'title') {
        return newState.update('ideas', (arr) => arr.sort((a, b) =>
          (a.get(action.field) ? a.get('title') : '').localeCompare(b.get('title'))));
      } else if (action.field === 'oldToNew') {
        return newState.update('ideas', (arr) => arr.sort((a, b) =>
          a.get('createdOn') - (b.get('createdOn'))));
      } else if (action.field === 'newToOld') {
        return newState.update('ideas', (arr) => arr.sort((a, b) =>
          b.get('createdOn') - (a.get('createdOn'))));
      }
      throw new Error({ message: `unhandled sorting field [${action.field}]` });
    }
    default: {
      return state;
    }
  }
}

export default homePageReducer;
