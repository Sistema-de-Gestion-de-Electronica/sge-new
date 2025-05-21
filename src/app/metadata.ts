import { env } from "@/env";
import { type Metadata } from "next";

const rutaActual = env.NEXTAUTH_URL;

export const metadataLayoutPrincipal: Metadata = {
  title: "SGE",
  description: "Sistema de Gestión Electrónica",
  icons: "/electrical-circuit.png",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: rutaActual,
    countryName: "Argentina",
    title: "SGE 2.0",
    siteName: "SGE 2.0",
    description: "Sistema de Gestión Electrónica",
    images: [
      {
        url: `${rutaActual}/electrical-circuit.png`,
        width: 200,
        height: 200,
        alt: "SGE 2.0 Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: "SGE 2.0",
    description: "Sistema de Gestión Electrónica",
    images: [
      {
        url: `${rutaActual}/electrical-circuit.png`,
        width: 200,
        height: 200,
        alt: "SGE 2.0 Logo",
        type: "image/png",
      },
    ],
  },
};
