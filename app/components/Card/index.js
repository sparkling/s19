import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import deleteIcon from './trash-icon.svg';
import Title from './Title';
import Body from './Body';

const StyledCard = styled.div `
  width: 335px;
  font-family: arial;
  border-radius: 15px;
  overflow: hidden;
  margin: 1.5em;
  box-shadow: 8px 14px 35px #ccc,
             -8px 14px 35px #ccc;

`;

const Actions = styled.div `
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
const Count = styled.div `
`;

const Card = ({ idea, onDeleteIdea, onUpdateTitle, onUpdateBody, onEditBlur, handleMouseEnter,
  handleMouseLeave, showDeleteId }) => (
    <StyledCard
      onMouseEnter={() => handleMouseEnter(idea)}
      onMouseLeave={() => handleMouseLeave(idea)}
    >
      <Title
        idea={idea}
        onUpdateTitle={onUpdateTitle}
        onEditBlur={onEditBlur}
      />
      <Body
        idea={idea}
        onUpdateBody={onUpdateBody}
        onEditBlur={onEditBlur}
      />
      
      <Actions>
        {(showDeleteId === idea.get('id')) ?
          <Action onClick={(evt) => onDeleteIdea(evt, idea.get('id'))}>
            <DeleteIcon src={deleteIcon} alt="delete" />
            <DeleteText>Delete</DeleteText>
          </Action>
        : null}
      </Actions>
    </StyledCard>);

Card.propTypes = {
  idea: PropTypes.object.isRequired,
  onDeleteIdea: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired,
  onEditBlur: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  showDeleteId: PropTypes.string,
};

export default Card;
