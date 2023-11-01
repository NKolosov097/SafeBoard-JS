import React from "react"
import { ICard } from "../../types"
import styles from "./Group.module.css"

export const Group = ({
  users,
}: {
  users: Array<ICard>
}): React.JSX.Element => {
  return (
    <div className={styles.groupWrapper}>
      <button className={styles.addGroup}>Добавить группу</button>
    </div>
  )
}
