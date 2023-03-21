// import '../style.css'
// import typescriptLogo from '../assets/typescript.svg'
// import { setupCounter } from './counter'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


import  config  from '../../config.json'
import { control } from '../controller/app-controller/controller';
import { getStorage } from '../controller/app-controller/controller';

export const { apiURL , deleteAllURL } = config;

export const storage = document.querySelector('.storage') as HTMLSelectElement;
const addTaskButton = document.querySelector('.add-task-button') as HTMLButtonElement;
export const input = document.querySelector('.input') as HTMLInputElement;
export const ul = document.querySelector('.taskList') as HTMLUListElement;



addTaskButton.addEventListener('click', (e) => {
  e.preventDefault()
  control().createSingleTask()
})

storage.addEventListener('change', () => {
  if (confirm(`U are changing the storage .=> you data will store only in ${storage.value}`)) {
      getStorage();
      ul.innerHTML = '';
      control().createAllTasks();
  }
})

control().createAllTasks();

(document.querySelector('.clearAllBtn') as HTMLButtonElement).addEventListener('click', () => {
  getStorage().deleteAllItems()
})
