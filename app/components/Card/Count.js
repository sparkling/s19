import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  MAX_CHARACTER_COUNT,
  WARNING_TRESHOLD_CHARACTER_COUNT_REMAINING,
} from 'service/constants';

const StyledCount = styled.div `
  color: red;
  font-weight: bold;
  font-family: arial;
  position: absolute;
  bottom: 0.5em;
  right: 1em;
`;

const Count = ({ text }) => {
  const count = text ? text.length : 0;
  const remainingCount = (MAX_CHARACTER_COUNT - count) + 1;

  if ((remainingCount <= WARNING_TRESHOLD_CHARACTER_COUNT_REMAINING)) {
    return (
      <StyledCount>{(remainingCount ? '-' : null) + remainingCount}</StyledCount>
    );
  }
  return null;
};

Count.propTypes = {
  text: PropTypes.string,
};

export default Count;
