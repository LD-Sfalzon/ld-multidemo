// Login.js:
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import { ChatDots, Telephone, XSquare, Robot } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

function ChatModal({ flags, ldClient, variation }) {
    //let context = ldClient.getContext()
  //console.log("Chat modal sees this context:",context)
    function trackPhone() {
        if (variation === 4) {
          //console.log('Tracking a Phone button')
            ldClient.track("Contact - phone")
            ldClient.flush()
        }
        setShow(false)
    }
    function trackChat() {
        if (variation === 4) {
          //console.log('Tracking a chat button')
            ldClient.track("Contact - chatbot")
            ldClient.flush()
            

        }
        setShow(false)
    }
    function trackShow() {
      //console.log("state-warnings",flags.stateWarnings)
        //let context = ldClient.getContext()
      //console.log("Original Context",context)
        //if (variation === 4) {
        //    if (flags.chatIcon === "chat-dots") {
        //      //console.log("tracking a Chat")
        //        ldClient.track("Chat CTA")
        //    }
        //    if (flags.chatIcon === "telephone") {
        //      //console.log("tracking a Phone")
        //        ldClient.track("Phone CTA")
        //    }
        //    if (flags.chatIcon === "robot") {
        //      //console.log("tracking a Chatbot")
        //        ldClient.track("Chatbot CTA")
        //    }
        //    ldClient.flush()
        // }

        ldClient.track("Contact")
        ldClient.flush()
    }
    //var icon = flags.chatIcon
  //console.log(icon)
  //console.log('variationis: ', variation)
    const [show, setShow] = useState(false);
    const [modalTitleText] = useState('Contact Us');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className="chatButton" margin={2} variant="flat" onClick={handleShow}>
                {variation !== 4 &&
                    <Telephone />
                }
                {variation === 4 && flags.chatIcon === "telephone" &&
                    <Telephone />
                }
                {variation === 4 && flags.chatIcon === "chat-dots" &&
                    <ChatDots />
                }
                {variation === 4 && flags.chatIcon === "robot" &&
                    <Robot />
                }
            </Button>

            <Modal onShow={trackShow} show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{modalTitleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between">
           <Button variant="flat" onClick={trackChat}> Chat Now</Button>   
          
           <Button variant="flat" onClick={trackPhone}> Call Now</Button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="flat" onClick={handleClose}>
                        <XSquare />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default withLDConsumer()(ChatModal);

