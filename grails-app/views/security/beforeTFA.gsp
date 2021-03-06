<!DOCTYPE html>
<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/beforeTFA.bundle.js"/>
<g:set var="cssPath" value="beforeTFA"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Before Two-Factor Authentication</title>
    </head>
    <body>
    <div class="content">
        <div class="container">
            <div class="app-or-key">
                <div id="app">
                    <div class="context-app">
                        Use an application on your phone to get two-factor authentication codes when prompted.
                    </div>
                    <g:form name="app" url="[controller:'authentication', action:'goToApp']">
                        <button type="submit">Set up using an APP</button>
                    </g:form>
                </div>
                <div id="key">
                    <div class="context-key">
                        Use a key for two-factor authentication code when prompted.
                    </div>
                    <g:form name="key" url="[controller: 'authentication', action: 'goToKey']">
                        <button type="submit">Set up using a key</button>
                    </g:form>
                </div>
            </div>
        </div>

    </div>

    %{-- Modal dialog --}%
    <div class="modal fade" id="change-password-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Change Password</h4>
                </div>

                <div class="modal-body">
                    <div class="alert alert-danger rc-server-error" role="alert"></div>

                    <g:form controller="profile" action="updatePassword" method="POST" class="form form-horizontal">
                        <div class="form-group">
                            <label for="old-password" class="col-sm-5 control-label">* OLD PASSWORD:</label>

                            <div class="col-sm-6">
                                <input id="old-password" name="old-password" type="password" class="form-control"
                                       placeholder="Enter old password" required/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="new-password" class="col-sm-5 control-label">* NEW PASSWORD:</label>

                            <div class="col-sm-6">
                                <input id="new-password" name="new-password" type="password" class="form-control"
                                       placeholder="Enter new password" required/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirm-password" class="col-sm-5 control-label">* CONFIRM PASSWORD:</label>

                            <div class="col-sm-6">
                                <input id="confirm-password" name="confirm-password" type="password" class="form-control"
                                       placeholder="Enter new password again" required/>
                            </div>
                        </div>

                        <div class="error-area error hide error-password" id="confirmPass-error">
                            Passwords do not match, please retype.
                        </div>
                    </g:form>


                </div>

                <div class="modal-footer">
                    <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                    <button class="create-btn btn btn-primary" type="button"
                            data-loading-text="Creating">Create</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="change-time-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Change Time</h4>
                </div>

                <div class="modal-body">
                    <div class="alert alert-danger rc-server-error" role="alert"></div>

                    <g:form controller="profile" action="changeScheduleTime" method="POST" class="form form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">Last Debug Date:</label>

                            <div class="col-sm-6">
                                <div id="lastDebugDate" class="label-text"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="debugDate" class="col-sm-5 control-label">* Debug Date:</label>

                            <div class="col-sm-6">
                                <input id="debugDate" name="debugDate" class="form-control"
                                       placeholder="Enter Debug Date" required/>
                            </div>
                        </div>
                    </g:form>

                </div>

                <div class="modal-footer">
                    <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                    <button class="create-btn btn btn-primary" type="button"
                            data-loading-text="Creating">Create</button>
                </div>
            </div>
        </div>
    </div>

    </body>
    </html>
</g:applyLayout>




