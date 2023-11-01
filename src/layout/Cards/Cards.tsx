import { ICard } from "../../types"
import styles from "./Cards.module.css"
import { CgProfile } from "react-icons/cg"

export const Cards = ({
  users,
}: {
  users: Array<ICard>
}): React.JSX.Element => {
  return (
    <>
      <div className={styles.cards}>
        {users.map((user) => (
          <div key={user.id} className={styles.userWrapper}>
            <span>ID {user.id}</span>
            <div
              className={styles.fullName}
            >{`${user.first_name} ${user.last_name}`}</div>
            <CgProfile size={150} />
            <div className={styles.group}>{user.group}</div>
            <div className={styles.phone}>+{user.phone}</div>
          </div>
        ))}
      </div>
    </>
  )
}
