extern crate ini;

use ini::Ini;
use std::sync::Mutex;


use actix_web::{App, HttpServer, HttpResponse, web, get, post, Result};
use actix_web_static_files;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

include!(concat!(env!("OUT_DIR"), "/generated.rs"));

#[derive(Serialize)]
struct Oauth2Provider {
    authorization_url: String,
    token_url: String,
    callback_url: String,
    client_id: String,
    client_secret: String,
}

struct Oauth {
    token: String
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let conf = Ini::load_from_file("conf.ini").expect("No conf.ini found!");
    let section = conf.section(Some("oauth")).expect("missing section oauth in conf.ini");
    let provider = web::Data::new(Oauth2Provider {
        authorization_url: section.get("authorization_url").expect("missing authorization_url in conf.ini").to_string(),
        token_url: section.get("token_url").expect("missing token_url in conf.ini").to_string(),
        callback_url: section.get("callback_url").expect("missing callback_url in conf.ini").to_string(),
        client_id: section.get("client_id").expect("missing client_id in conf.ini").to_string(),
        client_secret: section.get("client_secret").expect("missing client_secret in conf.ini").to_string(),
    });

    let token = match section.get("client_token") {
        Some(v) => v.to_string(),
        None => {
            // user not logged in, trigger workflow
            String::from("")
        }
    };
    let oauth = web::Data::new(Mutex::new(Oauth { token }));

    HttpServer::new(move || {
        let generated = generate();
        App::new().app_data(provider.clone()).app_data(oauth.clone())
            .service(actix_web_static_files::ResourceFiles::new(
                "/", generated,
            ).resolve_not_found_to_root(), )
    })
        .bind("127.0.0.1:8080")?
        .run()
        .await
}