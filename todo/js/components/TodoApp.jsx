var TodoItem = require('./TodoItem');

var TodoApp = React.createClass({

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
        return x.name !== item.name;
      })
    });
  },

  addItem: function() {
    var items = this.state.items;
    var value = this.state.value;
    if(value.length) {
      items.push({ name: value });
    }
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

module.exports = TodoApp;