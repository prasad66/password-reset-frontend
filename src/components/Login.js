import * as React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../constants'
import { useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomisedSnackbar from './CustomisedSnackbar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LoaderPage from './LoaderPage';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


const Login = () => {
    const navigate = useNavigate();
    React.useEffect(() => {

        if (isExpired(localStorage.getItem('token'))) {
            localStorage.removeItem('token');
            return;
        }
        navigate('/welcome')

    }, [navigate])

    const [error, setError] = React.useState(false);
    const [color, setColor] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);


    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("Email is required"),
            password: yup.string().required("Please enter the password"),
        }),
        onSubmit: values => {
            handleSave(values);
        }
    })

    const handleSave = async (values) => {
        setLoading(true);
        console.log(values.email);
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                "email": values.email,
                "password": values.password,
            }),
        });
        const data = await response.json();
        console.log(response.status);
        if (response.status !== 200) {
            setLoading(false)
            setError(true);
            setColor('error')
            return;
        }
        localStorage.setItem("token", data.token);
        navigate('/welcome');

    }

    document.title='Login'


    return (
        !loading ? (<LoginPage className="container-fluid">

            <div className="col-12 col-md-8 col-lg-4">
                <CustomisedSnackbar show={error} msg='Invalid Credentials' color={color} />

                <LoginForm className="py-5 px-3">
                    <h2 className="mb-5">Login</h2>
                    <Form onSubmit={handleSubmit} >
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ width: '100%' }}
                                        required
                                        id="email"
                                        label="Email"
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email && errors.email}
                                        name='email' type="email" onChange={handleChange} value={values.email} onBlur={handleBlur} autoComplete="off" />

                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        required
                                        label="Password"
                                        type={isVisible ? 'text' : 'password'}
                                        id="password"
                                        error={errors.password && touched.password}
                                        helperText={errors.password && touched.password && errors.password}
                                        name='password' onChange={handleChange} value={values.password} onBlur={handleBlur} autoComplete="off"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={() => setIsVisible(!isVisible)}>
                                                    <IconButton >
                                                        {isVisible ? <VisibilityOffIcon />: <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8} sx={{ justifyContent: 'end' }}>
                                    <div className="p-0 d-flex justify-content-end">
                                        <Typography variant="caption" display="inline" gutterBottom>
                                            <Link to="/forgot-password"> Forgot Password?</Link>
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Button sx={{ width: '100%' }} variant="contained" color='success' type="submit" >Login <LoginIcon /></Button>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Need an Account?
                                        <Typography variant="overline" display="inline" gutterBottom>
                                            <Link to="/register"> Signup here <AppRegistrationIcon fontSize="small" /></Link>
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </LoginForm>

            </div>

        </LoginPage>) : <LoaderPage />
    );
};

export default Login;

const LoginPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background-color:whitesmoke;     */
    background: linear-gradient(180deg, #00a884 30%, whitesmoke 30%);
     `;
const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    background-color:white;
    border-radius: 10px;

    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
    -moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
`;

const Form = styled.form``;