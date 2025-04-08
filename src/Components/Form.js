// Login.js:
import React, {  useRef, useState,useEffect } from 'react';

import { Form, Image, Button, Container, Col, Dropdown, Alert } from 'react-bootstrap';
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import QrCode from './Qrcode';
import ChatModal from './ChatModal';
import SearchBox from './SearchBox';
import Offline from "./Offline";
import { useSessionStorage } from './useSessionStorage';
import HeaderLogo from './HeaderLogo';
import { useNavigate } from 'react-router-dom';

function Login({ flags, ldClient, variant }) {
  
  const DEMOKEY = process.env.REACT_APP_DEMOKEY;

  const ogContext = ldClient.getContext()
  var newContext = ogContext
  newContext.custom.variant = variant
  ldClient.identify(newContext, null, () => {
    //let updatedContext = ldClient.getContext()
    //console.log(updatedContext.custom.variant)

  });
  //const ogContextKey = ogContext.key
  const navigate = useNavigate();

  //console.log(flags)
  //console.log("login sees", variant)
  //console.log("ldClient", ldClient)
  const [demoContextUpdated, setDemoContextUpdated] = useState(false);

  useEffect(() => {
    
    if (flags.showQrCode){
    if (flags.demoContext) { // Check if demoContext exists
      let   curContext = ldClient.getContext()
      //console.log("updated context is : ",curContext.key)
      //console.log("Old context was: ", ogContextKey)
      //console.log("new flag is: ",flags.demoContext)
      if (curContext.key !== DEMOKEY) {
      if (flags.demoContext !== curContext.key) {
        //console.log('old:',ogContext.key,"current:",curContext.key, "new:",flags.demoContext)
        navigate(0)
       
      }
    }
      setDemoContextUpdated(true); // Flag for re-rendering
      
      

    }}
  }, [flags.demoContext,ldClient,navigate,ogContext.key,DEMOKEY,flags.showQrCode]); // Re-run on demoContext change
  var custLogo = "";

  function AddressForm(props) {
    //console.log("props", props)


  
    const address1Ref = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);



    function updateContext(e) {
      //console.log('ldClient', ldClient)

      let context = ldClient.getContext()

      if (e.length === 3 && context.custom.state !== e) {
        //console.log("should update Context")
        context.custom.state = e.toUpperCase();
        //console.log("updating context to include state: ", context.custom.state)
        ldClient.identify(context, null, () => {
          //console.log("New context's flags available");
          //let updatedContext = ldClient.getContext()
          //console.log("Updated Context", updatedContext)
          //console.log("state-warnings", flags.stateWarnings)

        });

      }

    }

    function UpdateForm(address, city, state) {
    //console.log(address, city, state)
      // Update the fields on the form basedon the data provided
    //console.log(ldClient)
      address1Ref.current.value = address;
      cityRef.current.value = city;
      stateRef.current.value = state
    //console.log("storing the data")

      sessionStorage.setItem("city",JSON.stringify(city))
      sessionStorage.setItem("state",JSON.stringify(state))
      sessionStorage.setItem("address",JSON.stringify(address))
      

  
    //console.log("stored the data ========")


      updateContext(state)



    }

    function DDPropertySelect() {
      return (
        <Dropdown onLoad={updateContext(state)}>
          <Dropdown.Toggle variant="flat" id="dropdown-basic">
            Registered Properties
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => UpdateForm("Charlotte St", "Paddington", "QLD")}
            >
              Charlotte St, Paddington
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => UpdateForm("Charlotte St", "Erinsborough", "VIC")}
            >
              Ramsay St, Erinsborough
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => UpdateForm("109 Kirribilli Avenue", "Kirribilli", "NSW")}
            >
              Kirribilli Avenue, Kirribilli
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    const [state, setState] = useSessionStorage("state", "");
    const [address, setAddress] = useSessionStorage("address", "");
    const [city, setCity] = useSessionStorage("city", "");
    
    
    const handleInputChange = (event)  => {
    //console.log('handling the input change:',event)
       const newValue = event.target.value;
       setState(newValue);  
       if (variant === 2 ){
       updateContext(newValue)}
       // Perform any additional actions with the updated value
     //console.log('Updated value:', newValue);
     };
   

    return (
      <>

        <Form.Group className="lead">

          <DDPropertySelect></DDPropertySelect>
          <br />
          <Form.Group className="lead" style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="address"
              value={address}
              id={`my-address1-${props.version}`}
              //onChange={(e) => setAddress(e.target.value)}
              onChange={(e) => setAddress(e.target.value)}

              ref={address1Ref}
            />
          </Form.Group>
          <br />
          <Form.Group className="lead" style={{ display: 'flex', alignItems: 'center' }}>

            <Form.Label>City:</Form.Label>
            <Form.Control
              type="city"
              value={city}
              id={`my-city-${props.version}`}
              onChange={(e) => setCity(e.target.value)}
              ref={cityRef}

            />
          </Form.Group>
          <br />
          <Form.Group className="lead" style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Label>State:</Form.Label>
            <Form.Control
              type="state"
              value={state}
              onChange={handleInputChange}
              
              id={`my-state-${props.version}-${flags.demoContext}`}
              ref={stateRef}

            />
          </Form.Group>
        </Form.Group>
      </>
    );
  }

  var online = flags.releaseConfidentlyAndConsistently;
//console.log("Online?", online)
  if (!online) {
    console.log(demoContextUpdated)
    return (
      <Container className="loginForm border p-2" style={{ height: '100vh ' }}>
  
       <HeaderLogo variant={variant}/>

      <Col md="auto" className="">
          
            <Offline />
          </Col>
          </Container>
    )
  }

  else {

  const qrCodeValue = `${window.location.href}`;
//console.log("QR Code URL is :",qrCodeValue)
  custLogo = flags.custLogo
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send a request to your server
  };
  return (
    
    <Container className="loginForm border p-2" style={{ height: '100vh ' }}>
  
       <HeaderLogo variant={variant}/>

      <Col md="auto" className="">

            <Image src={custLogo} rounded fluid />

          
          
          <Alert variant="success" >Starting a Claim</Alert>
          {variant === 2 && flags.stateWarnings.warn &&

            <Alert variant="danger" >
              {flags.stateWarnings.message}
            </Alert>
          }
          <Form onSubmit={handleSubmit} style={{ "justifyContent": "center" }}>
            {variant !== 3 && <AddressForm version={variant} />
            }
            {variant === 3 && !flags.addressSearch &&
              <AddressForm version={(variant)} />
            }

            {variant === 3 && flags.addressSearch &&
              <Form.Group className="mb-auto" >
                <Form.Label>Address</Form.Label>
                
                <SearchBox ></SearchBox>
              </Form.Group>
            }

            <>

              <style type="text/css">
                {`
.btn-flat {
  background-color: #183F49;
  color: #F7CC45;
  font-weight: bolder;
}


`}
              </style>
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ChatModal variation={variant} ></ChatModal>
                <Button margin={2} variant="flat" type="submit" className="w-90">
                  Next
                </Button>
              </div>
            </>
          </Form>
        
        <QrCode value={qrCodeValue} />
      </Col>

      <div
        style={{
          textAlign: "right",
          display: "block",
          padding: 30,
          margin: "auto",
        }}
      >



      </div>

    </Container>
  );

}
}
export default withLDConsumer()(Login);