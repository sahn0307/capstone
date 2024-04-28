// login.js
'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password_hash: values.password,
          }),
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Redirect to a protected page or update the UI
            Cookies.set('token', data.token);
        } else {
          const errorData = await response.json();
          console.error(errorData);
          // Handle login error, e.g., display error message
        }
      } catch (error) {
        console.error(error);
        // Handle network or other errors
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}