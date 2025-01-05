import styles from "./MonthPicker.module.css";
import { FaCaretDown } from "react-icons/fa";

interface props {
  onClick: () => void;
  currentYear: number;
  currentMonth: number;
  cost: number;
  income: number;
}
const MonthPicker = ({ onClick, currentYear, currentMonth,cost,income }: props) => {
  return (
    <div className={styles.box}>
      <div className={styles.time} onClick={onClick}>
        <span>
          {currentYear}年{currentMonth}月
        </span>
        <FaCaretDown size={16} />
      </div>
      <div className={styles.money}>总支出￥{cost}</div>
      <div className={styles.money}>总收入￥{income}</div>
    </div>
  );
};

export default MonthPicker;
