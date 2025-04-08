import { QrCode } from "react-qrcode-pretty";
import {Alert, Container} from "react-bootstrap";
import { withLDConsumer } from "launchdarkly-react-client-sdk";


const QrCodeCustom = ({ flags, value }) => {
        return flags.showQrCode ? (
<div style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
<Container  style={{ paddingTop: '5%' }}>
 <Alert> Scan the code below to join from your phone </Alert>

            <QrCode
      value={ value }
      size={150}
      variant={{
        eyes: 'fluid',
        body: 'reverse'
      }}
      color={{
        eyes: '#f7cc45',
        body: '#ffffff'
      }}
      padding={ 5 }
      margin={ 2 }
      modules={0}
      level='M'
      image='https://avatars.githubusercontent.com/u/8039656?s=200&v=4'
      bgColor='#183f49'
      
       / >
        </Container>
        </div>
          ) : (
      <div></div>
          );
};
export default withLDConsumer()(QrCodeCustom);