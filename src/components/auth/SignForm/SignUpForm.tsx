import { Form, Link, useNavigate } from "react-router-dom"
import AuthInput from "../AuthInput/AuthInput"
import { Button, Row } from "react-bootstrap"
import React, { useState } from "react";
import axios from "axios";
import FormFile from "../../FormFile/FormFile";
import UserService from "../../../services/UserService";

function SignUpForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [profile_image, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("last_name", last_name);
      formData.append("user_name", `${first_name}_${last_name}`);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
      if (profile_image) {
        formData.append("profile_image", profile_image);
      }
      formData.append("first_name", first_name);
      const response = await axios.post("https://web-production-3ca4c.up.railway.app/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
      if (response.data?.data.user) {
        UserService.saveUserInfo({
          firstName: response.data.data.user.first_name,
          lastName: response.data.data.user.last_name,
          profileImage: response.data.data.user.profile_image_url
        });
      }
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data?.errors) {
        const serverErrors = error.response.data.errors;
        const extractedErrors: Record<string, string> = {};
    
        for (const key in serverErrors) {
          if (serverErrors[key].length > 0) {
            extractedErrors[key] = serverErrors[key][0];
          }
        }
    
        setErrors(extractedErrors);
      } else if (error.response && error.response.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Please check your internet connection or try again later." });
      }
    }
  }
  return (
    <>
      <Form onSubmit={handleSignUp} className='w-100'>
        <div className="d-flex flex-column gap-20">
          <Row>
            <AuthInput type='text' label='Name' value={first_name} className='col-6' placeholder="First Name" required={true} onChange={(e) => setFirstName(e.target.value)} error={errors.first_name} controlId= "formGroupFirstName"/>
            <AuthInput type='text' value={last_name} className='col-6 mt-2' placeholder="Last Name" required={true} onChange={(e) => setLastName(e.target.value)} error={errors.last_name} controlId= "formGroupLastName"/>
          </Row>
          <AuthInput type='text' label='Email' value={email} className='col-12' placeholder="Enter your email" required={true} onChange={(e) => setEmail(e.target.value)} error={errors.email} controlId= "formGroupEmail"/>
          <Row>
            <AuthInput type='password' label='Password' value={password} className='col-6' placeholder="Enter password" required={true} onChange={(e) => setPassword(e.target.value)} error={errors.password} controlId= "formGroupPassword"/>
            <AuthInput type='password' value={password_confirmation} className='col-6 mt-2' placeholder="Re-enter your password" required={true} onChange={(e) => setPasswordConfirmation(e.target.value)} error={errors.password_confirmation} controlId= "formGroupConfirm"/>
          </Row>
          <FormFile onChange={setProfileImage} className="col-3" />
        </div>
        <Button className='form-button signup w-100 rounded-4px bg-primary-color border-0 fs-14' type="submit">
          SIGN UP
        </Button>
      </Form>
      <p className='text-center fs-14 color-gray-01'>Do you have an account? <Link className='color-primary' to={'/auth/login'}>Sign in</Link></p>
    </>
  )
}

export default SignUpForm
