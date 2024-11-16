import React, { useState } from "react";
import axiosInstance from "../../api/axiosIntance";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import './auth.scss';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "El correo es requerido.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Introduce un correo válido.";
    }

    if (!password) {
      errors.password = "La contraseña es requerida.";
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { access_token: token, user } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setLogin({ user, token }));
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Credenciales inválidas.");
      } else {
        setErrorMessage("Ha ocurrido un error, intentalo más tarde.");
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleLogin} className="form-container">
        <h2 className="form-container-title">Login</h2>
        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className={`form-container-input ${formErrors.email ? "error" : ""}`}
          />
          {formErrors.email && <p className="form-container-input-error">{formErrors.email}</p>}
        </div>

        <div className="input-group">
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className={`form-container-input ${formErrors.password ? "error" : ""}`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </span>
          </div>
          {formErrors.password && <p className="form-container-input-error">{formErrors.password}</p>}
        </div>

        <button className="form-container-submit" type="submit">Iniciar Sesión</button>
        <p>¿No tienes cuenta? <Link to="/auth/register">¡Regístrate!</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
