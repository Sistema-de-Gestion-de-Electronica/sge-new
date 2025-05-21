import { DayHeader } from "./headers";
import clsx from "clsx";
import { format, isBefore } from "date-fns";
import { LabBadge, type Laboratorio, type Reserva, ReservaBadge } from "./badges";

type WeekProps = {
  index: number;
  today: Date;
  startOfCurrentMonth: Date;
  monthDates: Date[];
  laboratoriosMap: Laboratorio[];
};

type WeekDayProps = {
  index: number;
  today: Date;
  startOfCurrentMonth: Date;
  date: Date;
  reservas: Reserva[] | undefined;
  color: number;
};

export function Week({ index, monthDates, laboratoriosMap, startOfCurrentMonth, today }: WeekProps) {
  const weekDates = monthDates.slice(index * 7, (index + 1) * 7);

  return (
    <div className="col-span-7 grid grid-cols-subgrid divide-x rounded" key={index}>
      {weekDates.map((date, index) => (
        <DayHeader key={index} index={index} date={date} startOfCurrentMonth={startOfCurrentMonth} today={today} />
      ))}

      {laboratoriosMap.map((laboratorio, color) =>
        weekDates.map((date, index, week) => {
          const reservas = laboratorio.reservas[format(date, "yyyy-MM-dd")];
          return index ? (
            <WeekDay
              key={index}
              index={index}
              date={date}
              startOfCurrentMonth={startOfCurrentMonth}
              today={today}
              reservas={reservas}
              color={color}
            />
          ) : (
            <LabBadge key={index} index={index} today={today} week={week} laboratorio={laboratorio} color={color} />
          );
        }),
      )}
    </div>
  );
}

export function WeekDay({ date, startOfCurrentMonth, today, reservas, color }: WeekDayProps) {
  return (
    <div
      className={clsx(
        "text-sm",
        (date.getMonth() !== startOfCurrentMonth.getMonth() || isBefore(date, today)) && "bg-gray-50",
      )}
    >
      {reservas
        ? reservas.map((reserva) => (
            <ReservaBadge key={reserva.id} reserva={reserva} color={color} date={date} today={today} />
          ))
        : ""}
    </div>
  );
}
