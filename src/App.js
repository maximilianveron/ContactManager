import React from 'react';
import './App.css';
import Contacts from './components/contacts/Contacts';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact'
import Header from './components/layout/Header';
import About from './components/pages/About'
import { Provider } from './context';
 
import 'bootstrap/dist/css/bootstrap.min.css';

import { render } from 'react-dom';
import NotFound from './components/pages/NotFound';
// import { render } from '@testing-library/react';

function App() {
  const name = 'Ronny';
  return (
    <Provider>
      <Router>
      <div className="App">
        
        <Header branding="Contact Manager"/>
      <div className="container">
          <Switch>
              <Route exact path="/" component={ Contacts } />
              <Route exact path="/contact/edit/:id" component={ EditContact } />
              <Route exact path="/contact/add" component={ AddContact } />
              <Route exact path="/about" component={ About } />
              <Route component={NotFound}/>
          </Switch>
      </div>
      </div>
      </Router>
      
    </Provider>
    
  );
  
}

export default App;
