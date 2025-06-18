import { Form, Link, useNavigate } from "react-router-dom"
import { Row } from "react-bootstrap"
import React, { useState } from "react";
import FormFile from "../FormFile/FormFile";
import UserService from "../../services/UserService";
import InputComponent from "../InputComponent/InputComponent";
import AuthService from "../../services/AuthService";
import Loader from "../Loader/Loader";
import ValidationService from "../../services/ValidationService";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import './SignForm.css'

function SignUpForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [profile_image, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const { valid, errors: validationErrors } = ValidationService.validateSignUp({ first_name: first_name, last_name: last_name, email, password, password_confirmation: password_confirmation });
    if (!valid) {
      setErrors(validationErrors);
      return;
    }
    // note: if the user doesn't upload a profile image, my code will load a default one
    // this ensures the server always gets a valid image and prevents any missing image errors

    const loadDefaultImage = async () => {
      const response = await fetch('/AdminDashboard-task-5-/assets/imgs/default-avatar.jpg');
      const blob = await response.blob();
      const file = new File([blob], "default-avatar.jpg", { type: blob.type });
      return file;
    };

    let imageToUpload = profile_image;
    if (!imageToUpload) {
      imageToUpload = await loadDefaultImage();
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("user_name", `${first_name}_${last_name}`);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
      formData.append("profile_image", imageToUpload);

      const data = await AuthService.signUp(formData);

      localStorage.setItem('token', data.data.token);

      if (data?.data?.user) { // here I saved the user info to use them in sidebar 
        UserService.saveUserInfo({
          firstName: data.data.user.first_name,
          lastName: data.data.user.last_name,
          profileImage: data.data.user.profile_image_url
        });
      }

      navigate('/');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const extractedErrors: Record<string, string> = {};
        for (const key in error.response.data.errors) {
          extractedErrors[key] = error.response.data.errors[key][0];
        }
        setErrors(extractedErrors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Unknown error occurred' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Form onSubmit={handleSignUp} className='w-100'>
        <div className="d-flex flex-column gap-20">
          <Row>
            <InputComponent type='text' label='Name' fontSize='fs-14' value={first_name} className='col-6' placeholder="First Name" required={true} onChange={(e) => setFirstName(e.target.value)} error={errors.first_name} controlId="formGroupFirstName" />
            <InputComponent type='text' value={last_name} fontSize='fs-14' className='col-6 mt-2' placeholder="Last Name" required={true} onChange={(e) => setLastName(e.target.value)} error={errors.last_name} controlId="formGroupLastName" />
          </Row>
          <InputComponent type='text' label='Email' value={email} fontSize='fs-14' className='col-12' placeholder="Enter your email" required={true} onChange={(e) => setEmail(e.target.value)} error={errors.email} controlId="formGroupEmail" />
          <Row>
            <InputComponent type='password' label='Password' value={password} fontSize='fs-14' className='col-6' placeholder="Enter password" required={true} onChange={(e) => setPassword(e.target.value)} error={errors.password} controlId="formGroupPassword" />
            <InputComponent type='password' value={password_confirmation} fontSize='fs-14' className='col-6 mt-2' placeholder="Re-enter your password" required={true} onChange={(e) => setPasswordConfirmation(e.target.value)} error={errors.password_confirmation} controlId="formGroupConfirm" />
          </Row>
          <FormFile onChange={setProfileImage} className="col-3" error={errors.profile_image} />
        </div>
        <ButtonComponent variant='primary' type="submit" label='SIGN UP' className='form-button signup w-100 rounded-4px bg-primary-color border-0 fs-14 mt-3'/>
      </Form>
      <p className='text-center fs-14 color-gray-01'>Do you have an account? <Link className='color-primary' to={'/auth/login'}>Sign in</Link></p>
    </>
  )
}

export default SignUpForm
