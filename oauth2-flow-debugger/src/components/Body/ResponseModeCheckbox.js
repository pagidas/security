import React from "react"
import styled from "@emotion/styled"

const ResponseModeSpan = styled.span`
  margin-left: 10px;
  margin-right: 100px;
`

const ResponseModeSpansContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`

export const View = ({ setResponseMode }) => (
  <>
    <p>Response mode (Required)</p>

    <ResponseModeSpansContainer>
      <input
        type="checkbox"
        value="query"
        checked="true"
        onChange={evt => setResponseMode(evt.target.value)}
      ></input>
      <ResponseModeSpan>query</ResponseModeSpan>

      <input
        type="checkbox"
        value="form_post"
        onChange={evt => setResponseMode(evt.target.value)}
      ></input>
      <ResponseModeSpan>form_post</ResponseModeSpan>

      <input
        type="checkbox"
        value="fragment"
        onChange={evt => setResponseMode(evt.target.value)}
      ></input>
      <ResponseModeSpan>fragment</ResponseModeSpan>
    </ResponseModeSpansContainer>
  </>
)

export default View
