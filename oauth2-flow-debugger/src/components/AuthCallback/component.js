import React from "react"
import { useLocation } from "react-router-dom"
import Header from "../Header"
import Alert from "./SucessAlert"
import Code from "./AuthCode"

export const View = () => {
  const query = new URLSearchParams(useLocation().search)

  return (
    <>
      <Header />
      <Alert />
      <Code authCode={query.get("code")} />
    </>
  )
}

export default View
