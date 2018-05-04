module.exports = {
    "parser": "babel-eslint",
    "extends": "react",
    "extends": "airbnb",
    "plugins": ["jest"],
    "globals": {
        "document": true,
        "localStorage": true,
        "window": true,
        "Notification": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
    "env": {
        "jest/globals": true
    }
};