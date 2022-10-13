import {Component} from 'react';

import './App.css';

class App extends Component{

  constructor(){
    super();

    this.state = {
      monsters : [],
      searchField: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        this.setState(
          () => {
            return {monsters: users}
          }, 
          () => {
            console.log(this.state);
          }
        )
      }).catch(() => {
        console.log('WTF!')
      });
  }


  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    
    this.setState(() => {
      return {searchField};
    });
  }

  render() {

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
        
       <input type="search" className='search-box' placeholder='search monsters' onChange={this.onSearchChange}/>

        {
          filteredMonsters.map(monster => {
            return <h1 key={monster.id}>{monster.name}</h1>
          })
        }

      </div>
   );
  }
}

export default App;
