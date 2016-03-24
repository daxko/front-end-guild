var TodoItem = React.createClass({
  getDefaultProps: function () {
    return {
      name: ""
    };
  },

  render: function () {
    var name = this.props.name;
    return React.createElement(
      "li",
      { className: "item" },
      name
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

  onInputChange: function (e) {
    this.setState({
      value: e.target.value
    });
  },

  onKeyUp: function (e) {
    if (e.which === 13) {
      var items = this.state.items;
      items.push({ name: e.target.value });
      this.setState({
        items: items
      });
    }
  },

  render: function () {
    var items = this.state.items;
    var value = this.state.value;
    return React.createElement(
      "div",
      { className: "ui container" },
      React.createElement(
        "div",
        { className: "ui fluid action input" },
        React.createElement("input", { onKeyUp: this.onKeyUp, onInputChange: this.onInputChange, className: "ui input", type: "text", placeholder: "What do you need to do?" }),
        React.createElement(
          "button",
          { className: "ui button", type: "button" },
          "Add"
        )
      ),
      React.createElement(
        "ul",
        { className: "ui divided selection list large" },
        items.map(function (item) {
          return React.createElement(TodoItem, { name: item.name });
        })
      )
    );
  }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('todo-app'));
