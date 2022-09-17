import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Login } from "./components/views/Login";
import { Error404 } from "./components/views/Error404/Error404";
import { Tasks } from "./components/views/Tasks/Tasks";

import "./App.css";

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("logged")) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;

};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  }
}

export const App = () => { 

  const location= useLocation();

 return(

  <AnimatePresence>
    <Routes location={location} key={location.pathname} >
      <Route path="/" element={
        <RequireAuth>
          <motion.div className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition} >
            <Tasks />
          </motion.div>
        </RequireAuth>} />

      <Route path="/login" element={
        <motion.div className="page"
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransition} > <Login />
        </motion.div>
      } />

      <Route path="*" element={
        <motion.div className="page"
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransition} >
          <Error404 />
        </motion.div>
      } />
    </Routes>
  </AnimatePresence>
);
}