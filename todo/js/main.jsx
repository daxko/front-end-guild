var Todo = require('./components/TodoApp');

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('👍 service worker');
    })
    .catch(function(registration) {
      console.log('👎 service worker');
    });
}

ReactDOM.render(<Todo />, document.getElementById('todo-app'));