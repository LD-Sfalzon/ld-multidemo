import React from 'react';
import Iframe from 'react-iframe';
import { Row } from 'react-bootstrap';

function MultiPage() {
    return (
      
        <Row className="vh-100 vw-100 justify-content-center p-5" style={{ minHeight: '100vh' }}>
            <Iframe url="#page/1" frameBorder={1} className="w-25 rounded" style={{ borderRadius: '20px', border: 'none'  }} />  
            <Iframe url="#page/2" frameBorder={1} className="w-25 rounded" style={{  borderRadius: '20px', border: 'none'  }} />
            <Iframe url="#page/3" frameBorder={1} className="w-25 rounded" style={{ borderRadius: '20px', border: 'none'  }} />
            <Iframe url="#page/4" frameBorder={1} className="w-25 rounded" style={{  borderRadius: '20px', border: 'none'  }} />
        </Row>
      
    );
}

export default MultiPage;