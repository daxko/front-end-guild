var TodoItem = React.createClass({

  getDefaultProps: function() {
    return {
      name: ""
    };
  },

  handleTouchStart: function(e) {
    this.setState({
      touchStart: e.changedTouches[0].pageX,
      isTouchActive: true
    });
  },

  handleTouchMove: function(e) {
    var touchStart = this.state.touchStart;
    var touchMove = e.changedTouches[0].pageX;
    this.setState({
      touchMove: touchStart - touchMove
    });
  },

  handleTouchEnd: function(e) {
    if(this.state.touchMove > this.refs.deleteButton.offsetWidth) {
      this.props.onDelete();
    }

    this.setState({
      touchMove: 0,
      isTouchActive: false
    });
  },

  getInitialState: function() {
    return {
      isTouchActive: false,
      completed: false,
      touchStart: 0,
      touchMove: 0
    };
  },

  handleClick: function() {
    var completed = this.state.completed;
    this.setState({ completed: !completed });
  },

  render: function() {
    var name = this.props.name;
    var completed = this.state.completed ? 'completed' : '';
    var move = Math.max(100 - this.state.touchMove, 0);
    return (
      <li onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onClick={this.handleClick}
          className={`item ${completed}`}>
        {name}
        <button type="button"
          ref="deleteButton"
          className="ui red button delete"
          style={{ transform: `translateX(${move}%)`, transitionDuration: this.state.isTouchActive ? null : '0s'  }}
          onClick={this.props.onDelete}>
            delete
        </button>
      </li>
    );
  }

});

module.exports = TodoItem;