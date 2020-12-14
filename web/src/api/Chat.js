// Tutorial http://www.sheshbabu.com/posts/organizing-http-requests-using-api-module-pattern/
// https://petetasker.com/using-async-await-jquerys-ajax#errors

import * as Config from "./Config";
import $ from "jquery";

export async function getMembers() {
    let result;
    try {
        result = await $.ajax({
            url: Config.url + "/members",
            type: 'GET'
        });

        return JSON.parse(await result);
    } catch (error) {
        return [];
    }
}

export async function getChat() {
    let result;
    try {
        result = await $.ajax({
            url: Config.url + "/messages",
            type: 'GET'
        });

        return JSON.parse(await result);
    } catch (error) {
        return [];
    }
}