// SearchBox.js
import React, {useRef} from 'react';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'

function SearchBox() {

const inputref = useRef(null)
const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
  libraries:["places"]
})



console.log("Loaded", isLoaded)

return (
    <div className="searchBox">
        {isLoaded &&
        <StandaloneSearchBox
        onload={(ref) => inputref.current = ref} 
        //onPlacesChanged={handleOnPlacesChanged}
        >
        <input className="searchBox" type="text"
        placeholder="Start typing your address"
        />
        </StandaloneSearchBox>
}
        
    </div>
)
}

export default SearchBox;