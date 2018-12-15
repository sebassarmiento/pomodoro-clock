import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      break: 1,
      session: 25,
      time: 25 * 60,
      running: false,
      interval: null,
      breakRunning: false
    }
  }

  secondsToTime(secs) {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    return `${minutes}:${seconds}`;
  }

  startTimer() {
    this.setState({
      running: true,
      interval: this.state.time > 0 && !this.state.running ? setInterval(() => {
        console.log('Corre')
        this.setState({ time: this.state.time - 1 })
        if(this.state.time < 1){
          clearInterval(this.state.interval)
          this.playAlarm()
          this.setState({breakRunning: !this.state.breakRunning, running: false, time: (!this.state.breakRunning ? this.state.break : this.state.session) * 60})
          this.startTimer()
        }
      }, 1000) : null
    })
  }

  stopTimer() {
    this.setState({ running: false })
    clearInterval(this.state.interval)
  }

  resetTimer(){
    this.setState({session: 25, time: 25 * 60, running: false, breakRunning: false})
    clearInterval(this.state.interval)
  }

  playAlarm(){
    let audio = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2016/12/Short-ringtone-for-notification.mp3')
    audio.play()
  }

  render() {
    console.log('Render')
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="select-time" >
          <div>
            <h3>Break length</h3>
            <div className="break" >
              <i onClick={() => this.setState({ break: this.state.break > 1 ? this.state.break - 1 : this.state.break })} className="fas fa-minus"></i>
              <p>{this.state.break}</p>
              <i onClick={() => this.setState({ break: this.state.break + 1 })} className="fas fa-plus"></i>
            </div>
          </div>
          <div>
            <h3>Session length</h3>
            <div className="session" >
              <i onClick={() => this.state.running ? null : this.setState({ time: (this.state.session - 1) * 60, session: this.state.session > 1 ? this.state.session - 1 : this.state.session })} className="fas fa-minus"></i>
              <p>{this.state.session}</p>
              <i onClick={() => this.state.running ? null : this.setState({ time: (this.state.session + 1) * 60, session: this.state.session < 59 ? this.state.session + 1 : this.state.session })} className="fas fa-plus"></i>
            </div>
          </div>
        </div>
        <div className="timer" >
          <div className="time" >
            <h3>{this.state.breakRunning ? "Break time:" : "Session time:"}</h3>
            <h2 className={this.state.time < 11 && this.state.time > 0 ? "red-time" : null} >{this.secondsToTime(this.state.time)}</h2>
          </div>
        </div>
        <div className="controls" >
          <div>Start <i onClick={() => this.startTimer()} className="fas fa-play"></i></div>
          <div>Pause <i onClick={() => this.stopTimer()} className="fas fa-pause"></i></div>
          <div>Reset <i onClick={() => this.resetTimer()} className="fas fa-redo"></i></div>
        </div>
      </div>
    );
  }
}

export default App;
