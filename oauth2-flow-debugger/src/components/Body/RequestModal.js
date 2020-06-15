import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import styled from "@emotion/styled"

const RequestModal = styled.div`
  margin-top: 100px;
  margin-bottom: 200px;
  text-align: center;
`

const Request = styled.pre`
  color: white;
`

const RequestBody = styled.div`
  background-color: #545454;
`

const displayAuthRequest = (
  authURI,
  redirectURI,
  clientId,
  scope,
  state,
  nonce,
  responseType,
  responseMode
) => `
    ${authURI}?
      &client_id=${clientId}
      &redirect_uri=${redirectURI}
      &scope=${scope}
      &response_type=${responseType}
      &response_mode=${responseMode}
      &state=${state}
      &nonce=${nonce}
`

const View = ({
  authURI,
  redirectURI,
  clientId,
  scope,
  state,
  nonce,
  responseType,
  responseMode,
}) => {
  const [modal, setModal] = React.useState(false)
  const toggle = () => setModal(!modal)
  const authRequest = `${authURI}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}&response_mode=${responseMode}&state=${state}&nonce=${nonce}`

  return (
    <RequestModal>
      <Button outline color="warning" onClick={toggle}>
        Prepare request
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Request</ModalHeader>
        <RequestBody>
          <ModalBody>
            <Request>
              {displayAuthRequest(
                authURI,
                redirectURI,
                clientId,
                scope,
                state,
                nonce,
                responseType,
                responseMode
              )}
            </Request>
          </ModalBody>
        </RequestBody>
        <ModalFooter>
          <Button
            outline
            color="success"
            onClick={() => (window.location.href = authRequest)}
          >
            Send request
          </Button>{" "}
          <Button outline color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </RequestModal>
  )
}

export default View
