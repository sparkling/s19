import React from 'react';
import { FormattedMessage, injectIntl, intlShape  } from 'react-intl';
import Card from 'components/Card';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import Immutable from 'immutable';

import {
  loadIdeas,
  deleteIdea,
  addIdea,
  updateIdea,
  saveIdea,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectIdeas } from './selectors';

const Cards = styled.div `
  display: flex;
  flex-wrap: wrap;
  flex-align: flex-start;
`;

const Action = styled.div `

`;

const AddButton = styled.button `
  background-color: #37547D;
  color: white;
  padding: 1em 1.5em;
  border-radius: 10px;
  box-shadow: 8px 10px 25px #ccc,
              -8px 10px 25px #ccc;
  margin: 1.5em;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.handleMouseOver = this.focusTextInput.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.onPageLoad();
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  handleMouseEnter = ((idea) => {
    this.setState({ showDeleteId: idea.get('id') });
  });

  handleMouseLeave = (() => {
    this.setState({ showDeleteId: undefined });
  });

  render() {
    const cards = this.props.ideas.map((idea) =>
      (<Card
        key={idea.get('id')}
        idea={idea}
        onDeleteIdea={this.props.onDeleteIdea}
        onUpdateTitle={this.props.onUpdateTitle}
        onUpdateBody={this.props.onUpdateBody}
        onEditBlur={this.props.onEditBlur}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
        showDeleteId={(this.state.showDeleteId)}
      />));

    return (
      <Cards>
        {cards}
        <Action >
          <AddButton onClick={(evt) => this.props.onAddIdea(evt)}>Add</AddButton>
        </Action>
      </Cards>
    );
  }
}


HomePage.propTypes = {
  ideas: PropTypes.instanceOf(Immutable.List).isRequired,
  onPageLoad: PropTypes.func.isRequired,
  onAddIdea: PropTypes.func.isRequired,
  onDeleteIdea: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired,
  onEditBlur: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ideas: makeSelectIdeas(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: () => {
      dispatch(loadIdeas());
    },
    onAddIdea: (evt) => {
      if (evt && evt.preventDefault) evt.preventDefault();
      dispatch(addIdea());
    },
    onDeleteIdea: (evt, id) => {
      if (evt && evt.preventDefault) evt.preventDefault();
      dispatch(deleteIdea(id));
    },
    onEditBlur: (evt, idea) => {
      if (evt && evt.preventDefault) evt.preventDefault();
      dispatch(saveIdea(idea));
    },
    onUpdateTitle: (evt, id) => {
      if (evt && evt.preventDefault) evt.preventDefault();
      dispatch(updateIdea(id, 'title', evt.target.value));
    },
    onUpdateBody: (evt, id) => {
      if (evt && evt.preventDefault) evt.preventDefault();
      dispatch(updateIdea(id, 'body', evt.target.value));
    },
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,

)(HomePage);
