import React from 'react'
import styles from './Layout.module.css';

function Layout({children}) {
  return (
    <>
        <header className={styles.header}>
            <h1>Cripto App</h1>
            <p>React.js</p>
        </header>
        {children}
        <footer className={styles.footer}>
            <h1>footer</h1>
        </footer>
    </>
  )
}

export default Layout