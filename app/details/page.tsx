"use client";
import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import DetailItem from "./DetailItem";
import MonthPicker from "./MonthPicker";
import MonthModal from "./MonthModal";
import styles from "./page.module.css";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import AddRecord from "./AddRecord/AddRecord";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { PiSmileySadLight } from "react-icons/pi";
import _ from "lodash";
interface item {
  id: number;
  tag: string;
  date: number;
  type: string;
  money: number;
}
export default function name() {
  const [isTimePickerModalOpen, setTimePickerModalOpen] = useState(false);
  const [isAddRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [currentYear, setYear] = useState(moment().year());
  const [currentMonth, setMonth] = useState(moment().month() + 1);
  const [successAlert, setSuccessAlertOpen] = useState(false);
  const [failedAlert, setFailedAlertOpen] = useState(false);
  const [listData, setListData] = useState<{ date: string; items: item[] }[]>(
    []
  );

  const openTimePickerModal = () => setTimePickerModalOpen(true);
  const closeTimePickerModal = () => setTimePickerModalOpen(false);
  const openAddRecordModal = () => setAddRecordModalOpen(true);
  const closeAddRecordModal = () => setAddRecordModalOpen(false);

  const onTimeChange = (year: number, month: number) => {
    setYear(year);
    setMonth(month);
    setTimePickerModalOpen(false);
  };

  const onRecordSubmit = (msg: string) => {
    if (msg === "success") {
      setSuccessAlertOpen(true);
      getData();
    } else {
      setFailedAlertOpen(true);
    }
  };

  const getData = () => {
    fetch("/api/getRecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: currentYear,
        month: currentMonth,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();

          const newData: { date: string; items: item[] }[] = [];
          const temp: string[] = [];

          data.data.forEach((i: item) => {
            const date = moment.unix(Number(i.date)).format("YYYY-MM-DD");
            if (!temp.includes(date)) {
              // 初始化新分组
              const dateGroup = { date, items: [] };
              temp.push(date);
              newData.push(dateGroup);
            }

            // 找到对应日期的分组，并将当前 item 添加到 items 数组中
            const group = newData.find((group) => group.date === date);
            if (group) {
              group.items.push(i);
            }
          });

          console.log(newData);

          setListData(newData);
        } else {
          throw new Error("error");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getData();
  }, [currentYear, currentMonth]);

  return (
    <div className={styles.detailPage}>
      <Snackbar
        open={successAlert}
        autoHideDuration={1000} // 自动隐藏时间（毫秒）
        onClose={() => {
          setSuccessAlertOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // 提示位置
      >
        <Alert
          onClose={() => {
            setSuccessAlertOpen(false);
          }}
          severity="success"
        >
          数据添加成功！
        </Alert>
      </Snackbar>

      <Snackbar
        open={failedAlert}
        autoHideDuration={1000} // 自动隐藏时间（毫秒）
        onClose={() => {
          setFailedAlertOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // 提示位置
      >
        <Alert
          onClose={() => {
            setFailedAlertOpen(false);
          }}
          severity="error"
        >
          数据添加失敗！
        </Alert>
      </Snackbar>

      <MonthPicker
        onClick={openTimePickerModal}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      {/* {listData && listData.length > 0 ? (
        <Virtuoso
          totalCount={listData.length}
          itemContent={(index) => <DetailItem data={listData[index]} />}
          style={{ height: "100%", width: "100%" }}
        />
      ) : (
        <div className={styles.default}>
          <PiSmileySadLight size={100} color="#888" />
          <p>暂无数据，试试选择其他日期吧</p>
        </div>
      )} */}

      <MonthModal
        isOpen={isTimePickerModalOpen}
        onClose={closeTimePickerModal}
        onTimeChange={onTimeChange}
      />

      <AddRecord
        isOpen={isAddRecordModalOpen}
        onClose={closeAddRecordModal}
        onRecordSubmit={onRecordSubmit}
      />

      {!isTimePickerModalOpen && !isAddRecordModalOpen && (
        <div className={styles.add} onClick={openAddRecordModal}>
          <FaRegEdit size={20} />
          <span>记一笔</span>
        </div>
      )}
    </div>
  );
}
