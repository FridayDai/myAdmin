'use strict';

var flight = require('flight');
var withForm = require('../common/withForm');
var withDialog = require('../common/withDialog');

function addTreatmentFormDialog () {
    /* jshint validthis:true */

    this.attributes({
        submitBtnSelector: '.create-btn'
    });

    this.onFormSuccess = function (e, data) {
        this.trigger('createTreatmentSuccess', data);

        this.hideDialog();
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onFormSuccess)
    });
}

module.exports = flight.component(withForm, withDialog, addTreatmentFormDialog);
