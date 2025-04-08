import React from 'react';
import {Alert} from 'react-bootstrap';

function Offline(){
    const OfflineMessage = () => {
        return (

              <Alert variant="danger" style={{ marginTop: '20%' }}>
                  
                    <h4 className="fw-bold">Services are currently offline.</h4>
                    <p>We  apologize for the inconvenience, please call our service center on 1800 445 442 for assistance lodging a claim.</p>
              </Alert>
        );
      };
return (
    <>
    <OfflineMessage />
    
    </>
)
}


export default Offline;
