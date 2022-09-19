import "./TaskForm.styles.css"
import * as Yup from "yup"
import { useFormik } from "formik"

export const TaskForm = () => {
    const initialValues = {
        title: "",
        status: "",
        priority: "",
        description: ""
    }

    const onSubmit = () => {
        alert()
    }

    const required = "*Required field"
    const validationSchema = Yup.object().shape({

        title: Yup.string().min(6,"enter a minimum of 6 characters").required(required),
        status: Yup.string().required(required),
        priority: Yup.string().required(required),

    })

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const { handleSubmit, handleChange, errors } = formik

    return <section className="task-form">
        <h2>Create task</h2>
        <p>Create your tasks</p>
        <form onSubmit={handleSubmit}>
            <div>
                <div> 
                <input name="title" onChange={handleChange}  placeholder="title"/>
                 {errors.title && <span>{errors.title}</span> }
                </div>
                
                <div>
                    <select name="status" onChange={handleChange} >
                        <option value="">Select state</option>
                        <option value="new">New</option>
                        <option value="inProcess">In process</option>
                        <option value="finished">Finished</option>
                    </select>
                    {errors.status && <span>{errors.status}</span> }

                </div>
                <div>
                 <select name="priority" onChange={handleChange} >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                {errors.priority && <span>{errors.priority}</span> }

                </div>
            </div>
            <div> <textarea name="description" onChange={handleChange} placeholder="Description" /> </div>
            <button type="submit">Create</button>
        </form>
    </section>
}