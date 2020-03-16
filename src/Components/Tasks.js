import React from 'react';
import { Box, Button , Tab, Tabs, Grid, IconButton, TextField} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router";
import  AddEvent  from './AddEvent'
import { withSnackbar } from "notistack";
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import {AddCircleIcon} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(50),
    },
    root: {
        width: '100%',
    },
    paper: {
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
  },
})





class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                value  : 0,
                tasksArray: [],
                open: false,
                taskData: {
                    _id: "",
                    title: "",
                    description: "",
                    isDone: "",
                }
        }
    }

    componentDidMount(){
       this.getEvents() 
    }

    getEvents() {
        let url = 'http://localhost:4000/api/events/getEvents'
        axios.get(url, { 'headers': { 'auth-token': localStorage.getItem("token") } })
        .then(res => {
            if(res){
                console.log(res);
                this.props.history.push("/")
                this.setState({
                    tasksArray: res.data
                })
            }
           
        }).catch(err => {
            if(err.response.data !== "No events"){
                this.props.enqueueSnackbar(err.response.data, { variant: 'error' });
                this.props.history.push('/login')
            }
            
            this.props.enqueueSnackbar(err.response.data, { variant: 'error' });
        });
    }

    handleTabChange(field,value) {
        this.setState({
            value: value
        })
    }

    handleChange(field, value) {
        const { taskData } = this.state;
        taskData[field] = value;
        this.setState({
            taskData: taskData
        })
    }

    onEdit(taskData){
        this.setState({
            taskData: taskData
        })

    }

    onEditSubmit() {
        let { taskData } = this.state
        let url = 'http://localhost:4000/api/events/updateEvent'
      let user ={
        title: taskData.title,
        description: taskData.description,
        isDone: false,
        eventId: taskData._id
      }
      console.log(taskData);
      axios.post(url, {
          isDone: false,
          title: taskData.title,
        description: taskData.description,
        eventId: taskData._id
       },{
          'headers': { 'auth-token': localStorage.getItem("token")}
       })
      .then(res => {
        this.setState({
            open: false
        })
        this.getEvents()
      }).catch(err => {
        this.props.enqueueSnackbar(err.response.data, { variant: 'error' });
      });
    }

    setOpen(value) {
        this.setState({
            open: value
        })
    }

    onDelete(task) {
        let eventId = task._id;
        let url = 'http://localhost:4000/api/events/deleteEvent';
        axios.post(url, {
            
          eventId: eventId
         },{
            'headers': { 'auth-token': localStorage.getItem("token")}
         })
        .then(res => {
            this.props.enqueueSnackbar(res.data, { variant: 'error' });
            this.getEvents()
        }).catch(err => {
          this.props.enqueueSnackbar(err.response.data, { variant: 'error' });
        });
        
    } 

    onCheckboxClicked(event) {

    }

    render() {
        const {classes} = this.props;
        const { taskData } = this.state;
        return(
               <div className={classes.root}>
                   <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh', minWidth:"100" }}>
                   <AddEvent />
                    <Paper square elevation={7} style={{marginTop: 10}}>
                        <Tabs
                            value={this.state.value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(event,value) => this.handleTabChange(event, value)}
                            aria-label="disabled tabs example"
                            centered={true}
                            indicatorColor={'secondary'}
                            variant={'fullWidth'}
                        >
                            <Tab value={0} label="Pending" />
                            <Tab label="Todo-List" disabled />
                            <Tab value={2} label="Done" />
                        </Tabs>
                        {
                            this.state.value === 0 
                            ?
                            this.state.tasksArray.map((task) => {
                                return(
                                   <div style={{ marginTop: 4}}>
                                    {
                                        task.isDone === "false"
                                        ?
                                        <table class="table table-striped">
                                            <tbody>
                                                <tr>
                                                <td><ExpansionPanel id={task._id}>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                        >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={event => event.stopPropagation()}
                                            onFocus={event => event.stopPropagation()}
                                            label={task.title}
                                        />
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <Typography color="textSecondary">
                                           {task.description}
                                        </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel></td>
                                                <td> <IconButton aria-label="delete" 
                                                onClick={() => {this.setOpen(true); this.onEdit(task)}}className={classes.margin}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton></td>
                                                <td><IconButton aria-label="delete" className={classes.margin} onClick={() => this.onDelete(task)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton></td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                        
                                    :
                                    null
                                    }
                                   </div>
                                )
                            })
                             : 
                             null
                        }
                        {
                            this.state.value === 2 ?
                            this.state.tasksArray.map((task) => {
                                return(
                                   <div style={{ marginTop: 4}}>
                                    {
                                        task.isDone === "true"
                                        ?
                                        <table class="table table-striped">
                                            <tbody>
                                                <tr>
                                                <td><ExpansionPanel id={task._id}>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                        >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={event => event.stopPropagation()}
                                            onFocus={event => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label={task.title}
                                        />
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <Typography color="textSecondary">
                                           {task.description}
                                        </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel></td>
                                                <td> <IconButton aria-label="delete" 
                                                onClick={() => {this.setOpen(true); this.onEdit(task)}}className={classes.margin}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton></td>
                                                <td><IconButton aria-label="delete" className={classes.margin} onClick={() => this.onDelete(task)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton></td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    :
                                    null
                                    }
                                   </div>
                                )
                            }) : null
                        }
                    
                                    </Paper>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={this.state.open}
                                        onClose={() => this.setOpen(false)}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                        timeout: 500,
                                        }}
                                        
                                    >
                                        <Fade in={this.state.open}>
                                        <div className={classes.paper}>
                                        <Container component="main" maxWidth="xs" style={{ background: "white", marginTop: 80}}>
                                   
                                    <div  style={{ padding: 50}}>
                                        
                                        <form className={classes.form} noValidate>
                                        <Typography component="h1" variant="h5">
                                        Edit Task
                                        </Typography>
                                        <Grid container spacing={2} style={{ padding: 50}}>
                                            <Grid item xs={12}>
                                            <TextField
                                                name="eventName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Title"
                                                autoFocus
                                                value={taskData.title}
                                                onChange={(e) => this.handleChange('title', e.target.value)}
                                            />
                                            </Grid>
                                            
                                            <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Description"
                                                multiline
                                                value={taskData.description}
                                                onChange={(e) => this.handleChange('description', e.target.value)}
                                            />
                                            </Grid>
                                            
                                        </Grid>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={() => this.onEditSubmit()}
                                        >
                                            Submit
                                        </Button>
                                        </form>
                                    </div>
                                    
                                    </Container>
                                </div>
                                </Fade>
                            </Modal>
              </Grid>
                 
                </div>
            
        )
    }
}

export default withRouter(withStyles(styles)(withSnackbar(Tasks)))