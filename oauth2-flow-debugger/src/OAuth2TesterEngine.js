import React from "react"
import Header from "./components/Header"
import Body from "./components/Body"
import RequestModal from "./components/RequestModal"

const OAuth2Tester = () => {
  const [authURI, setAuthURI] = React.useState(
    "https://authorization_uri/oauth2"
  )

  const [redirectURI, setRedirectURI] = React.useState(
    "https://my_app/auth/callback"
  )

  const [clientId, setClientId] = React.useState("the-client-id")

  const [scope, setScope] = React.useState("profile")

  const [state, setState] = React.useState("foobar")

  const [nonce, setNonce] = React.useState("a-nonce")

  const [responseType, setResponseType] = React.useState("code")

  return (
    <>
      <Header />
      <Body
        setAuthURI={setAuthURI}
        setRedirectURI={setRedirectURI}
        setClientId={setClientId}
        setScope={setScope}
        setState={setState}
        setNonce={setNonce}
        setResponseType={setResponseType}
      />
      <RequestModal
        authURI={authURI}
        redirectURI={redirectURI}
        clientId={clientId}
        scope={scope}
        state={state}
        nonce={nonce}
        responseType={responseType}
      />
    </>
  )
}

export default OAuth2Tester
