import React, { Component } from 'react';
import SpellsData from '../data/spells.json';

class SpellList extends Component {
  render() {
    return (
      <div>
        <h1>All Spells</h1>
        {
          SpellsData.map((spell, index) => {
            return <div>
              <h3>{spell['Name']}</h3>
              <p>{spell['Level']}</p>
              <p>{spell['Casting time']}</p>
              <p>{spell['Range']}</p>
              <p>{spell['Components']}</p>
              <p>{spell['Duration']}</p>
              <p>{spell['Text']}</p>
              <p>{spell['Page']}</p>
              <p>{spell['Class']}</p>
            </div>
          })
        }
      </div>
    );
  }
}

export default SpellList;
