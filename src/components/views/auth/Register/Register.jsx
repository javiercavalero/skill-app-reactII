import React from 'react';
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import "../Auth.styles.css";

export const Register = () => {

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
  }
  const required = "*Required field"
  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4, "enter a minimum of 4 characters").required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Must be a valid email").required(required),
    teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  })


  const onSubmit = () => {
    alert()
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = formik
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>Username</label>
          <input
            name='userName'
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <span className="error-message">{errors.userName}</span>}
        </div>
        <div>
          <label>Password</label>
          <input name='password'
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            name='email'
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
        </div>
        <input type="hidden" name="teamID" value="9cdbd108-f924-4383-947d-8f0c651d0dad" />
        <div>
          <label>Role</label>
          <select name='role'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}>
            <option value="" >Select role</option>
            <option value="team member" >team member</option>
            <option value="team leader" >team leader</option>
          </select>
          {errors.role && touched.role && <span className="error-message">{errors.role}</span>}

          <label>Continent</label>
          <select name='continent'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}>
            <option value="" >Select continent</option>
            <option value="America" >America</option>
            <option value="Europa" >Europa</option>
            <option value="Otro" >Other</option>
          </select>
          {errors.continent && touched.continent && <span className="error-message">{errors.continent}</span>}        </div>
        <div>
          <label>Region</label>
          <select name='region'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.region}
            className={errors.region && touched.region ? "error" : ""}>
            <option value="" >Select region</option>
            <option value="Latam" >Latam</option>
            <option value="Brazil" >Brazil</option>
            <option value="America del norte" >North America </option>
            <option value="Otro" >Other</option>
          </select>
          {errors.region && touched.region && <span className="error-message">{errors.region}</span>}
        </div>
        <div>
          <button type='submit'>Send</button>
        </div>
        <div> <Link to="/login">Login</Link> </div>
      </form>
    </div>
  )
}