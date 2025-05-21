import { clsx } from "clsx";
import { isBefore } from "date-fns";

type DayHeaderProps = {
  index: number;
  today: Date;
  startOfCurrentMonth: Date;
  date: Date;
};

export function CalendarHeader({ day }: { day: string }) {
  return <div className={clsx("bg-gray-900 p-3 text-center text-sm text-white")}>{day}</div>;
}

export function DayHeader({ index, date, startOfCurrentMonth, today }: DayHeaderProps) {
  return (
    <div
      key={index}
      className={clsx(
        "flex h-8 items-center justify-center border-y text-sm font-semibold",
        (date.getMonth() !== startOfCurrentMonth.getMonth() || isBefore(date, today)) && index && "!bg-gray-50",
        // calendar[format(date, "yyyy-MM-dd")] === Dia.FERIADO && "bg-blue-200",
        // calendar[format(date, "yyyy-MM-dd")] === Dia.EXAMEN && "bg-yellow-200",
      )}
    >
      {date.getDay() === 0 ? "" : date.getDate()}
    </div>
  );
}
