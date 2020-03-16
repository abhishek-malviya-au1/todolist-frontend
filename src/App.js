import React from 'react';
import logo from './logo.svg';
import { withSnackbar } from "notistack";
import './App.css';
import {Grid} from '@material-ui/core'
import { Box } from '@material-ui/core';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Tasks from './Components/Tasks';
import ButtonAppBar  from './Components/AppBar'
import AddEvent from './Components/AddEvent'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



class App extends React.Component {
 render() {
  return (
    <Router>
       <ButtonAppBar />
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '100vh' }}>
          <Switch>
            <Route exact path='/'>
              <Tasks />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </Grid>
    </Router>
  );
 }
}

export default withSnackbar(App);
