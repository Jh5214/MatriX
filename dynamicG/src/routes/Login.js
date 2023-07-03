import Screen from "./Screen";
import LoginScreen from "./LoginScreen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Home from "./Home";

const theme = createTheme({
  palette: {
    background: {
      default: "#eee"
    }
  }
});

export default function Login() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {session ? <Home /> : <LoginScreen />}
    </ThemeProvider>
  );
}

