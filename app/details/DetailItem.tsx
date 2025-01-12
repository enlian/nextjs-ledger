import { RiMoneyCnyCircleFill } from "react-icons/ri";
import moment from "moment";
import styles from "./DetailItem.module.css";
import _ from "lodash";
import { useEffect, useState } from "react";

interface item {
  id: number;
  tag: string;
  date: number;
  type: string;
  money: number;
}

interface Props {
  data: {
    date: string;
    items: item[];
  };
}

const DetailItem = ({ data }: Props) => {
  const { date, items } = data;
  const [cost, setCost] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    let cost = 0;
    let income = 0;

    items.map((i) => {
      if (i.type === "支出") {
        cost = cost + Number(i.money);
      } else {
        income = income + Number(i.money);
      }
    });
    setCost(cost);
    setIncome(income);
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div>{date}</div>
        <div className={styles.headerRight}>
          <i>出</i>
          {cost !== 0 ? "-" : ""}
          {cost} <i>入</i>
          {income}
        </div>
      </div>

      {items.map((i) => (
          <div key={i.id} className={styles.item}>
            <RiMoneyCnyCircleFill size={50} color="rgb(88,187,124)" />
            <div className={styles.middle}>
              <p className={styles.tag}>{i.tag}</p>
              <p className={styles.time}>
                {i.date}
              </p>
            </div>
            <div className={styles.money}>
              {i.type === "支出" ? "-" : ""}
              {i.money}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DetailItem;
