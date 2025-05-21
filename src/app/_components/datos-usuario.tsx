import { Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";

type UsuarioReserva = {
  id: string;
  nombre: string | null;
  apellido: string | null;
  legajo: string | null;
  email: string | null;
  image: string | null;
  name: string | null;
};

const rutaUsuario = "/perfil";

export const DatoUsuarioReserva = ({
  usuario,
  mostrarNombre = true,
}: {
  usuario?: UsuarioReserva | null;
  mostrarNombre?: boolean;
}) => {
  if (!usuario) {
    return <span className="text-center">Sin información</span>;
  }

  const { nombre, name, apellido, legajo, email, image } = usuario;
  const fullName = `${nombre} ${apellido}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 rounded-l-full rounded-r-full pr-1 hover:bg-slate-300">
          <Avatar className="inline-block h-6 w-6 rounded-full ring-2 ring-white">
            <AvatarImage src={image ?? ""} alt={`Imagen de perfil de ${fullName}`} />
            <AvatarFallback>{fullName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          {mostrarNombre && <span className="text-left">{fullName}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 p-4">
        <div title={`${fullName} - ${email}`} className="flex flex-row space-x-2 text-center">
          <div className="basis-1/3">
            <div className="flex items-center justify-center">
              <Image
                src={image ?? ""}
                className="rounded-l-md"
                alt="Imagen de perfil"
                objectFit="cover"
                priority={false}
                height={64}
                width={64}
              />
            </div>
          </div>
          <div className="flex basis-2/3 flex-col justify-around text-left text-sm">
            <div>
              <div className="ml-2">
                <b>{fullName}</b>
              </div>
              <div className="ml-2">
                <code>{name}</code>
              </div>
              <div className="ml-2">
                <code>{legajo}</code>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link href={`${rutaUsuario}/${usuario.id}`}>
            <Button variant="default" color="outline" size="sm" className="w-full">
              Ver perfil
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
