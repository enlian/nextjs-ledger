import styles from "./MonthModal.module.css";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeChange: (year: number, month: number) => void;
}

interface Month {
  name: number;
  isCurrent: boolean;
}

interface Year {
  name: number;
  months: Month[];
}

type YearList = Year[];

const MonthModal = ({ isOpen, onClose, onTimeChange }: ModalProps) => {
  const years: YearList = [];
  const currentMonthRef = useRef<HTMLDivElement | null>(null);
  const [currentYear, setYear] = useState(moment().year());
  const [currentMonth, setMonth] = useState(moment().month() + 1);

  const monthSelect = (year: number, month: number) => () => {
    setYear(year);
    setMonth(month);
    onTimeChange(year, month);
  };

  for (let i = 3; i >= 0; i--) {
    const year = moment().year() - i;
    const maxMonth = year === moment().year() ? moment().month() + 1 : 12;
    const months = Array.from({ length: maxMonth }, (index, j) => ({
      name: j + 1,
      isCurrent: j + 1 === currentMonth && year === currentYear,
    }));
    years.push({ name: year, months });
  }

  useEffect(() => {
    if (isOpen && currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({
        behavior: "smooth", // 平滑滚动
        block: "center", // 垂直居中
      });
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IoMdClose size={30} onClick={onClose} className={styles.close} />
          <div className={styles.modalBody}>
            {years.map((year) => (
              <div key={year.name}>
                <p className={styles.yearTitle}>{year.name}年</p>
                <div className={styles.monthList}>
                  {year.months.map((month) => (
                    <div
                      className={`${styles.month} ${
                        currentMonth === month.name && currentYear === year.name
                          ? styles.isCurrentMonth
                          : styles.month
                      }`}
                      key={month.name}
                      ref={
                        currentMonth === month.name && currentYear === year.name
                          ? currentMonthRef
                          : null
                      }
                      onClick={monthSelect(year.name, month.name)}
                    >
                      {month.name}月
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MonthModal;
