
use actix_web::Responder;

pub async fn get_users() -> impl Responder {
    format!("hello from get users")
}

pub async fn get_user_by_id() -> impl Responder {
    format!("hello from get users by id")
}

pub async fn add_user() -> impl Responder {
    format!("hello from add user")
}

pub async fn delete_user() -> impl Responder {
    format!("hello from delete user")
}

pub async fn get_oauth() -> impl Responder {
    //https://id.twitch.tv/oauth2/authorize?client_id={}&login_type={}&redirect_uri={}&response_type=token&scope=user_read&state={}
    "{}"
}