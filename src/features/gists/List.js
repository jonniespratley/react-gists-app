import React, { Component } from 'react';
import { Pane, Heading, Avatar, Text } from 'evergreen-ui';

const GistItem = ({gist}) => (
  <Pane display="flex" padding={10} alignItems="center">
    <Avatar src={gist.owner.avatar_url} name={gist.owner.login} size={40} />
    <Pane flex={1}>
      <Heading size={400}>{gist.owner.login}</Heading>
      <Text size={300}>{gist.description}</Text>
    </Pane>
    <Pane display="flex">    
      <Heading>Stars</Heading>
    </Pane>
  </Pane>
);

export default class List extends Component {
  static propTypes = {

  };
  static defaultProps = {
    items: []
  };

  render() {
    const {items} = this.props;
    return (
      <div className="gists-list">
        {items.length > 0 ? (
          <div>
          {items.map(item => (
            <GistItem gist={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className="no-items-tip">No items yet.</div>
        )}
      </div>
    );
  }
}
