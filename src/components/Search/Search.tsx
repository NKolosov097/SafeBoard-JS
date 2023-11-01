import React from "react"
import styles from "./Search.module.css"
import { ISearchProps } from "../../types"

export const Search = ({
  isGroups,
  value,
  onChange,
}: ISearchProps): React.JSX.Element => {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder={
          isGroups ? "Поиск по названию группы" : "Поиск пользователя по имени"
        }
        value={value}
        onChange={(e) => onChange(e.target.value.toLowerCase())}
      />
    </form>
  )
}
