import globalStyles from "../styles/globals.module.scss";

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

export {
    getElevation,
    getEnvUrl,
}