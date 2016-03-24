var TodoItem = React.createClass({
  getDefaultProps: function() {
    return {
      name: ""
    };
  },

  render: function() {
    var name = this.props.name;
    return (
      <li className="item">{name}</li>
    );
  }
});

var Todo = React.createClass({

  getInitialState: function() {
    return {
      items: [],
      value: ''
    };
  },

  onInputChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },

  onKeyUp: function(e) {
    if(e.which === 13) {
      var items = this.state.items;
      items.push({ name: e.target.value });
      this.setState({
       items: items
      });
    }
  },

  render: function() {
    var items = this.state.items;
    var value = this.state.value;
    return (
      <div className="ui container">
        <div className="ui fluid action input">
          <input onKeyUp={this.onKeyUp} onInputChange={this.onInputChange} className="ui input" type="text" placeholder="What do you need to do?" />
          <button className="ui button" type="button">Add</button>
        </div>
        <ul className="ui divided selection list large">
          {items.map(function(item) {
            return <TodoItem name={item.name} />
          })}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<Todo />, document.getElementById('todo-app'));