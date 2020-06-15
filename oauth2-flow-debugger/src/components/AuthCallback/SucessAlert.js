import React from "react"
import { Alert } from "reactstrap"
import styled from "@emotion/styled"

export const Success = styled.div`
  margin-left: 400px;
  margin-right: 400px;
  margin-top: 50px;
`

export const View = () => (
  <Success>
    <Alert color="success">
      <h4 className="alert-heading">Success!</h4>
      <p>
        Google api has returned back the authorization code with the information
        we supplied when we sent the request.
      </p>
      <hr />
      <p className="mb-0">
        The next step is to make a back channel request and exchange that code
        with the token which you can use to have access to the google apis on
        behalf of that user.
      </p>
    </Alert>
  </Success>
)

export default View
