import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { SignIn, SignOut } from "./_components/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          SGE <span className="text-blue-500">2.0</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center text-2xl ">
              {session && (
                <>
                  <p>
                    ¡Hola <code>{session.user?.name}</code>!
                  </p>
                  <div className="pt-5">
                    <Image
                      alt="Imagen de perfil"
                      src={session.user.image!}
                      width={100}
                      height={100}
                      className="m-auto rounded-full"
                    />
                  </div>
                </>
              )}
            </div>
            {session ? <SignOut /> : <SignIn />}
            <div className="w-2/3 pt-5 text-center text-xl">
              <p>
                Bienvenido al sistema de gestión electrónica del departamento de Ingeniería Electrónica de la Facultad
                Regional de Buenos Aires.
              </p>
              <br></br>
              <p>
                Estar registrado en el SGE le servirá para poder utilizar los servicios que brinda el departamento,
                algunos de ellos son:
              </p>
              <br></br>
              <ul className="list-inside list-disc">
                <li>Reserva de Laboratorio abierto para Alumnos</li>
                <li>Reserva de Laboratorio para Docentes</li>
                <li>Requerir préstamos de Instrumental y/o Libro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
