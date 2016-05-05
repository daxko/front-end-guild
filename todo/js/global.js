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

	'use strict';

	var Todo = __webpack_require__(1);

	ReactDOM.render(React.createElement(Todo, null), document.getElementById('todo-app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TodoItem = __webpack_require__(2);

	var TodoApp = React.createClass({

	  getInitialState: function getInitialState() {
	    return {
	      items: JSON.parse(localStorage.getItem('items')) || [],
	      value: ''
	    };
	  },

	  handleChange: function handleChange(e) {
	    this.setState({ value: e.target.value });
	  },

	  handleDelete: function handleDelete(item) {
	    var items = this.state.items;
	    this.updateItems(items.filter(function (x) {
	      return x.name !== item.name;
	    }));
	  },

	  addItem: function addItem() {
	    var items = this.state.items;
	    var value = this.state.value;
	    if (value.length) {
	      items.push({ name: value });
	    }
	    this.setState({
	      value: ''
	    });
	    this.updateItems(items);
	  },

	  updateItems: function updateItems(items) {
	    this.setState({ items: items });
	    localStorage.setItem('items', JSON.stringify(items));
	  },

	  handleKeyUp: function handleKeyUp(e) {
	    if (e.which === 13) {
	      this.addItem();
	    }
	  },

	  render: function render() {
	    var _this = this;

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
	        items.map(function (item, index) {
	          return React.createElement(TodoItem, { key: item.name + '-' + index, name: item.name, onDelete: handleDelete.bind(_this, item) });
	        })
	      )
	    );
	  }

	});

	module.exports = TodoApp;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var TodoItem = React.createClass({

	  getDefaultProps: function getDefaultProps() {
	    return {
	      name: ""
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (!('ontouchstart' in window)) {
	      this.setState({
	        cantTouchThis: true
	      });
	    }
	  },

	  handleTouchStart: function handleTouchStart(e) {
	    this.setState({
	      touchStart: e.changedTouches[0].pageX,
	      isTouchActive: true
	    });
	  },

	  handleTouchMove: function handleTouchMove(e) {
	    var touchStart = this.state.touchStart;
	    var touchMove = e.changedTouches[0].pageX;
	    this.setState({
	      touchMove: touchStart - touchMove
	    });
	  },

	  handleTouchEnd: function handleTouchEnd(e) {
	    if (this.state.touchMove > this.refs.deleteButton.offsetWidth) {
	      this.props.onDelete();
	    }

	    this.setState({
	      touchMove: 0,
	      isTouchActive: false
	    });
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isTouchActive: false,
	      completed: false,
	      touchStart: 0,
	      touchMove: 0,
	      cantTouchThis: false
	    };
	  },

	  handleClick: function handleClick() {
	    var completed = this.state.completed;
	    this.setState({ completed: !completed });
	  },

	  render: function render() {
	    var name = this.props.name;
	    var completed = this.state.completed ? 'completed' : '';
	    var move = Math.max(100 - this.state.touchMove, 0);
	    return React.createElement(
	      'li',
	      { onTouchStart: this.handleTouchStart,
	        onTouchMove: this.handleTouchMove,
	        onTouchEnd: this.handleTouchEnd,
	        onClick: this.handleClick,
	        className: 'item ' + completed },
	      name,
	      React.createElement(
	        'button',
	        { type: 'button',
	          ref: 'deleteButton',
	          className: 'ui red button delete',
	          style: {
	            transform: this.state.cantTouchThis ? null : 'translateX(' + move + '%)',
	            transitionDuration: this.state.isTouchActive ? '0s' : null
	          },
	          onClick: this.props.onDelete },
	        'delete'
	      )
	    );
	  }

	});

	module.exports = TodoItem;

/***/ }
/******/ ]);