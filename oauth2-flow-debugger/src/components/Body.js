import React from "react"
import styled from "@emotion/styled"
import ResponseTypeCheckbox from "./ResponseTypeCheckbox"
import RequestInputBars from "./RequestInputBars"

const Body = styled.div`
  color: #666666;
  margin-top: 100px;
  margin-left: 400px;
  margin-right: 400px;
`

export const View = ({
  setAuthURI,
  setRedirectURI,
  setClientId,
  setScope,
  setState,
  setNonce,
  setResponseType,
}) => (
  <Body>
    <RequestInputBars
      setAuthURI={setAuthURI}
      setRedirectURI={setRedirectURI}
      setClientId={setClientId}
      setScope={setScope}
      setState={setState}
      setNonce={setNonce}
    />
    <ResponseTypeCheckbox setResponseType={setResponseType} />
  </Body>
)

export default View
