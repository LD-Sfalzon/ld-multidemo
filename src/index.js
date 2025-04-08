import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { deviceType, osName } from "react-device-detect"
import { asyncWithLDProvider} from "launchdarkly-react-client-sdk";
import getUserId from "./util/getUserId";
import 'bootstrap/dist/css/bootstrap.css';


// Check if we are in a Development envrionemnt, and use a the "test" environment key in LD if we are
const isLocal = process.env.NODE_ENV === 'development';


// This key will be used in demo environment to ensure the experiment shows the "right" value for that user
const DEMOKEY = process.env.REACT_APP_DEMOKEY;



const root = ReactDOM.createRoot(document.getElementById('root'));
let id = getUserId();


// We will just assume that any mac laptop is running the demo
if (deviceType === "browser" && osName === "Mac OS") {
  id = DEMOKEY;
} 

// uae the islocal variable and use a the "test" environment key in LD if it is true
(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: isLocal ? process.env.REACT_APP_LOCALCLIENTKEY : process.env.REACT_APP_CLIENTKEY,
    timeout: 1,
    user: {
      key: id,
      //dynamically set these custom attributes using the deviceType and osName selectors from the npm package
      custom: {
        device: deviceType,
        operatingSystem: osName,
        state: "unknown",
      },
    },
  });
  

  // at this point if the key is DEMOKEY change it to the key supplied with the FF


  root.render(
    <LDProvider>
      <App />

    </LDProvider>
  );
})();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
