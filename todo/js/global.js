/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Todo = __webpack_require__(1);

	ReactDOM.render(React.createElement(Todo, null), document.getElementById('todo-app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var TodoItem = __webpack_require__(2);

	var TodoApp = React.createClass({

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
	    if (value.length) {
	      items.push({ name: value });
	    }
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

	module.exports = TodoApp;

/***/ },
/* 2 */
/***/ function(module, exports) {

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
	        'button',
	        { type: 'button', className: 'ui red button delete', onClick: this.props.onDelete },
	        'delete'
	      )
	    );
	  }

	});

	module.exports = TodoItem;

/***/ }
/******/ ]);