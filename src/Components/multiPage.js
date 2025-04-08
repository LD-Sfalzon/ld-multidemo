import React from 'react';
import Login from './Form';

import { Row, Image } from 'react-bootstrap';
function MultiPage() {
  return (
<Row className="vh-100 justify-content-center">
  <div className="d-flex bg-body col-md-auto">
    <Login variant={1} />
  </div>
  <div className="d-flex bg-body col-md-auto">
    <Image src="/public/1.svg" className="mb-2" />
    <Login variant={2} />
  </div>
  <div className="d-flex bg-body col-md-auto">
    <Image src="/public/1.svg" className="mb-2" />
    <Login variant={3} />
  </div>
  <div className="d-flex bg-body col-md-auto">
    <Image src="/public/logo192.png" className="mb-2" />
    <Login variant={4} />
  </div>
</Row>

  );
}

export default MultiPage;