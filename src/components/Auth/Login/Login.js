import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton  } from "react-social-login-buttons";
import { useFormik } from 'formik'
import { loginInitialMethod, loginWithEmailAndPassword, loginWithFacebookPopup, loginWithGooglePopup } from '../loginManagement';
import { UserContext } from '../../../App';
import { CircularProgress } from '@material-ui/core';

// copyright tag function
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/#" color="inherit" href="http://munnaislam.netlify.app/">
        Munna Islam
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
// avatar style
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
}));
// formik initial values
const initialValues = {
    email: '',
    password: ''
}
// form validation function
const validate = (values) => {
    let errors = {}

    if(!values.email) {
        errors.email = 'Required'
    }else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
        errors.email = 'Invalid email address'
    }

    if(!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
    }

    return errors;
}

const  SignIn = () => {
  // user login state
  const [ loggedInUser, setLoggedInUser ] = useContext(UserContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const classes = useStyles();
  // error status and loading handle hook
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // firebase initial method
  loginInitialMethod()

  // crate account function
  const onSubmit = (values) => {
    setSuccess('')
    setLoading(true);
    loginWithEmailAndPassword(values.email, values.password)
    .then(res => {
      const checkStatus = typeof(res)
      if(checkStatus === 'object'){
        setLoggedInUser(false);
        setLoggedInUser(res);
        history.replace(from);
      } else {
        setLoading(false);
        setSuccess(res)
      }
    })
  }
  // facebook login function
  const handleFacebookLogin = () => {
    loginWithFacebookPopup()
    .then(res => {
      setLoggedInUser(res);
      history.replace(from)
    })
  }
  // google login function
  const handleGoogleLogin = () => {
    loginWithGooglePopup()
    .then(res => {
      setLoggedInUser(res);
      history.replace(from)
    })
  }
  // form validation and error handle
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

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
        {
          success.length > 0 && <div style={{color: 'red'}}>{success}</div>
        }
        {
          loading ? <CircularProgress /> : null
        }
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
              formik.touched.email && formik.errors.email ? (
                  <div style={{color: 'red'}}>{formik.errors.email}</div>
              ):(
                  null
              )
          }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
              formik.touched.password && formik.errors.password ? (
                  <div style={{color: 'red'}}>{formik.errors.password}</div>
              ):(
                  null
              )
          }
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
          >
            Sign In
          </Button>
          <div className="d-flex">
            <FacebookLoginButton onClick={() => handleFacebookLogin()} >
                <span>Facebook</span>
            </FacebookLoginButton>
            <GoogleLoginButton onClick={() => handleGoogleLogin()} >
                <span>Google</span>
            </GoogleLoginButton>
          </div>
          <Grid container>
            <Grid item xs>
              <Link to="/#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;