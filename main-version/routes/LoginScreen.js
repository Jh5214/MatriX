import { Container } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../components/supabase";


export default function LoginScreen() {

  return (
    <>
    <Container maxWidth="xs" sx={{ height: "100vh", justifyContent: "center", transform: "translate(5%, 25%)"}}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </Container>
    </>
  );
}