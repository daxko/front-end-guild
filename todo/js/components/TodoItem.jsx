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
        <button type="button" className="ui red button delete" onClick={this.props.onDelete}>delete</button>
      </li>
    );
  }

});

module.exports = TodoItem;