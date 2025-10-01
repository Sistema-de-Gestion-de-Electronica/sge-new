-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ABIERTA', 'CERRADA');

-- CreateEnum
CREATE TYPE "Visibilidad" AS ENUM ('VISIBLE', 'OCULTA');

-- CreateEnum
CREATE TYPE "Posicion" AS ENUM ('ACUERDO', 'DESACUERDO', 'ACUERDO_PARCIAL');

-- CreateTable
CREATE TABLE "Acta" (
    "id" SERIAL NOT NULL,
    "nombreActa" TEXT NOT NULL,
    "fechaReunion" TIMESTAMP(3) NOT NULL,
    "estado" "Estado" NOT NULL,
    "visibilidad" "Visibilidad" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Acta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voto" (
    "id" SERIAL NOT NULL,
    "actaId" INTEGER NOT NULL,
    "consejeroId" TEXT NOT NULL,
    "posicion" "Posicion" NOT NULL,
    "comentario" TEXT,
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Acta_estado_idx" ON "Acta"("estado");

-- CreateIndex
CREATE INDEX "Acta_visibilidad_idx" ON "Acta"("visibilidad");

-- CreateIndex
CREATE INDEX "Acta_fechaReunion_idx" ON "Acta"("fechaReunion");

-- CreateIndex
CREATE INDEX "Voto_actaId_idx" ON "Voto"("actaId");

-- CreateIndex
CREATE INDEX "Voto_consejeroId_idx" ON "Voto"("consejeroId");

-- AddForeignKey
ALTER TABLE "Voto" ADD CONSTRAINT "Voto_actaId_fkey" FOREIGN KEY ("actaId") REFERENCES "Acta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voto" ADD CONSTRAINT "Voto_consejeroId_fkey" FOREIGN KEY ("consejeroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
