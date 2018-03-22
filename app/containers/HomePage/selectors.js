import { createSelector } from 'reselect';

const selectHomePageDomain = () => (state) => state.get('homePage');

const makeSelectIdeas = () => createSelector(
  selectHomePageDomain(),
  (hp) => hp.get('ideas')
);

export {
  makeSelectIdeas,
};
