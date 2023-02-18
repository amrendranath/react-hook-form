import UseControllerForm from "./useControllerForm/UseControllerForm";

type AppProps = {
  login: (email: string, password: string) => Promise<unknown>;
};

const App = ({ login }: AppProps) => {
  return <UseControllerForm login={login} />;
};

export default App;
