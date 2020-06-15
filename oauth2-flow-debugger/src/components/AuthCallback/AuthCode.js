import React from "react"
import styled from "@emotion/styled"

export const Container = styled.div`
  margin-top: 50px;
  margin-left: 240px;
  margin-right: 240px;
`

export const Code = styled.pre`
  color: whitesmoke;
  font-size: 20px;
`

export const View = ({ authCode }) => (
  <Container className="p-3 bg-dark my-8 rounded">
    <Code>{`authCode: ${authCode}`}</Code>
  </Container>
)

export default View
