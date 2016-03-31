var TodoItem = React.createClass({

  getDefaultProps: function () {
    return {
      name: ""
    };
  },

  getInitialState: function () {
    return {
      completed: false
    };
  },

  handleClick: function () {
    var completed = this.state.completed;
    this.setState({ completed: !completed });
  },

  render: function () {
    var name = this.props.name;
    var completed = this.state.completed ? 'completed' : '';
    return React.createElement(
      'li',
      { onClick: this.handleClick, className: `item ${ completed }` },
      name,
      React.createElement(
        'div',
        { className: 'delete', onClick: this.props.onDelete },
        'delete'
      )
    );
  }

});

var Todo = React.createClass({

  getInitialState: function () {
    return {
      items: [],
      value: ''
    };
  },

  handleChange: function (e) {
    this.setState({ value: e.target.value });
  },

  handleDelete: function (item) {
    var items = this.state.items;
    this.setState({
      items: items.filter(function (x) {
        return x.name !== item.name;
      })
    });
  },

  addItem: function () {
    var items = this.state.items;
    var value = this.state.value;
    items.push({ name: value });
    this.setState({
      items: items,
      value: ''
    });
  },

  handleKeyUp: function (e) {
    if (e.which === 13) {
      this.addItem();
    }
  },

  render: function () {
    var items = this.state.items;
    var value = this.state.value;
    var handleDelete = this.handleDelete;
    return React.createElement(
      'div',
      { className: 'ui container' },
      React.createElement(
        'div',
        { className: 'ui fluid action input' },
        React.createElement('input', { onChange: this.handleChange, onKeyUp: this.handleKeyUp, className: 'ui input', type: 'text', placeholder: 'What do you need to do?', value: value }),
        React.createElement(
          'button',
          { onClick: this.addItem, className: 'ui button', type: 'button' },
          'Add'
        )
      ),
      React.createElement(
        'ul',
        { className: 'ui divided selection list large' },
        items.map(function (item) {
          return React.createElement(TodoItem, { name: item.name, onDelete: handleDelete.bind(this, item) });
        })
      )
    );
  }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('todo-app'));
