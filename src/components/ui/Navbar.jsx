import React from 'react'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark mb-4">
                <span className="navbar-brand">
                <i className="fas fa-user"/> Andres
                </span>
                <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"/> Salir
                </button>
            </nav>
        </div>
    )
}
