import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withSnackbar } from "notistack";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { withRouter } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

 class Signin extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
        loginData: {
          email: "",
          password: ""
        }
     }
     this.handleChange = this.handleChange.bind(this);
     this.onLoginSubmit = this.onLoginSubmit.bind(this);
   }




   onLoginSubmit() {
    
      const { loginData } = this.state;
     
      if(loginData.email && loginData.password){
        let url = 'http://localhost:4000/api/user/login'
        let user ={
          email: loginData.email,
          password: loginData.password
        }
        axios.post(url, {
            email: loginData.email,
            password: loginData.password
         })
        .then(res => {
          localStorage.setItem("token", res.data)
          this.props.history.push("/")
          console.log(localStorage.getItem("token"))
        }).catch(err => {
          this.props.enqueueSnackbar(err.response.data, { variant: 'error' });
        });
      }
   }

   handleChange(field, value) {
     console.log(field, value)
      const { loginData } = this.state;
      if(value){
        loginData[field] = value;
        this.setState({
          loginData: loginData
        })
      }
   }


  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
            <TextField
              variant="outlined"
              onChange = { (e) => this.handleChange("email", e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              onChange = { (e) => this.handleChange("password", e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.onLoginSubmit()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
         
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(withSnackbar(Signin)))