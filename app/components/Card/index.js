import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from './Title';
import Body from './Body';
import Actions from './Actions';

const StyledCard = styled.div `
  width: 335px;
  font-family: arial;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 3em;
  margin-bottom: 3em;
  box-shadow: 8px 14px 35px #ccc,
             -8px 14px 35px #ccc;
`;

const Card = ({ idea, onDeleteIdea, onUpdateTitle, onUpdateBody, onEditBlur,
  onMouseEnterCard, onMouseLeaveCard, hoverCard }) => (
    <StyledCard
      onMouseEnter={() => onMouseEnterCard(idea)}
      onMouseLeave={() => onMouseLeaveCard(idea)}
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
      <Actions
        idea={idea}
        onDeleteIdea={onDeleteIdea}
        hoverCard={hoverCard}
      />

    </StyledCard>);

Card.propTypes = {
  idea: PropTypes.object.isRequired,
  hoverCard: PropTypes.string.isRequired,
  onDeleteIdea: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired,
  onEditBlur: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
};

export default Card;
