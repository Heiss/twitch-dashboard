import { Fragment } from "@bikeshaving/crank";
import $ from "jquery";
import * as chat from "../api/Chat"

/*https://medium.com/@zachvv11/real-time-chat-room-with-larasocket-tailwind-alpine-livewire-and-laravel-406a8c5e680d*/

function* Member({ member }) {
    let player = member;
    while (true) {
        yield (<div class="px-2 py-1 text-white bg-blue-700 rounded mr-4 mb-4">
            {player.name}
        </div>)
    }
}

function* Message({ message }) {
    while (true) {
        yield (<Fragment>
            <div class="flex flex-row justify-between border-b border-gray-200">
                <span class="text-gray-600">{message.member.name}</span>
                <span class="text-gray-500 text-xs" >{new Date(message.date)}</span>
            </div>
            <div class="my-4 text-gray-800">{message.text}</div>
        </Fragment>)
    }
}

function* Members({ refresh = 200 }) {
    let seconds = 0;
    let members = [];

    const interval = setInterval(async () => {
        seconds++;
        let newMembers = await chat.getMembers();
        if (newMembers != members) {
            members = newMembers;
            this.refresh();
        }
    }, refresh);

    try {
        while (true) {
            if (members.length == 0) {
                yield (<div class="py-4 text-gray-600">
                    It's quiet in here...
                </div>);
            } else {
                yield <Fragment>{
                    members.map((member) => (
                        <Member member={member} />
                    ))
                }</Fragment>
            }
        }
    } finally {
        clearInterval(interval);
    }
}

function* Messages({ refresh = 200 }) {
    let seconds = 0;
    let messages = [];

    const interval = setInterval(async () => {
        seconds++;
        let newMessages = await chat.getChat();
        if (newMessages != messages) {
            messages = newMessages;
            this.refresh();
        }
    }, refresh);

    try {
        while (true) {
            if (messages.length == 0) {
                yield (<div class="py-4 text-gray-600">
                    It's quiet in here...
                </div>);
            } else {
                yield <Fragment>{
                    messages.map((message) => (
                        <Message message={message} />
                    ))
                }</Fragment>
            }
        }
    } finally {
        clearInterval(interval);
    }
}


export default function* () {
    let self = this;
    function send() {
        self.$Chat.send({ member: { name: "Peter" }, text: $("#messageBody").val(), date: Date.now() })
        $("#messageBody").val("")
    }

    $(function () {
        $("#messageBody").on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                send();
            }
        });
    })

    while (true) {
        yield (
            <Fragment>
                <div
                    class="mt-4 bg-white rounded-lg shadow-md p-6">

                    <div class="flex flex-row flex-wrap border-b">
                        <div class="text-gray-600 w-full mb-4">Members:</div>
                        <Members />
                    </div>
                    <div class="my-8">
                        <Messages />
                    </div>

                    <div
                        class="flex flex-row justify-between"
                    >
                        <input
                            class="mr-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Hello World!" id="messageBody" />

                        <button id="sendBtn" onclick={send}
                            class="btn btn-primary self-stretch"
                        >
                            Send
                </button>
                    </div>
                </div>
            </Fragment >
        );
    }
}
