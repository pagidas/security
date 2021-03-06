import React from "react"
import Header from "./components/Header"
import Body from "./components/Body/component"
import RequestModal from "./components/Body/RequestModal"
import MidSection from "./components/MidSection"

const OAuth2Tester = props => {
  const [authURI, setAuthURI] = React.useState(
    "https://authorization_uri/oauth2"
  )
  const [redirectURI, setRedirectURI] = React.useState(
    "http://localhost:3000/auth/callback"
  )
  const [clientId, setClientId] = React.useState("the-client-id")
  const [scope, setScope] = React.useState("profile")
  const [state, setState] = React.useState("foobar")
  const [nonce, setNonce] = React.useState("a-nonce")
  const [responseType, setResponseType] = React.useState("code")
  const [responseMode, setResponseMode] = React.useState("query")

  return (
    <>
      <Header />
      <MidSection />
      <Body
        setAuthURI={setAuthURI}
        setRedirectURI={setRedirectURI}
        setClientId={setClientId}
        setScope={setScope}
        setState={setState}
        setNonce={setNonce}
        setResponseType={setResponseType}
        setResponseMode={setResponseMode}
      />
      <RequestModal
        authURI={authURI}
        redirectURI={redirectURI}
        clientId={clientId}
        scope={scope}
        state={state}
        nonce={nonce}
        responseType={responseType}
        responseMode={responseMode}
      />
    </>
  )
}

export default OAuth2Tester
