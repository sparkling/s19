import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import ReactDom from 'react-dom';

const StyledTitle = styled(ContentEditable) `
  background-color: #37547D;
  color: white;
  font-weight: bold;
  padding: 1.5em;
  font-size: 1.45em;
  height: 160px;
`;

export class Title extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  componentDidMount() {
    /* eslint-disable react/no-find-dom-node */
    ReactDom.findDOMNode(this.textInput).focus();
  }

  render() {
    return (
      <StyledTitle
        html={this.props.idea.get('title')}
        disabled={false}
        onChange={(evt) => this.props.onUpdateTitle(evt, this.props.idea.get('id'))}
        onBlur={(evt) => this.props.onEditBlur(evt, this.props.idea)}
        innerRef={(input) => { this.textInput = input; }}
      />);
  }
}


Title.propTypes = {
  idea: PropTypes.object.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onEditBlur: PropTypes.func.isRequired,
};

export default Title;
