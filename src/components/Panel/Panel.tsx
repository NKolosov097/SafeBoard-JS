import React, { useState } from "react"
import { IGroup, IPanelProps, StateOfSort } from "../../types"
import { Search } from "../Search/Search"
import styles from "./Panel.module.css"

export const Panel = ({
  isGroups,
  setGroups,
  groups,
  users,
  setUsers,
  value,
  onChange,
}: IPanelProps): React.JSX.Element => {
  const [sortByNumber, setSortByNumber] = useState<StateOfSort>(
    StateOfSort.ascending
  )
  const [sortByName, setSortByName] = useState<StateOfSort>(StateOfSort.null)
  const [isSortByGroupTitle, setIsSortByGroupTitle] = useState<boolean>(true)

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

  const handleSortByGroupTitle = () => {
    const groupsCopy = [...(groups as Array<IGroup>)]

    setIsSortByGroupTitle(!isSortByGroupTitle)

    groupsCopy.sort((a, b) => {
      if (a.title && b.title) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return isSortByGroupTitle ? -1 : 1
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return isSortByGroupTitle ? 1 : -1
        }
      }
      return 0
    })

    setGroups && setGroups(groupsCopy)
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
      {!isGroups ? (
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
      ) : (
        <div className={styles.groupItem} />
      )}

      <Search isGroups={isGroups} value={value} onChange={onChange} />

      {!isGroups ? (
        <button className={styles.sortItem} onClick={handleSortByName}>
          {sortByName === StateOfSort.ascending
            ? "От A до Z ↑"
            : sortByName === StateOfSort.descending
            ? "От Z до A ↓"
            : "Не отсортировано"}
        </button>
      ) : (
        <button
          className={styles.SortItemGroup}
          onClick={handleSortByGroupTitle}
        >
          {isSortByGroupTitle ? "От A до Z ↑" : "От Z до A ↓"}
        </button>
      )}
    </div>
  )
}
