import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "../../model/Usuario";
import router from "next/router";
import Cookies from "js-cookie";

interface AuthContextProps {
  usuario?: Usuario;
  loading?: boolean
  login?: (email: string, senha: string) => Promise<void>
  cadastrar?: (email: string, senha: string) => Promise<void>
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(
  usuarioFirebase: firebase.User
): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL,
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-auth", "true", {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props) {
  const [usuario, setUsuario] = useState<Usuario>(null);
  const [loading, setLoading] = useState(true);

  async function configSessao(usuarioFirebase) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setLoading(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setLoading(false);
      return false;
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true);
      const res = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
     await configSessao(res.user);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function login(email, senha) {
    try {
      setLoading(true);
      const res = await firebase
        .auth().signInWithEmailAndPassword(email, senha)
       await configSessao(res.user);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function cadastrar(email, senha) {
    try {
      setLoading(true);
      const res = await firebase
        .auth().createUserWithEmailAndPassword(email, senha)
       await configSessao(res.user);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configSessao(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(Cookies.get('admin-template-auth')) {
      const cancel = firebase.auth().onIdTokenChanged(configSessao);
      return () => cancel();
    } else {
      setLoading(false)
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, loginGoogle, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
