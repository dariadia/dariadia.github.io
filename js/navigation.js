import { TASKS_AVAILABLE } from './tasks-available.js';

const navigationNode = document.querySelector(".navigation_list");

export const getNavigation = () => {
	for (let chapter in TASKS_AVAILABLE) {
		let chapterNode = getTasksPerChapter(TASKS_AVAILABLE[chapter], chapter);
		navigationNode.innerHTML += 
			`<li class="contents_heading">Chapter ${chapter}
				<ul>${chapterNode}</ul>
			</li>`
	}
}

const getTasksPerChapter = (chapterTasks, chapter) => {
	return chapterTasks.map(task => 
		`<li class="task_item">
			<span class="text-muted" data-chapter="${chapter}" data-task="${task}">Task ${task}</span>
		</li>`
	).reduce((task1, task2) => task1 + task2);
}
