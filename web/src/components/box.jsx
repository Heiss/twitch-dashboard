
import $ from "jquery";
import Chart from 'chart.js';

export function* Bar({ children, labels }) {
    while (true) {
        let index = this.consume("index");

        $(function () {
            new Chart(document.getElementById("chartjs-bar-" + index), {
                "type": "bar",
                "data": {
                    "labels": labels,
                    "datasets": children
                },
                "options": {
                    "scales": {
                        "yAxes": [{
                            "ticks": {
                                "beginAtZero": true
                            }
                        }]
                    }
                }
            });
        });
        yield (<canvas id={"chartjs-bar-" + index} class="chartjs" width="100" height="100"></canvas>);
    }
}

export function* Box({ children, type }) {
    let index = 0;
    while (true) {
        this.provide("index", index);
        yield (<div class="w-full md:w-1/2 xl:w-1/3 p-3">
            <div class="bg-gray-900 border border-gray-800 rounded shadow">
                <div class="border-b border-gray-800 p-3">
                    <h5 class="font-bold uppercase text-gray-600">Graph</h5>
                </div>
                <div class="p-5">
                    {children}
                </div>
            </div>
        </div>);
    }
}





