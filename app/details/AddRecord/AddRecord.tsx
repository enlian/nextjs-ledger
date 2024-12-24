import styles from "./AddRecord.module.css";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { MdAttachMoney, MdFastfood, MdNightlife } from "react-icons/md";
import { FaCaretDown, FaCar, FaShoppingCart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoMdSchool } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { IoChevronBack } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRecordSubmit: () => void;
}

interface Months {
  year: number;
  month: number;
  days: number[];
  id: string;
}

//获取过去两年内的每年每月和每日
function getDays() {
  const nowYear = moment().year();
  const nowMonth = moment().month();
  const nowDay = moment().date();
  const arrs: Months[] = [];

  for (let year = nowYear - 2; year <= nowYear; year++) {
    for (let month = 0; month < 12; month++) {
      const dayInMonth = moment({ year, month }).daysInMonth();
      const monthData: Months = {
        year: year,
        month: month + 1,
        days: [],
        id: uuidv4(),
      };
      for (let day = 1; day <= dayInMonth; day++) {
        if (nowYear === year && nowMonth === month && day > nowDay) {
          break;
        } else {
          monthData.days.push(day);
        }
      }
      arrs.push(monthData);
    }
  }
  console.log(arrs);
  return arrs;
}

const AddRecord = ({ isOpen, onClose, onRecordSubmit }: Props) => {
  const [daysArray, setDaysArray] = useState<Months[]>([]);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [recordType, setRecordType] = useState("支出");
  const currentRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState({
    year: moment().year(),
    month: moment().month(),
    day: moment().date(),
  });
  const [currentTag, setCurrentType] = useState("餐饮");

  const onSubmit = () => {};

  const tagClick = (type: string) => () => {
    setCurrentType(type);
  };

  const typeClick = (type: string) => () => {
    setRecordType(type);
  };

  const dateSelect = (year: number, month: number, day: number) => () => {
    setSelectedDate({
      year,
      month: month - 1,
      day,
    });
    setDateModalOpen(false);
  };

  const showDatePicker = () => {
    setDateModalOpen(true);
  };

  const goBack = () => {
    setDateModalOpen(false);
  };

  useEffect(() => {
    setDaysArray(getDays());
    if (isOpen && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [isOpen, isDateModalOpen]);

  if (isOpen) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.header}>
            <p className={styles.title}>
              {isDateModalOpen ? "请选择时间" : "记一笔"}
            </p>

            {isDateModalOpen ? (
              <IoChevronBack
                size={30}
                onClick={goBack}
                className={styles.close}
              />
            ) : (
              <IoMdClose size={30} onClick={onClose} className={styles.close} />
            )}
          </div>

          {isDateModalOpen ? (
            <div className={styles.modalBody}>
              {daysArray.map((i) => (
                <div key={i.id}>
                  <p className={styles.yearTitle}>
                    {i.year + "年" + i.month + "月"}
                  </p>
                  <div className={styles.days}>
                    {i.days.map((j) => (
                      <span
                        onClick={dateSelect(i.year, i.month, j)}
                        ref={
                          selectedDate.year === i.year &&
                          selectedDate.month + 1 === i.month &&
                          selectedDate.day === j
                            ? currentRef
                            : null
                        }
                        className={
                          selectedDate.year === i.year &&
                          selectedDate.month + 1 === i.month &&
                          selectedDate.day === j
                            ? styles.selectedDay
                            : ""
                        }
                        key={j}
                      >
                        {j}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.addRecord}>
              <div className={styles.typeBox}>
                <div className={styles.typeBoxL}>
                  <div
                    className={`${styles.type} ${
                      recordType === "支出" ? styles.selected : null
                    }`}
                    onClick={typeClick("支出")}
                  >
                    支出
                  </div>
                  <div
                    className={`${styles.type} ${
                      recordType === "收入" ? styles.selected : null
                    }`}
                    onClick={typeClick("收入")}
                  >
                    收入
                  </div>
                </div>

                <div className={styles.date} onClick={showDatePicker}>
                  <span>
                    {selectedDate.month + 1}月{selectedDate.day}日
                  </span>
                  <FaCaretDown size={16} color="#999" />
                </div>
              </div>
              <div className={styles.moneyInputGroup}>
                <MdAttachMoney size={30} />
                <input type="number" className={styles.moneyInput} />
              </div>
              <div className={styles.tags}>
                <div
                  onClick={tagClick("餐饮")}
                  className={`${
                    currentTag === "餐饮" ? styles.tagSelected : null
                  }`}
                >
                  <div>
                    <MdFastfood size={30} />
                  </div>
                  <span>餐饮</span>
                </div>
                <div
                  onClick={tagClick("交通")}
                  className={`${
                    currentTag === "交通" ? styles.tagSelected : null
                  }`}
                >
                  <div>
                    <FaCar size={30} />
                  </div>
                  <span>交通</span>
                </div>
                <div
                  onClick={tagClick("服饰")}
                  className={`${
                    currentTag === "服饰" ? styles.tagSelected : null
                  }`}
                >
                  <div>
                    <GiClothes size={30} />
                  </div>
                  <span>服饰</span>
                </div>
                <div
                  onClick={tagClick("购物")}
                  className={`${
                    currentTag === "购物" ? styles.tagSelected : null
                  }`}
                >
                  <div>
                    <FaShoppingCart size={30} />
                  </div>
                  <span>购物</span>
                </div>
                <div
                  onClick={tagClick("生活")}
                  className={`${
                    currentTag === "生活" ? styles.tagSelected : null
                  }`}
                >
                  <div>
                    <MdNightlife size={30} />
                  </div>
                  <span>生活</span>
                </div>
                <div
                  onClick={tagClick("教育")}
                  className={`${
                    currentTag === "教育" ? styles.tagSelected : null
                  }`}
                >
                  <div>
                    <IoMdSchool size={30} />
                  </div>
                  <span>教育</span>
                </div>
              </div>

              <div className={styles.btnGroup}>
                <div className={styles.btnOK} onClick={onSubmit}>
                  提交
                </div>
                <div className={styles.btnCancel} onClick={onClose}>
                  取消
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default AddRecord;
