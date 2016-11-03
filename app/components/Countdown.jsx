var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countdownStatus: 'stopped'
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch(this.state.countdownStatus) {
        case 'stopped':
          break;
        case 'started':
          this.startTimer();
          break;
        case 'paused':
          break;
      }
    }
  },
  startTimer: function() {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      if (newCount == 0) {
        clearInterval(this.timer);
        this.setState({count: newCount, countdownStatus: 'stopped'});
      } else {
        this.setState({count: newCount});
      }

    }, 1000);
  },
  handleSetCountdown: function(seconds) {
    this.setState({count: seconds, countdownStatus: 'started'});
  },
  render: function() {
    var {count} = this.state;

    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown={this.handleSetCountdown} />
      </div>
    )
  }
});

module.exports = Countdown;
