import { useNavigate } from "react-router-dom"
import "./Header.styles.css"

export const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("logged");
        navigate("/login", {replace:true});
    }

  return (
   <header>
    <img src="/img/Go_Scrum.png" alt="Logo Go Scrum" />
    <div onClick={handleLogout}>Cerrar sesión</div>
   </header>
  )
}