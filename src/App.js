import React, { Component } from 'react';
import Airtable from 'airtable';

import './App.css';

const base = new Airtable({ apiKey: 'keyNyK2dVB4Da7Dzo' }).base('appp6saR18DlLK5EO');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    base('Roster').select({view: 'Grid view'})
    .eachPage(
      (records, fetchNextPage) => {
        this.setState({
          records
        });
        console.log(records);
        fetchNextPage();
      }
    );
  }

  render() {
    return (
      <div className="App">
        

        {this.state.records.length > 0 ? (
        this.state.records.map((record, index) =>
          <div key={index}>
            <h2>{record.fields['Name']}</h2>
            <p><a href={record.fields['Homepage']}>Homepage</a></p>
            <img src={record.fields['Attachments']} alt="A selfie"/>
          </div>
        )
        ) : (
          <p>Loading...</p>
        )}


      </div>
    );
  }
}

export default App;

