const dev = {
    API_URL: 'https://nibss-mail-merge.natterbase.com'
};

const prod = {
    API_URL: 'https://nibss-mail-merge.natterbase.com'
};

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

export default {
    ...config
};