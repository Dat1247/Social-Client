'use client'

import ReduxProvider from "@/redux/providers/ReduxProvider";
import LoginForm from "./LoginForm";

export default function ClientLoginFormWrapper() {
  return <ReduxProvider>
    <LoginForm />
</ReduxProvider>;
}
