import React from 'react';
import { Line } from 'react-chartjs-2';
import firebase from 'firebase';
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

var numberOfRecords = 20;

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

class Charts extends React.Component {
  constructor() {
    super();
    this.state = {
      plantData: [],
      humidity: {
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
        ]
      },
      touch: {
        labels: [],
        datasets: [
          {
            label: 'Touch',
            data: [],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255,99,132,1)'],
            pointRadius: 2,
            pointBorderWidth: 2,
            borderWidth: 3
          }
        ]
      },
      chartOptions: {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 300
                }
              }
            ]
          }
        }
      }
    };
  }

  componentWillMount() {
    let newHumidity = this.state.humidity;
    let newTouch = this.state.touch;

    var plantRef = database
      .ref('plant1')
      .orderByChild('timestamp')
      .limitToLast(numberOfRecords);
    plantRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      let newHumidityData = [];
      let newTouchData = [];
      let newLabels = [];

      for (let item in items) {
        newState.push({
          id: item,
          humidity: items[item].humidity,
          capacity: items[item].capacityMapped,
          timestamp: dayjs.unix(items[item].timestamp).format('H:mm D.MM.YYYY')
        });
        newHumidityData.push(items[item].humidity);
        newTouchData.push(items[item].capacityMapped);
        newLabels.push(dayjs.unix(items[item].timestamp).format('H:mm:ss'));
      }
      newHumidity.datasets[0].data = newHumidityData;
      newHumidity.labels = newLabels;
      newTouch.datasets[0].data = newTouchData;
      newTouch.labels = newLabels;
      this.setState({ plantData: newState, humidity: newHumidity, touch: newTouch });
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="charts">
        <div className="chart">
          <Line height={180} data={this.state.humidity} options={this.state.chartOptions.options} />
        </div>
        <div className="chart">
          <Line height={180} data={this.state.touch} options={this.state.chartOptions.options} />
        </div>
      </div>
    );
  }
}

export default Charts;
