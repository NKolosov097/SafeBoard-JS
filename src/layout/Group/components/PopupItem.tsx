import { useState } from "react"
import Popup from "reactjs-popup"
import styles from "../Group.module.css"
import { AiOutlineClose } from "react-icons/ai"
import { IUser } from "../../../types"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { addGroup } from "../../../redux/slices/groups"
import { v4 as uuid } from "uuid"

export const PopupItem = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.cards.data)
  const [inputValue, setInputValue] = useState<string>("")
  const [users, setUsers] = useState<Array<IUser>>([])
  const [allUsers, setAllUsers] = useState<Array<IUser>>(data as Array<IUser>)

  const handleCreateGroup = (close: () => void) => {
    dispatch(addGroup({ id: uuid(), title: inputValue, users }))
    setUsers([])
    close()
  }

  const handleAddUser = (id: number) => {
    const user = allUsers.filter((u) => u.id === id)
    setUsers([...users, ...user])
    setAllUsers(allUsers.filter((user) => user.id !== id))
  }

  return (
    <Popup
      trigger={<button className={styles.addGroup}>Добавить группу</button>}
      modal
      nested
    >
      {/* @ts-ignore */}
      {(close) => (
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={close}>
            <AiOutlineClose size={24} />
          </button>
          <input
            placeholder="Введите название группы"
            name="groupName"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={styles.content}>
            {users.length === 0 ? (
              <div style={{ width: "100%" }}>
                Не добавлен ни один пользователь
              </div>
            ) : (
              users.map((user) => (
                <div
                  className={styles.add}
                  style={{
                    textAlign: "center",
                    border: "1px solid var(--light)",
                  }}
                  key={user.id}
                >
                  {user.first_name} {user.last_name}
                </div>
              ))
            )}
          </div>
          <Popup
            trigger={
              <button className={styles.addUserBtn}>
                Добавить пользователя
              </button>
            }
            position="top center"
            nested
          >
            <div className={styles.addUserPopupWrapper}>
              {allUsers.map((user) => (
                <button
                  onClick={() => handleAddUser(user.id)}
                  className={styles.add}
                  style={{ cursor: "pointer" }}
                  key={user.id}
                >
                  {user.first_name} {user.last_name}
                </button>
              ))}
            </div>
          </Popup>
          <button
            className={styles.createBtn}
            onClick={() => handleCreateGroup(close)}
          >
            Создать группу
          </button>
        </div>
      )}
    </Popup>
  )
}
