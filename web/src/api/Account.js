// Tutorial http://www.sheshbabu.com/posts/organizing-http-requests-using-api-module-pattern/
// https://petetasker.com/using-async-await-jquerys-ajax#errors

import * as Config from "./Config";
import $ from "jquery";

export async function is_logged() {
    let result;
    try {
        result = await $.ajax({
            url: Config.url + "/login",
            type: 'GET'
        });

        return JSON.parse(await result);
    } catch (error) {
        return true;
    }
}

export function username() {
    return "User";
}

export async function login(token) {
    let result;
    try {
        result = await $.ajax({
            url: Config.url + "/login",
            type: 'POST',
            data: { "token": token }
        });

        return JSON.parse(await result);
    } catch (error) {
        return false;
    }
}