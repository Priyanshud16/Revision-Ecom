import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'
function Navbar() {
  return (
    <div className={styles.navbar}>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/products">Product</Link>
    </div>
  )
}

export default Navbar