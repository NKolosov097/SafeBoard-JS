import React from "react"
import { IUser } from "../../types"
import styles from "./Table.module.css"

export const Table = ({
  users,
}: {
  users: Array<IUser>
}): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Имя</th>
            <th scope="col">Учетная запись</th>
            <th scope="col">Электронная почта</th>
            <th scope="col">Группа</th>
            <th scope="col">Номер телефона</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {users.map((user) => (
            <tr key={user.id} className={styles.tr}>
              <td>{user.id}</td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.account}</td>
              {/* <td>{user.account.split("companydomain/")[1]}</td> */}
              <td>{user.email}</td>
              <td>{user.group}</td>
              <td>+{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
