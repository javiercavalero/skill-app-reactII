import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";

import "../Auth.styles.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT} = process.env

export const Register = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${API_ENDPOINT}auth/data`)
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };
  const required = "*Required field";
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "enter a minimum of 4 characters")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Must be a valid email").required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });


  const handleChangeContinent = value => {
    setFieldValue("continent", value)
    if(value !== "America") setFieldValue("region", "Otro")
  }

  const onSubmit = () => {
  const teamID = !values.teamID ? uuidv4() : values.teamID

  fetch(`${API_ENDPOINT}auth/register`, {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user:{
        userName: values.userName,
        password: values.password,
        email: values.email,
        teamID ,
        role: values.role,
        continent: values.continent ,
        region: values.region ,
      },
    }),
  }).then(response => response.json())
  .then(data => navigate("/registered/" + data?.result?.user?.teamID, {replace: true} ))

  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values, setFieldValue } =formik;
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>Username</label>
          <input
            name="userName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <FormControlLabel
          control={
            <Switch value={values.switch}
              onChange={() => formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="You belong to an existing team"
        />
        { values.switch && (
           <div>
          <label>Please, enter your team identifier </label>
          <input
            type="text"
            name="teamID"
            value={values.teamID}
            onChange={handleChange}
          />
        </div>)   }
       
        <div>
          <label>Role</label>
          <select
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Select role...</option>
            {data?.Rol?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}

          <label>Continent</label>
          <select
            name="continent"
            onChange={ event => handleChangeContinent(event.currentTarget.value) }
            onBlur={handleBlur}
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Select continent...</option>
            {data?.continente?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === "America" && (
          <div>
            <label>Region</label>
            <select
              name="region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Select region...</option>
              {data?.region?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}

        <div>
          <button type="submit">Send</button>
        </div>
        <div>
          {" "}
          <Link to="/login">Login</Link>{" "}
        </div>
      </form>
    </div>
  );
};
