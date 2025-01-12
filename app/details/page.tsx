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
import CircularProgress from "@mui/material/CircularProgress";
interface item {
  id: number;
  tag: string;
  date: string;
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
  const [loading, setLoading] = useState(true);
  const [cost, setCost] = useState(0);
  const [income, setIncome] = useState(0);
  const [listData, setListData] = useState<{ date: string; items: item[] }[]>(
    []
  );

  const openTimePickerModal = () => setTimePickerModalOpen(true);
  const closeTimePickerModal = () => setTimePickerModalOpen(false);
  const openAddRecordModal = () => setAddRecordModalOpen(true);
  const closeAddRecordModal = () => setAddRecordModalOpen(false);

  const onTimeChange = (year: number, month: number) => {
    setLoading(true);
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

          //最终需要的数组
          const newData: { date: string; items: item[] }[] = [];
          //中间件，做分组管理，快速索引
          const dateMap: { [date: string]: { date: string; items: item[] } } =
            {};
          let cost = 0;
          let income = 0;
          data.data.forEach((i: item) => {
            const date = moment(i.date).format("YYYY-MM-DD");
            //计算总收入 总支出
            if (i.type === "支出") {
              cost = cost + Number(i.money);
            } else {
              income = income + Number(i.money);
            }
            //如果这个时间分组在缓存里不存在，说明应该新建一个时间分组
            if (!dateMap[date]) {
              // 初始化新分组
              const dateGroup = { date, items: [] }; //为什么items是空的，因为是新分组
              dateMap[date] = dateGroup;
              newData.push(dateGroup);
            }

            // 找到对应日期的分组，并将当前 item 添加到 items 数组中
            dateMap[date].items.push(i);
          });
          setCost(cost);
          setIncome(income);
          setListData(newData);
        } else {
          throw new Error("error");
        }
      })
      .catch((err) => {
        alert(err);
        setCost(0);
        setIncome(0);
        setListData([]);
      })
      .finally(() => {
        setLoading(false);
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
        cost={cost}
        income={income}
      />

      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : listData && listData.length > 0 ? (
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
      )}

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
