import React from "react";
import { API } from "aws-amplify";
import { ErrorMessage, Field, Form, Formik } from "formik";

import "./contactForm.css";

const contact = ({ name, email, message }) => {
  return API.post("contactForm", "/contact", {
    body: {
      name,
      email,
      message,
    },
  });
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validate = ({ name, email, message }) => {
  let errors = {};
  if (!EMAIL_REGEX.test(email)) {
    errors.email = "A valid email is required";
  }
  if (name === "") {
    errors.name = "Please enter your name";
  }

  if (message === "") {
    errors.message = "Please enter a message";
  }
  return errors;
};

export const ContactForm = () => (
  <Formik
    initialValues={{
      name: "",
      email: "",
      message: "",
    }}
    validate={validate}
    onSubmit={(values, { setSubmitting, resetForm, status }) => {
      contact(values)
        .then(response => {
          console.log(response);
          console.log(status);
          resetForm();
        })
        .catch(errors => {
          setSubmitting(false);
          console.error(errors);
        });
    }}
  >
    {({ isSubmitting, status }) => (
      <Form className="contact-form">
        <div className="contact-form-field">
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            name="name"
            id="name"
            className="contact-name contact-field"
          />
          <ErrorMessage name="name" component="div" />
        </div>
        <div className="contact-form-field">
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            name="email"
            id="email"
            className="contact-email contact-field"
          />
          <ErrorMessage name="email" component="div" />
        </div>
        <div className="contact-form-field">
          <label htmlFor="message">Message</label>
          <Field
            type="text"
            name="message"
            component="textarea"
            id="message"
            className="contact-message contact-field"
          />
          <ErrorMessage name="message" component="div" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="contact-form-submit"
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
);
