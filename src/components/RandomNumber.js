import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class RandomNumber extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (this.props.tapEnabled) {
            this.props.pressed();
          }
        }}>
        <Text
          style={[
            styles.random,
            this.props.selected ? styles.selected : styles.unselected,
          ]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999',
    width: '40%',
    marginVertical: 25,
  },
  random: {
    fontSize: 35,
    textAlign: 'center',
  },
  unselected: {
    opacity: 0.3,
  },
  selected: {
    opacity: 1,
  },
});

RandomNumber.propTypes = {
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  pressed: PropTypes.func.isRequired,
  tapEnabled: PropTypes.bool.isRequired,
};

export default RandomNumber;
