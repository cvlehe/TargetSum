import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
  state = {
    selectedIds: [],
    gameStatus: 'PLAYING',
    remainingSeconds: this.props.initialSeconds,
  };

  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            this.endGame();
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  endGame = () => {
    clearInterval(this.intervalId);
    if (this.state.gameStatus !== 'WON') {
      this.setState({ gameStatus: 'LOST' });
    }
  };

  pressedNumber = numberIndex => {
    const { selectedIds } = this.state;
    const newArray = selectedIds.includes(numberIndex)
      ? selectedIds.filter(item => item !== numberIndex)
      : [...selectedIds, numberIndex];
    this.setState({ selectedIds: newArray }, this.updateStatus);
  };

  updateStatus = () => {
    const sumSelected = this.state.selectedIds.reduce(
      (acc, curr) => acc + this.randomNumbers[curr],
      0,
    );
    let status = 'PLAYING';
    if (sumSelected > this.target) {
      status = 'LOST';
      clearInterval(this.intervalId);
    } else if (sumSelected === this.target) {
      status = 'WON';
      clearInterval(this.intervalId);
    }
    if (status !== this.state.gameStatus) {
      this.setState({ gameStatus: status });
    }
  };

  render() {
    let targetBackground = '#bbb';
    if (this.state.gameStatus === 'WON') {
      targetBackground = 'green';
    } else if (this.state.gameStatus === 'LOST') {
      targetBackground = 'red';
    }
    return (
      <View style={styles.container}>
        <Text style={[styles.target, { backgroundColor: targetBackground }]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <RandomNumber
              tapEnabled={this.state.gameStatus === 'PLAYING'}
              key={index}
              number={randomNumber}
              selected={this.state.selectedIds.includes(index)}
              pressed={() => this.pressedNumber(index)}
            />
          ))}
        </View>
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Game;
