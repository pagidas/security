import React from "react"
import styled from "@emotion/styled"

const ResponseTypeSpan = styled.span`
  margin-left: 10px;
  margin-right: 100px;
`

const ResponseTypeSpansContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`

export const View = ({ setResponseType }) => (
  <>
    <p>Response type (Required)</p>

    <ResponseTypeSpansContainer>
      <input
        type="checkbox"
        value="code"
        checked="true"
        onChange={evt => setResponseType(evt.target.value)}
      ></input>
      <ResponseTypeSpan>code</ResponseTypeSpan>

      <input
        type="checkbox"
        value="token"
        onChange={evt => setResponseType(evt.target.value)}
      ></input>
      <ResponseTypeSpan>token</ResponseTypeSpan>

      <input
        type="checkbox"
        value="id_token"
        onChange={evt => setResponseType(evt.target.value)}
      ></input>
      <ResponseTypeSpan>id_token</ResponseTypeSpan>
    </ResponseTypeSpansContainer>
  </>
)

export default View
