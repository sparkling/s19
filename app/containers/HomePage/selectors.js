import { createSelector } from 'reselect';

const selectHomePageDomain = () => (state) => state.get('homePage');

const makeSelectIdeas = () => createSelector(
  selectHomePageDomain(),
  (hp) => hp.get('ideas')
);

const makeSelectMessage = () => createSelector(
  selectHomePageDomain(),
  (hp) => hp.get('message')
);

export {
  makeSelectIdeas,
  makeSelectMessage,
};
