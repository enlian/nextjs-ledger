import { RiMoneyCnyCircleFill } from "react-icons/ri";
import moment from "moment";
import styles from "./DetailItem.module.css";
import _ from "lodash";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";

interface item {
  id: number;
  tag: string;
  date: number;
  type: string;
  money: number;
}

const DetailItem = ({ data = {} }) => {
  const { date, items } = data;
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div>{date}</div>
        <div className={styles.headerRight}>
          <i>出</i>100 <i>入</i>50
        </div>
      </div>

      {items &&
        items.map((i: { id: Key | null | undefined; tag: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; date: number; type: string; money: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
          <div key={i.id} className={styles.item}>
            <RiMoneyCnyCircleFill size={50} color="rgb(88,187,124)" />
            <div className={styles.middle}>
              <p className={styles.tag}>{i.tag}</p>
              <p className={styles.time}>
                {moment.unix(i.date).format("HH:mm")}
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
