import Image from "next/image";
import Head from "next/head";
import loadingGif from "../../../public/image/loading.gif";
import useAuth from "../../data/hook/useAuth";
import { useEffect } from "react"; // Importe o useEffect
import router from "next/router";

export default function ForcarAuth(props) {
  const { usuario, loading } = useAuth();

  function renderizarConteudo() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie?.includes("admin-template-auth")) {window.location.href = "/autenticacao" }`,
            }}
          />
        </Head>
        {props.children}
      </>
    );
  }

  function renderizarCarregando() {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image alt="Gif de carregamento" src={loadingGif} />
      </div>
    );
  }

  useEffect(() => {
    // Use o useEffect para redirecionar
    if (!loading && !usuario?.email) {
      router.push("/autenticacao");
    }
  }, [loading, usuario]);

  if (!loading && usuario?.email) {
    return renderizarConteudo();
  } else if (loading) {
    return renderizarCarregando();
  } else {
    return null;
  }
}
