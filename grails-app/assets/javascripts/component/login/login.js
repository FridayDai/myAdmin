require('jValidate');
var flight = require('flight');

function login() {
    /* jshint validthis:true */

    this.attributes({
        submitBtnSelector: ".login-btn",
        loadingState: 'Signing in'
    });

}

module.exports = login;
