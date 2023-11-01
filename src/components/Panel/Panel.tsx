import React, { useState } from "react"
import { IPanelProps, StateOfSort } from "../../types"
import { Search } from "../Search/Search"
import styles from "./Panel.module.css"

export const Panel = ({
  users,
  setUsers,
  value,
  onChange,
}: IPanelProps): React.JSX.Element => {
  const [sortByNumber, setSortByNumber] = useState<StateOfSort>(
    StateOfSort.ascending
  )
  const [sortByName, setSortByName] = useState<StateOfSort>(StateOfSort.null)

  // Вспомогательная функция для сортировки по имени. При этом сортировка по ID отключается
  const handleSortByName = () => {
    const usersCopy = [...users]

    setSortByName(
      sortByName === StateOfSort.null
        ? StateOfSort.descending
        : sortByName === StateOfSort.ascending
        ? StateOfSort.descending
        : StateOfSort.ascending
    )
    setSortByNumber(StateOfSort.null)

    usersCopy.sort((a, b) => {
      if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
        return sortByName === StateOfSort.descending ? -1 : 1
      }
      if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
        return sortByName === StateOfSort.descending ? 1 : -1
      }
      return 0
    })

    setUsers(usersCopy)
  }

  // Вспомогательная функция для сортировки по ID. При этом сортировка по имени отключается
  const handleSortByNumber = () => {
    const usersCopy = [...users]

    setSortByNumber(
      sortByNumber === StateOfSort.null
        ? StateOfSort.descending
        : sortByNumber === StateOfSort.ascending
        ? StateOfSort.descending
        : StateOfSort.ascending
    )
    setSortByName(StateOfSort.null)

    usersCopy.sort((a, b) => {
      if (a?.id < b?.id) {
        return sortByNumber === StateOfSort.descending ? -1 : 1
      }
      if (a?.id > b?.id) {
        return sortByNumber === StateOfSort.descending ? 1 : -1
      }
      return 0
    })

    setUsers(usersCopy)
  }

  return (
    <div className={styles.panelWrapper}>
      <button className={styles.sortItem} onClick={handleSortByNumber}>
        {sortByNumber === StateOfSort.ascending
          ? `От ${users[0]?.id || "😟"} до ${
              users[users.length - 1]?.id || "😊"
            } ↑`
          : sortByNumber === StateOfSort.descending
          ? `От ${users[0]?.id || "😊"} до ${
              users[users.length - 1]?.id || "😟"
            } ↓`
          : "Не отсортировано"}
      </button>

      <Search value={value} onChange={onChange} />

      <button className={styles.sortItem} onClick={handleSortByName}>
        {sortByName === StateOfSort.ascending
          ? "От A до Z ↑"
          : sortByName === StateOfSort.descending
          ? "От Z до A ↓"
          : "Не отсортировано"}
      </button>
    </div>
  )
}
