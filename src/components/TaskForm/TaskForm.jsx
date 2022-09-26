import * as Yup from "yup";
import { useFormik } from "formik";

import "./TaskForm.styles.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const TaskForm = () => {
    const initialValues = {
        title: "",
        status: "",
        importance: "",
        description: "",
    };

    const onSubmit = () => {
        fetch(`${API_ENDPOINT}task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ task: values }),
        })
            .then(response => response.json())
            .then((data) => {
                resetForm()
                alert("tarea creada")
            });
    };

    const required = "*Required field";
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(6, "enter a minimum of 6 characters")
            .required(required),
        status: Yup.string().required(required),
        description: Yup.string().required(required),
        importance: Yup.string().required(required),
    });

    const formik = useFormik({ initialValues, validationSchema, onSubmit });

    const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik;

    return (
        <section className="task-form">
            <h2>Create task</h2>
            <p>Create your tasks</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="title"
                            className={errors.title && touched.title ? "error" : ""}
                            value={values.title}
                        />
                        {errors.title && touched.title && (
                            <span className="error-message">{errors.title}</span>
                        )}
                    </div>

                    <div>
                        <select
                            name="status"
                            className={errors.status && touched.status ? "error" : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                        >
                            <option value="">Select state</option>
                            <option value="NEW">New</option>
                            <option value="IN PROGRESS">In process</option>
                            <option value="FINISHED">Finished</option>
                        </select>
                        {errors.status && touched.status && (
                            <span className="error-message">{errors.status}</span>
                        )}
                    </div>
                    <div>
                        <select
                            name="importance"
                            className={errors.importance && touched.importance ? "error" : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.importance}
                        >
                            <option value="">Select importance</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                        {errors.importance && touched.importance && (
                            <span className="error-message">{errors.importance}</span>
                        )}
                    </div>
                </div>
                <div>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Description"
                        className={errors.description && touched.description ? "error" : ""}
                        value={values.description}
                    />
                </div>
                {errors.description && touched.description && (
                    <span className="error-message">{errors.description}</span>
                )}
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </section>
    );
};
