import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import * as firebase from 'firebase';
import dayjs from 'dayjs';

// firebase config
var firebaseConfig = {
  apiKey: 'AIzaSyAFcUyHDwnSbQhb8WXxyeQZBCbVpHe_lS8',
  authDomain: 'mdef-planty.firebaseapp.com',
  databaseURL: 'https://mdef-planty.firebaseio.com',
  projectId: 'mdef-planty',
  storageBucket: 'mdef-planty.appspot.com',
  messagingSenderId: '907223222028'
};

var numberOfRecords = 50;

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

class TouchChart extends React.Component {
  constructor() {
    super();
    this.state = {
      plantData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Humidity',
            data: [],
            backgroundColor: ['rgba(54, 162, 235, 0.1)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            pointRadius: 2,
            pointBorderWidth: 2,
            borderWidth: 3
          }
        ],
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 1600
                }
              }
            ]
          }
        }
      }
    };
  }

  componentWillMount() {
    let newDataset = this.state.chartData;

    var plantRef = database
      .ref('plant1')
      .orderByChild('timestamp')
      .limitToLast(numberOfRecords);
    plantRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      let newHumidityData = [];
      let newLabels = [];

      for (let item in items) {
        newState.push({
          id: item,
          humidity: items[item].humidity,
          capacity: items[item].capacityMapped,
          timestamp: dayjs.unix(items[item].timestamp).format('H:mm D.MM.YYYY')
        });
        newHumidityData.push(items[item].humidity);
        newLabels.push(dayjs.unix(items[item].timestamp).format('H:mm:ss'));
      }
      newDataset.datasets[0].data = newHumidityData;
      newDataset.labels = newLabels;
      this.setState({ plantData: newState, chartData: newDataset });
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <Line data={this.state.chartData} options={this.state.chartData.options} />
        </div>
      </div>
    );
  }
}

export default TouchChart;
