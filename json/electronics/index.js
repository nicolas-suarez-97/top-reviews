import accessoriesSupplies from "./accessories-supplies";
import cameraPhoto from "./camera-photo";
import carVehicleElectronics from "./car-vehicle-electronics";
import computersAccessories from "./computers-accessories";
import ebookReadersAccessories from "./ebook-readers-accessories";
import electronicsFeatures from "./electronics-features";
import gpsFindersAccessories from "./gps-finders-accessories";
import headphones from "./headphones";
import homeAudio from "./home-audio";
import householdBatteriesChargers from "./household-batteries-chargers";
import portableAudioVideo from "./portable-audio-video";
import powerAccessories from "./power-accessories";
import securitySurveillance from "./security-surveillance";
import televisionVideo from "./television-video";
import videoProjectors from "./video-projectors";
import wearableTechnology from "./wearable-technology";

const electronics = {
    name: 'Electronics',
    id: 'electronics',
    imageUrl: '',
    subcategories: [
        accessoriesSupplies,
        cameraPhoto,
        carVehicleElectronics,
        computersAccessories,
        ebookReadersAccessories,
        electronicsFeatures,
        gpsFindersAccessories,
        headphones,
        homeAudio,
        householdBatteriesChargers,
        portableAudioVideo,
        powerAccessories,
        securitySurveillance,
        televisionVideo,
        videoProjectors,
        wearableTechnology
    ]
}

export default electronics;