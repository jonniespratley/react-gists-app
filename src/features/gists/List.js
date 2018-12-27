import React, { Component } from 'react';

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
          <ul className="examples-reddit-list">
            {items.map(item => (
              <li key={item.id}>


              <img src={item.owner.avatar_url} alt={item.owner.login}/>
              <span>{item.owner.login}</span>




                <a href={item.url}>
                  {item.description}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-tip">No items yet.</div>
        )}
      </div>
    );
  }
}
