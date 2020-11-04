import { IndexPage } from "./index-page.js";
import { getNavigation } from "./navigation.js";

const INDEX = "index";
const INDEX_PAGE = { chapter: INDEX };
const mainNode = document.querySelector(".wrapper_main");

const checkIfFirstRender = () => {
	if (!localStorage.getItem("currentChapter")) {
		localStorage.setItem("currentChapter", INDEX);
	}
}

const getPageContent = () => {
	let chapter = localStorage.getItem("currentChapter");
	let task = localStorage.getItem("currentTask");

	chapter === INDEX
		? mainNode.innerHTML = IndexPage
		: getTaskNode(chapter, task);
}
		
async function getTaskNode(chapter, task) {
	await import(`./Chapter-${chapter}/${task}.js`)
		.then((module) => {
			const pageTask = module[`Task${task}`];
			mainNode.innerHTML =
				`<div class="wrapper_task">
						<div class="wrapper_task__intro">
							<h2>Task:</h2>
							<p class="task_text">${pageTask.text}</p>
						</div>
					<div class="box_answer">${pageTask.sollution || "WIP"}</div>
				</div>`
		});
}

const setNavigationListeners = () => {
	const navigationNode = document.querySelector(".navigation_list");
	navigationNode.addEventListener("click", event => {
		let { chapter, task } = event.target.dataset;
		localStorage.setItem("currentChapter", chapter);
		localStorage.setItem("currentTask", task);
		window.location.reload();
	});
}

const init = () => {
	checkIfFirstRender();
	getNavigation();
	setNavigationListeners();
	getPageContent();
}

init();
