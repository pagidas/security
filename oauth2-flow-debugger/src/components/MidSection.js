import React from "react"
import styled from "@emotion/styled"
import { Alert } from "reactstrap"

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  color: #444444;
`
const Link = styled.a`
  color: #666666;
`

export const View = () => (
  <Container>
    <Alert color="warning">
      For now, this tester only implements the{" "}
      <Link href="https://oauth.net/2/grant-types/authorization-code/">
        <em>authorization code grant type</em>
      </Link>
      -- check the <strong>Response type</strong> in the inputs below.
    </Alert>
  </Container>
)

export default View
