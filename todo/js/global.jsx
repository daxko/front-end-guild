var Todo = React.createClass({
  render: function() {
    return (
      <div className="ui container">
        <div className="ui fluid action input">
          <input className="ui input" type="text" placeholder="What do you need to do?" />
          <button className="ui button" type="button">Add</button>
        </div>
        <ul className="ui divided selection list large">
          <li className="item">Todo Item 1</li>
          <li className="item">Todo Item 2</li>
          <li className="item">Todo Item 3</li>
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<Todo />, document.getElementById('todo-app'));