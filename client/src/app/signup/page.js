'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Signup() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/v1/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password_hash: values.password, // Change 'password' to 'password_hash'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Handle successful signup, e.g., redirect to login page
          router.push('/login');
        } else {
          const errorData = await response.json();
          console.error(errorData);
          // Handle signup error, e.g., display error message
        }
      } catch (error) {
        console.error(error);
        // Handle network or other errors
      }
    },
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <div>{formik.errors.username}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <div>{formik.errors.email}</div>
        )}
        <input
          type="password"
          placeholder="Password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <div>{formik.errors.password}</div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}