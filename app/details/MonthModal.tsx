import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { Separator } from "@/app/components/ui/separator";

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
    onClose(); // 选择后关闭 Sheet
  };

  for (let i = 3; i >= 0; i--) {
    const year = moment().year() - i;
    const maxMonth = year === moment().year() ? moment().month() + 1 : 12;
    const months = Array.from({ length: maxMonth }, (_, j) => ({
      name: j + 1,
      isCurrent: j + 1 === currentMonth && year === currentYear,
    }));
    years.push({ name: year, months });
  }

  useEffect(() => {
    if (isOpen && currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="max-w-app h-2/5 mx-auto rounded-t-lg p-4 bg-white shadow-lg overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>选择月份</SheetTitle>
          <SheetDescription>请选择一个年份和月份</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          {years.map((year) => (
            <div key={year.name}>
              <p className="text-lg font-bold mb-2">{year.name}年</p>
              <div className="grid grid-cols-6 gap-2">
                {year.months.map((month) => (
                  <div
                    key={month.name}
                    ref={
                      currentMonth === month.name && currentYear === year.name
                        ? currentMonthRef
                        : null
                    }
                    className={`p-2 text-center rounded cursor-pointer ${
                      currentMonth === month.name && currentYear === year.name
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={monthSelect(year.name, month.name)}
                  >
                    {month.name}月
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MonthModal;
