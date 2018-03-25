import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import deleteIcon from './trash-icon.svg';

const StyledActions = styled.div `
  background-color: #F0F0F0;
  padding: 20px;
  height: 65px;
`;
const Action = styled.a `
  &:hover {
    cursor: pointer;
  }
  font-weight: bold;
  color: #C0281C;
  display: flex;
  align-items: center;
`;
const DeleteText = styled.div `
  padding-top: 5px;
`;
const DeleteIcon = styled.img `
  height: 22px;
  margin-right: 12px;
`;

const Actions = ({ hoverCard, idea, onDeleteIdea }) => (
  <StyledActions>
    {(hoverCard === idea.get('id')) ?
      <Action onClick={(evt) => onDeleteIdea(evt, idea.get('id'))}>
        <DeleteIcon src={deleteIcon} alt="delete" />
        <DeleteText>Delete</DeleteText>
      </Action>
    : null}
  </StyledActions>);

Actions.propTypes = {
  idea: PropTypes.object.isRequired,
  hoverCard: PropTypes.string.isRequired,
  onDeleteIdea: PropTypes.func.isRequired,
};

export default Actions;
