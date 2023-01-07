import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

import "./index.css";

import { login } from "./utils";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// Desabilite o botão de Login enquanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLogging, setIsLogging] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({ cursor: "default" });

  const isInvalidEmailOrPassword = useMemo(
    () => !email || password.length < 6,
    [email, password]
  );

  const handleEmail = (event) => {
    setError(null);
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setError(null);
    setPassword(event.target.value);
  };

  const handleUserLogin = async () => {
    setError(null);

    try {
      setIsLogging(true);
      await login({ email, password });
      alert("Successful login");
    } catch (error) {
      setError(error);
    } finally {
      setIsLogging(false);
    }
  };

  useEffect(() => {
    if (isInvalidEmailOrPassword) setButtonStyle({ cursor: "default" });
    else if (isLogging) setButtonStyle({ cursor: "wait" });
    else setButtonStyle({ cursor: "pointer" });
  }, [isLogging, isInvalidEmailOrPassword]);

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>

        {error && <div className="errorMessage">{error.message}</div>}

        <Input
          id="email"
          type="email"
          autoComplete="off"
          labelText="Email"
          value={email}
          onChange={handleEmail}
        />

        <Input
          id="password"
          type="password"
          autoComplete="off"
          labelText="Password"
          value={password}
          onChange={handlePassword}
        />

        <Button
          disabled={isInvalidEmailOrPassword || isLogging}
          onClick={handleUserLogin}
          buttonStyle={buttonStyle}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
