import React from "react"
import styles from "./Search.module.css"
import { ISearchProps } from "../../types"

export const Search = ({
  value,
  onChange,
}: ISearchProps): React.JSX.Element => {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск пользователя по имени"
        value={value}
        onChange={(e) => onChange(e.target.value.toLowerCase())}
      />
    </form>
  )
}
