import { RiMoneyCnyCircleFill } from "react-icons/ri";
import moment from "moment";
import styles from "./DetailItem.module.css";
import _ from "lodash";
import { useEffect, useState } from "react";

interface item {
  tag: string;
  time: number;
  type: string;
  money: number;
}

const DetailItem = ({ data: {} }) => {
  const [newData, setData] = useState({});
  useEffect(() => {
    const newData = _.groupBy(data, (i: { date: number }) => {
      return moment.unix(Number(i.date)).format("YYYY-MM-DD");
    });
    setData(newData);
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div>11月15日 昨天</div>
        <div className={styles.headerRight}>
          <i>出</i>100 <i>入</i>50
        </div>
      </div>

      {newData &&
        newData.map((i) => (
          <div key={i.time} className={styles.item}>
            <RiMoneyCnyCircleFill size={50} color="rgb(88,187,124)" />
            <div className={styles.middle}>
              <p className={styles.tag}>{i.tag}</p>
              <p className={styles.time}>
                {moment.unix(i.time).format("HH:mm")}
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
