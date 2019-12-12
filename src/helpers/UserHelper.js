import AppEnvironment from '../AppEnvironment';

const { app } = AppEnvironment;

export const parseUser = (user) => {
    return {
        key: user.loginId,
        name: user.firstName + " " + user.lastName,
        username: user.loginId,
        status: user.state,
        statusName: user.state
            .replace('_',' ')
            .toLowerCase()
            .split(' ')
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' '),
        statusInfo: (user.reasonCodeId && user.reasonCodeId !== '-1' ? (user.reasonCodeId) : '-'),
        image: user.image || (app.host + "/assets/avatar-icon.png")
    };
};

