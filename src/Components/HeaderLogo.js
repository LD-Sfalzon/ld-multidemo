import { Image } from "react-bootstrap";
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import image1 from '../img/variation1.png';
import image2 from '../img/variation2.png';
import image3 from '../img/variation3.png';
import image4 from '../img/variation4.png';

const HeaderLogo = ({ flags, variant }) => {
  const images = [image1, image2, image3, image4];
  const selectedImage = images[variant - 1];

  console.log("header variant: ", variant);

  return flags.showQrCode ? (
    <Image src={selectedImage} rounded />
  ) : (
    <div></div>
  );
};

export default withLDConsumer()(HeaderLogo);