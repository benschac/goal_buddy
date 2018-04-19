module.exports = {
    "parser": "babel-eslint",
    "extends": "react",
    "extends": "airbnb",
    "globals": {
        "document": true,
        "localStorage": true,
        "window": true,
        "Notification": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};