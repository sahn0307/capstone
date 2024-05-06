'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9_]*$/, 'Username must be alphanumeric with underscores only'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const initialValues = {
    username: user?.username || '',
    email: user?.email || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateUser(user.id, values);
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}