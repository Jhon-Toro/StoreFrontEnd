import React, { useState } from "react";
import axiosInstance from "../../api/axiosIntance";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { RegisterFormData } from "../../interfaces/auth/Register.interface";
import './auth.scss';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) errors.username = "El nombre de usuario es requerido.";
    if (!formData.email) {
      errors.email = "El correo es requerido.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Introduce un correo válido.";
    }
    if (!formData.password) errors.password = "La contraseña es requerida.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden.";

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      const { data } = await axiosInstance.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      setError("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleRegister} className="form-container">
        <h2 className="form-container-title">Registro</h2>
        {error && <p className="form-error">{error}</p>}

        <div className="input-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className={`form-container-input ${formErrors.username ? "error" : ""}`}
          />
          {formErrors.username && (
            <p className="form-container-input-error">{formErrors.username}</p>
          )}
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
            className={`form-container-input ${formErrors.email ? "error" : ""}`}
          />
          {formErrors.email && <p className="form-container-input-error">{formErrors.email}</p>}
        </div>

        <div className="input-group">
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          {formErrors.password && (
            <p className="form-container-input-error">{formErrors.password}</p>
          )}
        </div>

        <div className="input-group">
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              className={`form-container-input ${formErrors.confirmPassword ? "error" : ""}`}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-toggle"
            >
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </span>
          </div>
          {formErrors.confirmPassword && (
            <p className="form-container-input-error">{formErrors.confirmPassword}</p>
          )}
        </div>

        <button className="form-container-submit" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
