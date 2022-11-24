import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux";
import { store } from "../redux/store";
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </NextUIProvider>
  )
}
