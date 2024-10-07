import { QrCode } from "react-qrcode-pretty";

export default function QrCodeCustom({ value }) {

    return (

        <QrCode
            size= {100}
            value={ value }
            variant={{
                eyes: 'gravity',
                body: 'fluid'
            }}
            color={{
                eyes: '#223344',
                body: '#335577'
            }}
            padding={ 10 }
            margin={ 10 }
            bgColor='#ffffff'
            bgRounded
            divider
        />

    );

}