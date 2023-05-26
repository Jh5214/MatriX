import Screen from "./Screen";
import LoginScreen from "./Login";
import Routess from "./routes/Routess";
import Navbar from "./components/Navbar.js"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const theme = createTheme({
  palette: {
    background: {
      default: "#eee"
    }
  }
});

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return (
    <div>
    <Routess />
    <Navbar/>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {session ? <Screen /> : <LoginScreen />}
    </ThemeProvider>
    </div>
  );
}
