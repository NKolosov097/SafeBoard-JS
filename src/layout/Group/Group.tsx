import React, { useEffect, useState } from "react"
import { IGroup, IUser } from "../../types"
import styles from "./Group.module.css"
import { useAppSelector } from "../../hooks"
import { GroupItem } from "./components/GroupItem"
import { PopupItem } from "./components/PopupItem"
import { Panel } from "../../components/Panel/Panel"

export const Group = ({
  users: data,
}: {
  users: Array<IUser>
}): React.JSX.Element => {
  const { groups: groupsData } = useAppSelector((state) => state.groups)
  const [users, setUsers] = useState<Array<IUser>>(data)
  const [groups, setGroups] = useState<Array<IGroup>>(groupsData)
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    const results = groupsData.filter(
      (user) => user.title && user.title.toLowerCase().includes(inputValue)
    )
    setGroups(results)
  }, [groupsData, inputValue])

  return (
    <>
      <Panel
        isGroups
        groups={groups}
        setGroups={setGroups}
        users={users}
        setUsers={setUsers}
        value={inputValue}
        onChange={setInputValue}
      />

      <div className={styles.groupWrapper}>
        <PopupItem />
        {groups.map((group) => (
          <GroupItem
            key={group.id}
            id={group.id}
            title={group.title}
            users={group.users}
          />
        ))}
      </div>
    </>
  )
}
