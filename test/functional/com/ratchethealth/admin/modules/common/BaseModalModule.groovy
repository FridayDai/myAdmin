package com.ratchethealth.admin.modules.common

import geb.Module

class BaseModalModule extends Module {

    static content = {
        title { $(".modal-title").text() }

        closeButton { $("button.close") }
        cancelButton { $("button", text: "Cancel") }

        errorPlace { element -> element.next("label.help-block") }

    }

}
