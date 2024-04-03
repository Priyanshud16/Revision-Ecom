import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import { Input, Button, useToast } from '@chakra-ui/react';

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return {...state, email: action.payload};
    case 'password':
      return {...state, password: action.payload};
    case 'reset':
      return {...state,email: "", password: ""};
    case 'LOADING':
      return {...state, loading: true};
    case 'ERROR':
      return {...state, error: true, loading: false};
    case "SUCCESS":
      return {...state, error: false, loading: false};
    default:
      return state;
  }
};

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    loading: false,
    error: false,
  });
  const { loading, error,email,password } = state;

  const {Loginuser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch({ type: "LOADING" });

    try {
      const { data } = await axios({
        url: "https://reqres.in/api/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {email,password}
      });
      dispatch({ type: "SUCCESS" });
      Loginuser(data.token)
      dispatch({ type: "reset" });
      navigate('/');
    } catch (error) {
      console.error(error);
      dispatch({ type: "ERROR" });

      toast({
        title: 'Login Failed',
        description: 'Incorrect email or password. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: name, payload: value });
  };

  if (loading) {
    return <Loading/> 

  }
  // if (error) {
  //   return <Error/>
  // }
  return (
  <form onSubmit={handleSubmit}>
  <table>
    <tbody>
      <tr>
 <td>Email</td>
 <td>
 <Input htmlSize={30} width='auto'  name='email' onChange={handleChange} type="text" placeholder='Enter Your Email' value={email} />
 </td>
      </tr>
      <tr>
<td>Password</td>
<td>
<Input htmlSize={30} width='auto'  name='password' onChange={handleChange} type="password" placeholder='Enter Your Password' value={password} />
</td>
      </tr>
      <tr>
        <td>
          
        <Button colorScheme='blue' type='submit'>Submit</Button>
          </td>
      </tr>
    </tbody>
  </table>
  </form>
  );
}

export default Login;