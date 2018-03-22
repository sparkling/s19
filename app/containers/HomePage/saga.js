import { call, put, takeLatest, all } from 'redux-saga/effects';

import {
  LOAD_IDEAS,
  LOAD_IDEAS_SUCCEEDED,
  LOAD_IDEAS_FAILED,
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

function* loadIdeas() {
  try {
    const ideas = yield call(loadIdeas);
    yield put({ type: LOAD_IDEAS_SUCCEEDED, ideas });
  } catch (e) {
    yield put({ type: LOAD_IDEAS_FAILED, message: e.message });
  }
}

function* newIdea() {
  try {
    const idea = yield call(newIdea);
    yield put({ type: NEW_IDEA_SUCCEEDED, idea });
  } catch (e) {
    yield put({ type: NEW_IDEA_FAILED, message: e.message });
  }
}

function* saveIdea(action) {
  try {
    yield call(saveIdea, action.idea);
    yield put({ type: SAVE_IDEA_SUCCEEDED, idea: action.idea });
  } catch (e) {
    yield put({ type: SAVE_IDEA_FAILED, message: e.message });
  }
}

function* deleteIdea(action) {
  try {
    yield call(deleteIdea, action.idea.get('id'));
    yield put({ type: DELETE_IDEA_SUCCEEDED, idea: action.idea });
  } catch (e) {
    yield put({ type: DELETE_IDEA_FAILED, message: e.message });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(LOAD_IDEAS, loadIdeas),
    takeLatest(SAVE_IDEA, saveIdea),
    takeLatest(DELETE_IDEA, deleteIdea),
    takeLatest(NEW_IDEA, newIdea),
  ]);
}
