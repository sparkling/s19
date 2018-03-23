import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import deleteIcon from './trash-icon.svg';
import Title from './Title';

const StyledCard = styled.div `
  width: 335px;
  font-family: arial;
  border-radius: 15px;
  overflow: hidden;
  margin: 1.5em;
  box-shadow: 8px 14px 35px #ccc,
             -8px 14px 35px #ccc;

`;

const Body = styled(ContentEditable) `
  color: grey;
  padding: 1.5em;
  height: 240px;
  background-color: white;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -10px;
    margin-bottom: -10px;
  }
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
        html={idea.get('body')}
        disabled={false}
        onChange={(evt) => onUpdateBody(evt, idea.get('id'))}
        onBlur={(evt) => onEditBlur(evt, idea)}
        ref={(input) => { this.textInput = input; }}
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
