import React from "react"
import styled from "@emotion/styled"

const Title = styled.h1`
  font-family: "Merriweather", sans-serif;
  text-align: center;
  color: #333333;
`

const Description = styled.p`
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  color: #333333;
`

const Header = () => (
  <div className="p-5 bg-info my-0">
    <Title className="display-4"> &lt;OAuth 2.0 tester /&gt; </Title>
    <Description className="lead">
      A tool to help you debug an oauth2 flow.
    </Description>
  </div>
)

export default Header
