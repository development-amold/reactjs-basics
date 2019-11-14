import React from 'react';

import { Row, Col, Nav } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Home} from './Home';
import {CompIteratorCRUD} from './CompIteratorCRUD';
import {MainComp} from './apiCrud/MainComp';

export const RouterComponent = () => {
  return(
    <Router>
      <Row>
        <Col>
          <Nav>
            <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/array-crud">CRUD using Array</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/firebase-crud">CRUD using Firebase Api</Link>
          </Nav>
        </Col>
      </Row>        
      <Switch>
        <Route exact path="/">
          <Home />            
        </Route>
        <Route path="/array-crud">
          <CompIteratorCRUD />
        </Route>
        <Route path="/firebase-crud">
          <MainComp />
        </Route>
        <Route path="*" render={() => <p>Page Not Found</p>} />         
      </Switch>
    </Router>
  )
}
