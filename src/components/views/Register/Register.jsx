import React from 'react';
import { useFormik } from "formik";

export const Register = () => {

  const initialValues = {
    email: "",
    password: ""
  }

  

  const onSubmit = () => {
alert() 
 }

  const formik = useFormik({ initialValues, onSubmit});

  const {handleSubmit, handleChange, values, errors} = formik

  return (
    <div className='container'>
      <form onSubmit= {handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>Username</label>
          <input
            name='text'
            type='userName'
            onChange={handleChange}
            value={ values.userName }
          />
          {errors.userName && <div>{errors.userName} </div>}
        </div>
        <div>
          <label>Password</label>
          <input name='password'
           type='password'
            onChange={handleChange }
            value={values.password  } 
            />
           {errors.password && <div>{errors.password} </div>}
        </div>
        <div>
          <label>Email</label>
          <input
            name='email'
            type='email'
            onChange={handleChange}
            value={ values.email }
          />
          {errors.email && <div>{errors.email} </div>}
        </div>
        <input type="hidden" name="teamID" value="9cdbd108-f924-4383-947d-8f0c651d0dad" />
        <div>
          <label>Role</label>
          <select name='role' onChange={handleChange} value={ values.role }>
          <option value= "team member" >team member</option>
          <option value= "team leader" >team leader</option>
          </select>
          {errors.role && <div>{errors.role} </div>}
        </div><div>
          <label>Continent</label>
          <select name='continent' onChange={handleChange} value={ values.continent }>
          <option value= "America" >America</option>
          <option value= "Europa" >Europa</option>
          <option value= "Otro" >Other</option>

          </select>
          {errors.continent && <div>{errors.continent} </div>}
        </div>
        <div>
          <label>Region</label>
          <select name='region' onChange={handleChange} value={ values.region }>
          <option value= "Latam" >Latam</option>
          <option value= "Brazil" >Brazil</option>
          <option value= "America del norte" >North America </option>
          <option value= "Otro" >Other</option>

          </select>
          {errors.region && <div>{errors.region} </div>}
        </div>
        <div>
          <button type='submit'>Send</button>
        </div>
      </form>
</div>
  )
}