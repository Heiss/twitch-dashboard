install:
	sudo apt-get install curl wget git build-essential libssl-dev libdbus-1-dev tmux
	sudo curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
	sudo curl https://npmjs.org/install.sh | sh
	cargo install watchexec
	npm install --prefix ./web/
	cargo check --manifest-path server/Cargo.toml

update:
	cargo update --manifest-path ./server/Cargo.toml
	npm update --prefix ./web/

build:
	npm run build --prefix ./web/
	cargo build --release --manifest-path server/Cargo.toml

watch:
	tmux new-session \; \
	send-keys 'cd server && watchexec -w ../web -w ./src -i ../web/build -i ./target -r -- "npm run build --prefix ../web && cargo clean -p twitch-dashboard-server && cargo run --bin twitch-dashboard-server"' C-m \; \
	selectp -t 0 \;