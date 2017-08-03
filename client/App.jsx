import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import query from './query/dashboard';
import LoadingBar from './components/LoadingBar';
import Employees from './Employees';
import Projects from './Projects';
import Technologies from './Technologies';

const style = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 16,
  },
  container: {
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const styleSheet = createStyleSheet('App', () => style);

class App extends Component {
  render() {
    const { classes, data } = this.props;

    if (data.loading) {
      return <LoadingBar show />;
    }

    return (
      <div className={classes.root}>
        <LoadingBar show={data.loading} />
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              GraphQL Kft Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid className={classes.container} container gutter={24}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Technologies technologies={data.technologies} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Employees employees={data.employees} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Projects projects={data.projects} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

const AppWithStyles = withStyles(styleSheet)(App);

export default graphql(query)(AppWithStyles);
