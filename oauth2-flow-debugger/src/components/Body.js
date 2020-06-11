import React from "react"
import styled from "@emotion/styled"
import { FormText, Input } from "reactstrap"

const Body = styled.div`
  margin-top: 100px;
  margin-left: 400px;
  margin-right: 400px;
`

const InputBar = styled.div`
  margin-bottom: 50px;
`

export const View = ({
  setAuthURI,
  setRedirectURI,
  setClientId,
  setScope,
  setState,
  setNonce,
}) => (
  <Body>
    <InputBar>
      <Input
        bsSize="lg"
        placeholder="https://authorization_uri/oauth2"
        onChange={evt => setAuthURI(evt.target.value)}
      />
      <FormText>Required: This is the authorization uri</FormText>
    </InputBar>

    <InputBar>
      <Input
        bsSize="lg"
        placeholder="https://my_app/auth/callback"
        onChange={evt => setRedirectURI(evt.target.value)}
      />
      <FormText>Required: This is the redirect uri</FormText>
    </InputBar>

    <InputBar>
      <Input
        bsSize="lg"
        placeholder="the-client-id"
        onChange={evt => setClientId(evt.target.value)}
      />
      <FormText>Required: This is the client id</FormText>
    </InputBar>

    <InputBar>
      <Input
        bsSize="lg"
        placeholder="scope"
        onChange={evt => setScope(evt.target.value)}
      />
      <FormText>Required: The scope of the authorization</FormText>
    </InputBar>

    <InputBar>
      <Input
        bsSize="lg"
        placeholder="state"
        onChange={evt => setState(evt.target.value)}
      />
      <FormText>Required: The state of the authorization</FormText>
    </InputBar>

    <InputBar>
      <Input
        bsSize="lg"
        placeholder="nonce"
        onChange={evt => setNonce(evt.target.value)}
      />
      <FormText>Required: The nonce of the authorization</FormText>
    </InputBar>
  </Body>
)

export default View
