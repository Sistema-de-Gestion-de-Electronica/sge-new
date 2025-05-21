"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type TutorType } from "./constants";
import { cn } from "@/components/utils";
import Image from "next/image";
import RemoveTutorModal from "../action-buttons/remove-tutor";
import { EditTutorModal } from "../action-buttons/edit-tutor";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type CardProps = React.ComponentProps<typeof Card>;

type TutorData = {
  tutor: TutorType;
};

export function TutorCard({ className, ...props }: CardProps & TutorData) {
  const { tutor } = props;
  const { nombre, apellido, image } = tutor.usuario;

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <Card
      className={cn("flex flex-col justify-between text-center hover:border-primary/50 hover:bg-slate-50", className)}
      {...props}
    >
      <CardHeader className="space-y-6">
        <div className="mx-auto">
          <Image
            src={image ?? ""}
            alt="Imagen de tutor"
            className="rounded-lg"
            blurDataURL=""
            width={200}
            height={200}
          />
        </div>
        <CardTitle>
          {nombre} {apellido}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid items-start gap-4">
        <div className="text-left">
          <CardDescription>
            <span className="font-bold">Email:</span> {tutor.usuario.email}
          </CardDescription>
          <CardDescription>
            <span className="font-bold">Días y horarios:</span> {tutor.diasHorarios}
          </CardDescription>
          <CardDescription>
            <span className="font-bold">Especialidad:</span> {tutor.especialidad}
          </CardDescription>
        </div>
        <div className="mt-4 flex justify-between">
          <TienePermiso permisos={[SgeNombre.LAB_ABIERTO_TUTORES_ABM]}>
            <>
              <Button onClick={handleEditClick} title="Editar tutor" color={"outline"} className="h-8 w-8 px-1 py-1">
                <PencilIcon size={16} />
              </Button>
              <RemoveTutorModal tutorId={tutor.usuario.id} nombre={`${nombre} ${apellido}`} />
            </>
          </TienePermiso>
        </div>
      </CardContent>

      <EditTutorModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        id={tutor.usuario.id}
        onEditSuccess={() => {
          handleModalClose();
        }}
        tutor={tutor}
      />
    </Card>
  );
}
