import { Button } from "@/components/ui";
import { Separator } from "@radix-ui/react-separator";
import { UsuarioCreador } from "../../_components/usuario-creador-libro";
import { LibroInformacionBasica } from "../../_components/info-basica-libro";
import { LibroInformacionUbicacion } from "../../_components/info-ubicacion-libro";
import { LibroInformacionPrestamos } from "../../_components/info-prestamos-libro";

type Props = {
  id?: string;
  onCancel: () => void;
};

export const LibroView = ({ id, onCancel }: Props) => {
  const libroId = parseInt(id ?? "");

  const handleCancel = () => onCancel();

  return (
    <div className="relative flex w-full flex-col gap-4">
      <div className="my-8 flex w-full flex-col items-center justify-center">
        <LibroInformacionBasica libroId={libroId} />
      </div>

      <Separator className="my-2 border-2" />

      <div className="my-8 flex w-full flex-col items-center justify-center">
        <LibroInformacionUbicacion libroId={libroId} />
      </div>

      <Separator className="my-2 border-2" />

      <div className="my-8 flex w-full flex-col items-center justify-center">
        <LibroInformacionPrestamos libroId={libroId} />
      </div>

      <Separator className="my-2 border-2" />

      <div className="my-8 flex w-full flex-col items-center justify-center">
        <UsuarioCreador libroId={libroId} />
      </div>

      <div className="bottom-0 flex w-full flex-row items-end space-x-4 bg-white md:justify-end lg:sticky">
        <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
          Volver
        </Button>
      </div>
    </div>
  );
};
