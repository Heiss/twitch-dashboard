# Dashboard for twitch

This is a web dashboard for twitch.

## Idea

Learning rust with an api server written in Rust and an web written in CrankJS + Tailwind.

## Progress

None

## Usage

Use `make` to install all dependencies, build the application or watch for changes.

```bash
make install
make build
make watch
```

## Doing list

- [ ] Rust API Server for twitch
    - [ ] chat
        - [ ] read chatlog
            - [ ] show chatlog for conversation (`@username` and twitch implementation)
        - [ ] write to chatlog
        - [ ] remove single message
        - [ ] remove messages with filter
        - [ ] user
            - [ ] show user profile
            - [ ] show chatlog for one user
            - [ ] moderate user (ban, deban)
    - [ ] overlay system for browser-extension in OBS
        - [ ] show content
- [ ] Web Single-Page-Application
    - [ ] implement frontend with tailwind
    - [ ] implement button for chat
        - [ ] show chatlog
- [ ] Write doc
- [ ] Write tests