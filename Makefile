install:
	sudo apt-get install curl wget git build-essential libssl-dev libdbus-1-dev tmux
	sudo curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
	sudo curl https://npmjs.org/install.sh | sh
	cargo install cargo-watch
	npm install --prefix ./web/
	cargo check --manifest-path server/Cargo.toml

build:
	npm run build --prefix ./web/
	cargo build --release --manifest-path server/Cargo.toml

watch:
	tmux new-session \; \
	split-window -v \; \
	send-keys 'npm run start --prefix ./web/' C-m \; \
	split-window -h \; \
	send-keys 'cd server && cargo watch -x "run" --watch-when-idle -w ../' C-m \; \
	selectp -t 0 \;