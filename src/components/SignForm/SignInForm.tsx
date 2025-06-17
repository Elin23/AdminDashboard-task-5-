import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './SignForm.css'
import UserService from '../../services/UserService';
import InputComponent from '../InputComponent/InputComponent';
import AuthService from '../../services/AuthService';
import Loader from '../Loader/Loader';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ValidationService from '../../services/ValidationService';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    //note: I know that the backend already has validation
    // but I added these checks in the frontend to help users see mistakes faster
    // reduce requests to the server and to make the form feel better to use.
    const { valid, errors: validationErrors } = ValidationService.validateSignIn(email, password);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await AuthService.signIn(email, password);
      localStorage.setItem('token', data.token);

      if (data.user) {
        UserService.saveUserInfo({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          profileImage: data.user.profile_image_url,
        });
      }

      navigate('/');
    } catch (error: any) {
      setMessage(error.response?.data?.msg ?? 'Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Form onSubmit={handleSignIn} className='signin-form w-100'>
        <div className="d-flex flex-column gap-20">
          <InputComponent type='text' label='Email' fontSize='fs-14' value={email} className='col-12' placeholder="Enter your email" required={true} onChange={(e) => setEmail(e.target.value)} error={errors.email || message} controlId="formGroupEmail" />
          <InputComponent type='password' label='Password' fontSize='fs-14' value={password} className='col-12' placeholder="Enter your password" required={true} onChange={(e) => setPassword(e.target.value)} error={errors.password || message} controlId="formGroupUserPassword" />
        </div>
        <ButtonComponent variant='primary' type='submit' label='SIGN IN' className='form-button signin w-100 rounded-4px bg-primary-color border-0 fs-14' />
      </Form>
      <p className='text-center fs-14 color-gray-01'>Don't have an account? <Link className='color-primary' to={'/auth/register'}>Create one</Link></p>
    </>
  )
}

export default SignInForm
