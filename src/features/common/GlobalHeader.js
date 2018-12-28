import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pane, Button, Heading } from 'evergreen-ui'

export default class GlobalHeader extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'React Gists'
  };

  render() {
    const { title } = this.props;
    return (
      <div className="common-global-header">
        <Pane display="flex" padding={5} background="tint2" borderRadius={0}>
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600}>{ title }</Heading>
          </Pane>
          <Pane>
            {/* Below you can see the marginRight property on a Button. */}
            <Button appearance="primary">Sign in</Button>
          </Pane>
        </Pane>
      </div>
    );
  }
}
