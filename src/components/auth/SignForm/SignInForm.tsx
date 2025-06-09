import { useState } from 'react';
import AuthInput from '../AuthInput/AuthInput'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignInForm.css'
import UserService from '../../../services/UserService';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://web-production-3ca4c.up.railway.app/api/login',
        {
          email,
          password
        }
      );
      localStorage.setItem('token', response.data.token);
      UserService.saveUserInfo(
        {
          firstName: response.data.user.first_name,
          lastName: response.data.user.last_name,
          profileImage: response.data.user.profile_image_url
        }
      )
      navigate('/');
    } catch (error: any) {
      setMessage(`${error.response?.data?.msg}`);
    }
  }
  return (
    <>
      <Form onSubmit={handleSignIn} className='signin-form w-100'>
        <div className="d-flex flex-column gap-20">
          <AuthInput type='text' label='Email' value={email} className='col-12' placeholder="Enter your email" required={true} onChange={(e) => setEmail(e.target.value)} error={message} controlId= "formGroupEmail"/>
          <AuthInput type='password' label='Password' value={password} className='col-12' placeholder="Enter your password" required={true} onChange={(e) => setPassword(e.target.value)} error={message} controlId= "formGroupUserPassword"/>
        </div>
        <Button className='form-button signin w-100 rounded-4px bg-primary-color border-0 fs-14' type="submit">
          SIGN IN
        </Button>
      </Form>
      <p className='text-center fs-14 color-gray-01'>Don't have an account? <Link className='color-primary' to={'/auth/register'}>Create one</Link></p>
    </>
  )
}

export default SignInForm
