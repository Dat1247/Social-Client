'use client'

import ReduxProvider from "@/redux/ReduxProvider";
import LoginForm from "./LoginForm";

export default function ClientLoginFormWrapper() {
  return <ReduxProvider>
    <LoginForm />
</ReduxProvider>;
}
