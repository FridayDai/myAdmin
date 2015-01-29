//= require share/baseBundle
//= require ../../bower_components/underscore/underscore
//= require share/formModalBundle
//= require ../bower_components/DataTables/media/js/jquery.dataTables
//= require ../bower_components/jquery-form/jquery.form
//= require models/treatment

(function ($, undefined) {
    'use strict';

    // Init page object
    var page = {};

    // Initialize treatment list data table
    function initTreatmentList() {
        page.treatmentList = {
            // Editor for this table
            editor: null,

            // DataTable instance for this table
            table: null,

            // Initialize table
            init: function () {
                var list = this;

                this.table = $('#treatment-table').DataTable({
                    searching: false,
                    columns: [
                        {title: 'ID', data: 'id', width: '5%'},
                        {title: 'Treatment Title', data: 'title', width: '10%'},
                        {title: 'Template Title', data: 'tmpTitle', width: '10%'},
                        {title: 'Active', data: "active", width: '5%'},
                        {title: 'Description', data: "description", width: '37%'},
                        {title: 'Status', data: "status", width: '8%'},
                        {title: 'Last Updated', data: "lastUpdated", width: '20%'},
                        {
                            title: '',
                            data: function (row, type, set, meta) {
                                if (meta) {
                                    return '<span class="edit-btn glyphicon glyphicon-copy" aria-hidden="true" data-row="{0}"></span>'.format(meta.row);
                                }
                            },
                            width: '5%'
                        }
                    ],
                    rowCallback: function (row) {
                        var clientId = $('#client-info-panel .profile').data('id');

                        // Setup double click to entry specific client
                        $(row)
                            .click(function () {
                                var index = this.rowIndex - 1;

                                location.href = '/clients/' + clientId
                                + '/treatments/' + list.getRowData(index).id
                                + '/' + list.getRowData(index).title + '_' + list.getRowData(index).tmpTitle;
                            });
                    }
                });
            },

            // Add one new row
            addRow: function (row) {
                this.table.row.add(row).draw();
            },

            // Edit one row
            editRow: function (row) {
                this.editor.setValue(row);
                this.editor.show();
            },

            // Get row data
            getRowData: function (index) {
                return this.table.row(index).data();
            }
        };

        page.treatmentList.init();
    }

    function initClientDialogForm() {
        var clientModal = $('#client-modal');
        var clientForm = clientModal.find('form');
        var updateBtn = clientModal.find('.update-btn');

        RC.utility.formModal.defaultConfig({
            selector: '#client-modal',
            fieldSelectorArray: [
                ['.profile .name', '#subDomain'],
                ['.profile .sub-domain dd', '#subDomain'],
                ['.profile .portal-name dd', '#portalName'],
                ['.profile .primary-color dd', '#primaryColorHex'],
            ]
        });

        clientModal.on('show.bs.modal', function () {
            RC.utility.formModal.getValFromFieldArray('#client-modal form');
        });

        updateBtn.click(function () {
            var button = $(this);

            if (clientForm.valid()) {
                button.button('loading');

                clientForm.ajaxSubmit(function () {
                    RC.utility.formModal.setValFromFieldArray('#client-modal form');

                    clientModal.modal('hide');

                    button.button('reset');
                }, function () {
                    button.button('reset');
                });
            }
        });
    }

    function initAgentDialogForm() {
        var agentModal = $('#agent-modal');
        var agentForm = agentModal.find('form');
        var updateBtn = agentModal.find('.update-btn');

        RC.utility.formModal.defaultConfig({
            selector: '#agent-modal',
            fieldSelectorArray: [
                ['.agent .email dd', '#email'],
                ['.agent .first-name dd', '#firstName'],
                ['.agent .last-name dd', '#lastName']
            ]
        });

        var clientProfileEl = $('#client-info-panel .profile');
        var agentEl = $('#client-info-panel .agent');

        agentModal.on('show.bs.modal', function () {
            var clientId = clientProfileEl.data('id');
            var agentId = agentEl.data('agentId');

            if (!agentId) {
                agentModal.find('.modal-title').text('New Agent');
                agentModal.find('.update-btn').text('Create');

                agentForm.attr('action', '/clients/' + clientId + '/agents');
            } else {
                agentModal.find('modal-title').text('Edit Agent');
                agentModal.find('.update-btn').text('Update');

                agentForm.attr('action', '/clients/' + clientId + '/agents/' + agentId);

                RC.utility.formModal.getValFromFieldArray('#agent-modal form');
            }
        });

        updateBtn.click(function () {
            var button = $(this);
            var agentId = agentEl.data('agentId');

            if (agentForm.valid()) {
                if (agentId) {
                    button.button('loading');
                } else {
                    button.button('creating');
                }

                agentForm.ajaxSubmit(function (resp) {
                    agentEl.data('agentId', resp.id);
                    RC.utility.formModal.setValFromFieldArray('#agent-modal form');

                    agentModal.modal('hide');

                    button.button('reset');
                }, function () {
                    button.button('reset');
                });
            }
        });
    }

    function initDeleteAgentDialogForm() {
        var agentDeleteModal = $('#agent-delete-modal');
        var deleteBtn = agentDeleteModal.find('.delete-btn');

        deleteBtn.click(function () {
            var button = $(this);
            var clientId = $('#client-info-panel .profile').data('id');
            var agentId = $('#client-info-panel .agent').data('agentId');

            button.button('loading');

            $.ajax({
                url: '/clients/' + clientId + '/agents/' + agentId,
                type: 'DELETE'
            }).done(function () {
                $('.agent .email dd').empty();
                $('.agent .first-name dd').empty();
                $('.agent .last-name dd').empty();

                agentDeleteModal.modal('hide');
            }).always(function () {
                button.button('reset');
            });
        });
    }

    function initTreatmentDialogForm() {
        var modal = $('#treatment-modal');
        var form = modal.find('form');
        var createBtn = modal.find('.create-btn');

        RC.utility.formModal.defaultConfig('#treatment-modal');

        // Setup create button
        createBtn.click(function () {
            var button = $(this);

            if (form.valid()) {
                button.button('loading');

                form.ajaxSubmit(function (res) {
                    page.treatmentList.addRow(new RC.models.Treatment(res));

                    modal.modal('hide');

                    button.button('reset');
                }, function () {
                    button.button('reset');
                });
            }
        });
    }

    function init() {
        // Init edit client dialog form
        initClientDialogForm();

        // Init edit agent dialog form
        initAgentDialogForm();

        // Init add treatment dialog form
        initTreatmentDialogForm();

        // Init delete agent dialog form
        initDeleteAgentDialogForm();


        // Init treatment list
        initTreatmentList();
    }


    // Start processing
    init();
})
(jQuery);
