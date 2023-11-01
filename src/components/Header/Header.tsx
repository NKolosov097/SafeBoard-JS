import React from "react"
import { Link } from "react-router-dom"
import { paths } from "../../paths"
import styles from "./Header.module.css"

export const Header = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <Link to={paths.home}>Главная</Link>
      <Link to={paths.users}>Пользователи</Link>
    </header>
  )
}
