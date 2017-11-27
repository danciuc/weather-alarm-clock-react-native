import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'

import PropTypes from 'prop-types'

import { Bar } from 'react-native-pathjs-charts';

export default class ForecastChart extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const {data} = this.props
    const options = {
      width: 300,
      height: 300,
      margin: {
        top: 20,
        left: 30,
        bottom: 50,
        right: 30
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    if (data.length == 0) return null

    return (
      <View>
        <Bar
          data={data}
          options={options}
          accessorKey='temp'
        />
      </View>
    )
  }
}
