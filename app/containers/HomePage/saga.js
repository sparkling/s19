import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as cache from 'service/CacheService';
import * as api from 'service/ApiService';
import uuid from 'uuid';
import {
  parseDatesShallow,
  parseDateShallow,
} from 'service/IdeasService';

import {
  LOAD_IDEAS,
  LOAD_IDEAS_SUCCEEDED,
  LOAD_IDEAS_FAILED,
  SAVE_IDEA,
  SAVE_IDEA_SUCCEEDED,
  SAVE_IDEA_FAILED,
  ADD_IDEA,
  ADD_IDEA_SUCCEEDED,
  DELETE_IDEA,
  DELETE_IDEA_SUCCEEDED,
} from './constants';

function handleError(e) {
  // FIXME
  /* eslint-disable no-console */
  console.log(e);
}

function* load() {
  let ideas = cache.getIdeas();
  try {
    if (!ideas) {
      ideas = parseDatesShallow(yield call(api.fetchIdeas));
      cache.setIdeas(ideas);
    }
    yield put({ type: LOAD_IDEAS_SUCCEEDED, ideas });
  } catch (e) {
    handleError(e);
    yield put({ type: LOAD_IDEAS_FAILED, message: e.message });
  }
}

function* create() {
  try {
    const idea = parseDateShallow(yield call(api.newIdea));
    cache.addIdea(idea);
    yield put({ type: ADD_IDEA_SUCCEEDED, idea });
  } catch (e) {
    handleError(e);
    // served from cache
    const idea = {
      id: `-${uuid()}`,
      createdOn: new Date(),
    };
    cache.addIdea(idea);
    yield put({ type: ADD_IDEA_SUCCEEDED, idea });
    // yield put({ type: ADD_IDEA_FAILED, message: e.message });
  }
}

function* save(action) {
  try {
    cache.saveIdea(action.idea);
    yield call(api.saveIdea, action.idea);
    yield put({ type: SAVE_IDEA_SUCCEEDED });
  } catch (e) {
    handleError(e);
    // served from cache
    yield put({ type: SAVE_IDEA_FAILED });
    // yield put({ type: SAVE_IDEA_FAILED, message: e.message });
  }
}

function* deleteIt(action) {
  try {
    cache.removeIdea(action.id);
    yield call(api.deleteIdea, action.id);
    yield put({ type: DELETE_IDEA_SUCCEEDED, idea: action.idea });
  } catch (e) {
    handleError(e);
    // served from cache
    yield put({ type: DELETE_IDEA_SUCCEEDED, idea: action.idea });
    // yield put({ type: DELETE_IDEA_FAILED, message: e.message });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(LOAD_IDEAS, load),
    takeLatest(SAVE_IDEA, save),
    takeLatest(ADD_IDEA, create),
    takeLatest(DELETE_IDEA, deleteIt),
  ]);
}
