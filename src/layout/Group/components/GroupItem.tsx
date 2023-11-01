import { useState } from "react"
import Popup from "reactjs-popup"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import {
  addUser,
  changeTitle,
  removeGroup,
  removeUser,
} from "../../../redux/slices/groups"
import { IGroup, IUser } from "../../../types"
import styles from "../Group.module.css"
import { AiOutlineClose } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md"
import { FiTrash } from "react-icons/fi"
import cn from "classnames"

export const GroupItem = ({ id, title, users }: IGroup): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const all = useAppSelector((state) => state.cards.data)
  const [inputValue, setInputValue] = useState<string>(title || "")
  const [usersData, setUsersData] = useState<Array<IUser>>(
    users as Array<IUser>
  )
  const [allUsers, setAllUsers] = useState<Array<IUser>>(all as Array<IUser>)

  const handleAddUser = (user: IUser) => {
    const userD = allUsers.filter((u) => u.id === user.id)
    setUsersData([...usersData, ...userD])
    dispatch(addUser({ id, user }))
    setAllUsers(allUsers.filter((u) => u.id !== user.id))
  }

  return (
    <div className={styles.groupItem}>
      <div className={styles.title}>
        {title !== inputValue ? (
          <button
            title="Изменить название группы"
            className={styles.editButton}
            onClick={() => dispatch(changeTitle({ id, title: inputValue }))}
          >
            <MdModeEditOutline size={24} />
          </button>
        ) : null}
        <input
          placeholder="Ведите название"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className={cn(styles.input, styles.title)}
          onSubmit={() => dispatch(changeTitle({ id, title: inputValue }))}
        ></input>
        <button
          title="Удалить группу"
          className={styles.closeButton}
          onClick={() => dispatch(removeGroup(id))}
        >
          <AiOutlineClose size={24} />
        </button>
      </div>

      <div className={styles.usersWrapper}>
        {users?.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <div>{user.first_name}</div>
            <button
              onClick={() => dispatch(removeUser({ id, userID: user.id }))}
              className={styles.removeUser}
            >
              <FiTrash color="red" size={20} />
            </button>
            <div className={styles.userGroup}>{user.group}</div>
          </div>
        ))}
      </div>

      <Popup
        trigger={
          <button className={styles.addUserBtn}>Добавить пользователя</button>
        }
        position="top center"
        nested
      >
        <div className={styles.addUserPopupWrapper}>
          {allUsers.map((user) => (
            <button
              onClick={() => handleAddUser(user)}
              className={styles.add}
              style={{ cursor: "pointer" }}
              key={user.id}
            >
              {user.first_name} {user.last_name}
            </button>
          ))}
        </div>
      </Popup>
    </div>
  )
}
