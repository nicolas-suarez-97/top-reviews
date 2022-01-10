import globalStyles from "../styles/globals.module.scss";
import {months} from "../constants/date";

const getElevation = (elevation) => {
    switch (elevation) {
        case 1:
            return globalStyles.elevation1
        case 2:
            return globalStyles.elevation2
        case 3:
            return globalStyles.elevation3
        case 4:
            return globalStyles.elevation4
        case 5:
            return globalStyles.elevation5
        default:
            return globalStyles.elevation0
    }
}

const getEnvUrl = () => {
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    return dev ? DEV_URL : PROD_URL;
}

const parseDate = (date) => {
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDay();
    const month = months[new Date(date).getMonth()];

    return date ? `${month} ${day}, ${year}` : '';
}

const metaFormatDate = (date) => {
    const year = new Date(date).getFullYear();
    let day = new Date(date).getDay();
    day = day <= 9 ? `0${day}` : day;
    let month = new Date(date).getUTCMonth();
    month = month <= 9 ? `0${month + 1}` : month + 1;

    return date ? `${year}-${month}-${day}` : '';
}

export {
    getElevation,
    getEnvUrl,
    parseDate,
    metaFormatDate,
}