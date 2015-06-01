class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        // Root
        "/"(controller: "home", action: "index")

        //Health check
        "/healthcheck"(controller: "healthCheck", action: "index")

        // Account
        "/login"(controller: "authentication", action: "login")
        "/logout"(controller: "authentication", action: 'logout')

        // Client
        "/getClients"(controller: "clients", action: "getClients")
        "/clients"(controller: "clients") {
            action = [GET: "index", POST: "addClient"]
        }
        "/clients/$id/$clientName?"(controller: "clients") {
            action = [GET: "clientDetail", POST: "editClient"]
        }
        "/clients/$clientId/agents"(controller: "clients") {
            action = [POST: "addAgent"]
        }
        "/clients/$clientId/agents/$agentId"(controller: "clients") {
            action = [POST: "editAgent", DELETE: "deleteAgent"]
        }

        // Announcement
        "/getAnnouncements"(controller: "announcements", action: "getAnnouncements")
        "/announcements"(controller: "announcements") {
            action = [GET: "index", POST: "addAnnouncement"]
        }
        "/announcements/$announcementId"(controller: "announcements") {
            action = [POST: "editAnnouncement"]
        }

        // Treatment
        "/clients/$clientId/treatments"(controller: "treatments") {
            action = [GET: "getTreatments", POST: "addTreatment"]
        }
        "/clients/$clientId/treatments/$treatmentId/$treatmentName?"(controller: "treatments") {
            action = [GET: "treatmentDetail", POST: "editTreatment", DELETE: "closeTreatment"]
        }
        "/clients/$clientId/treatments/$treatmentId/tools"(controller: "treatments") {
            action = [GET: "getTools", POST: "addTool"]
        }
        "/clients/$clientId/treatments/$treatmentId/tools/$toolId"(controller: "treatments") {
            action = [POST: "editTool", DELETE: "deleteTool"]
        }
        "/clients/$clientId/treatments/$treatmentId/tasks"(controller: "treatments") {
            action = [GET: "getTasks", POST: "addTask"]
        }
        "/clients/$clientId/treatments/$treatmentId/tasks/$taskId"(controller: "treatments") {
            action = [POST: "editTask", DELETE: "deleteTask"]
        }

        // Account
        "/getAccounts"(controller: "accounts", action: "getAccounts")
        "/accounts"(controller: "accounts") {
            action = [GET: "index", POST: "addAccount"]
        }
        "/accounts/$accountId?/delete"(controller: "accounts", action: "deleteAccount")

        // Error
        "500"(view: '/error/error')
    }
}
