import { UTNLogo } from "@/app/_components/utn-logo";
import { cn } from "@/components/utils";
import { useEffect } from "react";

export const ContenedorPrint = ({
  children,
  titulo,
  className,
}: {
  children: React.ReactNode;
  titulo: string;
  className?: string;
}) => {
  useEffect(() => {
    // window.print();
  }, []);

  return (
    <section
      className={cn(
        "mx-auto flex h-[297mm] w-[210mm] flex-col justify-around gap-y-4 overflow-hidden px-8 py-2",
        className,
      )}
    >
      {/* Titulo */}
      <div className="flex-initial items-center justify-between">
        <UTNLogo className="absolute h-7" />

        <h3 className="text-center text-2xl font-bold">{titulo}</h3>
      </div>

      {children}
    </section>
  );
};
