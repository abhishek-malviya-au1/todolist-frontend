import React from 'react';
import { Box, Button , Tab, Tabs, Grid, TextField} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router";
import { withSnackbar } from "notistack";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(100),
        
      },
      root: {
          width: '100%',
      },
      button: {
        margin: theme.spacing(1),
      }
    },
  })

  class AddEvent extends React.Component {
      constructor(props){
          super(props);
          this.state = {
            addData: {
                title: '',
                description: ''
            }
          }
      }

      handleChange(field, value) {
          const { addData } = this.state;
            if(value){
                addData[field] = value;
                this.setState({
                    addData: addData
                })
            }
      }

      onAdd() {
          let { addData } = this.state
          let url = 'http://localhost:4000/api/events/insertEvent'
        let user ={
          title: addData.title,
          password: addData.description,
          isDone: false
        }
        axios.post(url, {
            isDone: false,
            title: addData.title,
          description: addData.description
         },{
            'headers': { 'auth-token': localStorage.getItem("token")}
         })
        .then(res => {
            console.log(res)
          this.props.history.push("/")
        }).catch(err => {
          this.props.enqueueSnackbar(err.response.data, { variant: 'error' });
        });
      }

      render() {
          let {classes} = this.props;
          return(
            <div className={classes.root}>
                <Paper square elevation={7} style={{  marginLeft: 0, padding: 0}} style={{marginTop: 10}}>
                    <Grid container>
                        <Grid md={9} sm={12}>
                        <TextField
                            label="Title"
                            id="margin-normal"
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.handleChange('title', e.target.value)}
                            style={{ margin: 8, marginRight: 0 }}
                            fullWidth
                            />
                            {
                                this.state.addData.title ? 
                                <TextField
                                id="margin-normal"
                                label="Description"
                                className={classes.textField}
                                onChange={(e) => this.handleChange('description', e.target.value)}
                                multiline
                                style={{ margin: 8 }}
                                rows="4"
                                variant="outlined"
                                fullWidth
                                />:
                                null
                            }
                            
                        </Grid>
                        <Grid md={3} sm={12}>
                       
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddCircleIcon />}
                            onClick={() => this.onAdd()}
                            style={{ margin: 20, marginRight: 0}}
                        >
                            Add Task
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
          )
      }
  }

  export default withRouter(withStyles(styles)(withSnackbar(AddEvent)))