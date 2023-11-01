import React, { useEffect, useState } from "react"
import styles from "./Users.module.css"
import { useAppSelector } from "../../hooks"
import cn from "classnames"
import { IUser } from "../../types"
import { Table } from "../../layout/Table/Table"
import { Cards } from "../../layout/Cards/Cards"
import { Group } from "../../layout/Group/Group"
import { Panel } from "../../components/Panel/Panel"

interface IView {
  id: number
  content: string
  active: boolean
}

const initialState: Array<IView> = [
  {
    id: 1,
    content: "Таблица",
    active: true,
  },
  {
    id: 2,
    content: "Карточки",
    active: false,
  },
  {
    id: 3,
    content: "Группы",
    active: false,
  },
]

export const Users = (): React.JSX.Element => {
  const data = useAppSelector((state) => state.cards.data) as Array<IUser>

  const [view, setView] = useState<Array<IView>>(initialState)
  const [users, setUsers] = useState<Array<IUser>>(data)
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    const results = data.filter((user) =>
      user.first_name.toLowerCase().includes(inputValue)
    )
    setUsers(results)
  }, [data, inputValue])

  return (
    <section className={styles.wrapper}>
      <div className={styles.viewContainer}>
        {view.map((item) => (
          <div key={item.id} className={styles.viewContainer}>
            <button
              onClick={() =>
                setView(
                  view.map((i) => {
                    if (i.id === item.id) {
                      i.active = true
                    } else {
                      i.active = false
                    }

                    return i
                  })
                )
              }
              className={cn(styles.view, {
                [styles.active]: item.active,
              })}
            >
              {item.content}
            </button>
          </div>
        ))}
      </div>

      <hr />

      {!view[2]?.active && (
        <Panel
          users={users}
          setUsers={setUsers}
          value={inputValue}
          onChange={setInputValue}
        />
      )}

      {view[0]?.active && <Table users={users} />}
      {view[1]?.active && <Cards users={users} />}
      {view[2]?.active && <Group users={users} />}
    </section>
  )
}
