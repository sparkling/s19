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
import 'react-notifications/lib/notifications.css';
import { NOTIFICATION_TIMEOUT } from 'constants';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

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
import {
  makeSelectIdeas,
  makeSelectMessage,
} from './selectors';

const Cards = styled.div `
  display: flex;
  flex-wrap: wrap;
  flex-align: flex-start;
  .notification-container {
    width: 10em!important;
    font-family: arial;
  }
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
    this.state = { hoverCard: 'none' };
  }

  componentDidMount() {
    this.props.onPageLoad();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.message && (!this.props.message ||
      (nextProps.message.get('id') !== this.props.message.get('id')))) {
      NotificationManager.info(nextProps.message.get('msg'), null, NOTIFICATION_TIMEOUT);
    }
  }

  onMouseEnterCard = ((idea) => {
    this.setState({ hoverCard: idea.get('id') });
  });

  onMouseLeaveCard = (() => {
    this.setState({ hoverCard: 'none' });
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
        onMouseEnterCard={this.onMouseEnterCard}
        onMouseLeaveCard={this.onMouseLeaveCard}
        hoverCard={this.state.hoverCard}
        isEditingBody={this.state.isEditingBody}
      />));

    return (
      <Cards>
        <NotificationContainer />
        {cards}
        <div>
          <AddButton onClick={(evt) => this.props.onAddIdea(evt)}>Add</AddButton>
        </div>
      </Cards>
    );
  }
}

HomePage.propTypes = {
  ideas: PropTypes.instanceOf(Immutable.List).isRequired,
  message: PropTypes.object,
  onPageLoad: PropTypes.func.isRequired,
  onAddIdea: PropTypes.func.isRequired,
  onDeleteIdea: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired,
  onEditBlur: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ideas: makeSelectIdeas(),
  message: makeSelectMessage(),
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
      if (evt) evt.preventDefault();
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
