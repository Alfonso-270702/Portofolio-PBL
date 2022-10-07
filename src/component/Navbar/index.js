import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function NavbarTop() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-color">
        <div className="container-fluid mx-5 p-0">
          <span className="navbar-brand mb-0 h1 navbar-text">LaporBos</span>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
}
