import styles from "./Home.module.css"

export const Home = (): React.JSX.Element => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>
        Тестовое задание для прохождения на стажировку в Лабораторию Касперского
      </div>
      <div className={styles.title}>Работу написал Колосов Никита </div>
    </section>
  )
}
