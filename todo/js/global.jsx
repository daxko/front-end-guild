var TodoItem = React.createClass({

  getDefaultProps: function() {
    return {
      name: ""
    };
  },

  getInitialState: function() {
    return {
      completed: false
    };
  },

  handleClick: function() {
    var completed = this.state.completed;
    this.setState({ completed: !completed });
  },

  render: function() {
    var name = this.props.name;
    var completed = this.state.completed ? 'completed' : '';
    return (
      <li onClick={this.handleClick} className={`item ${completed}`}>
        {name}
        <div className="delete" onClick={this.props.onDelete}>delete</div>
      </li>
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

  handleChange: function(e) {
    this.setState({ value: e.target.value });
  },

  handleDelete: function(item) {
    var items = this.state.items;
    this.setState({
      items: items.filter(function(x) {
        return x.name !== item.name
      })
    });
  },

  addItem: function() {
    var items = this.state.items;
    var value = this.state.value;
    items.push({ name: value });
    this.setState({
      items: items,
      value: ''
    });
  },

  handleKeyUp: function(e) {
    if(e.which === 13) {
      this.addItem();
    }
  },

  render: function() {
    var items = this.state.items;
    var value = this.state.value;
    var handleDelete = this.handleDelete;
    return (
      <div className="ui container">
        <div className="ui fluid action input">
          <input onChange={this.handleChange} onKeyUp={this.handleKeyUp} className="ui input" type="text" placeholder="What do you need to do?" value={value} />
          <button onClick={this.addItem} className="ui button" type="button">Add</button>
        </div>
        <ul className="ui divided selection list large">
          {items.map(function(item) {
            return <TodoItem name={item.name} onDelete={handleDelete.bind(this, item)} />
          })}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<Todo />, document.getElementById('todo-app'));