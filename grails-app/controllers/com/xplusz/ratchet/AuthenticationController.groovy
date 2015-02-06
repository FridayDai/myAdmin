package com.xplusz.ratchet

import com.xplusz.ratchet.exceptions.AccountValidationException

/**
 * Authentication controller for login/logout
 *
 */
class AuthenticationController extends BaseController {

    static allowedMethods = [login: ['POST', 'GET'], logout: ['GET']]

    def beforeInterceptor = [action: this.&auth, except: ['login']]

    def authenticationService

    def login() {
        if (request.method == "GET") {
            def back = params.back

            render(view: '/security/login', model: [backUrl: back])
        } else if (request.method == "POST") {
            def resp = authenticationService.authenticate(request, response, params)

            if (resp?.authenticated) {
                if (params.back) {
                    redirect(uri: params.back)
                } else {
                    redirect(uri: '/')
                }
            }
        }
    }

    /**
     * Handle logout.
     * @return
     */
    def logout() {
        if (!authenticationService.logout(request, response)) {
            log.warn("logout failed")
        } else {
            redirect(uri: '/login')
        }
    }

    /**
     * handle AccountValidationException, when Exception happened, it should be back to login.
     * @param request
     * @param response
     * @param params
     * @return
     */

    def handleAccountValidationException(AccountValidationException e) {
        def time

        if (e.limitSeconds) {
            time = e.limitSeconds
        } else {
            time = null
        }

        def msg = e.getMessage()
        render(view: '/security/login', model: [errorMsg: msg, rateLimit: time])

    }

}
