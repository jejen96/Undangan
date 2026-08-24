import React from 'react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          <span className="navbar__logo-text">UndangTeman.id</span>
        </a>
        <div className="navbar__links">
          <a href="#template" className="navbar__link">Pilih Tema</a>
          <a href="#harga"    className="navbar__link">Harga</a>
          <a href="#cara"     className="navbar__link">Cara Pesan</a>
        </div>

        {isLoggedIn ? (
          <div className="navbar__user">
            <span className="navbar__user-name">Halo, {user?.full_name?.split(' ')[0]}</span>
            <button className="navbar__logout" onClick={logout}>Keluar</button>
          </div>
        ) : (
          <a href="/login" className="navbar__cta">Coba Gratis</a>
        )}
      </div>
    </nav>
  )
}
