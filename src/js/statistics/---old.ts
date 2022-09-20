// import { getLocalStorage } from '../local-storage/local-storage';
// const renderStatistics = () => {
//   const statistics = `
//     <div class="stats__wrapper">
//     <h1 class="stats__title">Статистика за день</h1>
//     <table class="stats__table" aria-label="customized table">
//       <thead class="">
//         <tr class="">
//           <th class="stats__th" scope="col"></th>
//           <th class="stats__th " scope="col">Изучено новых слов</th>
//           <th class="stats__th" scope="col">Правильно&nbsp;(%)</th>
//           <th class="stats__th" scope="col">Самая длинная серия</th>
//         </tr>
//       </thead>
//       <tbody class="">
//         <tr class="stats__game_audio">
//           <th class="" role="cell" scope="row">Аудиовызов</th>
//           <td class="stats__th stats__learned_word_audio">${0}</td>
//           <td class="stats__th stats__accuracy_audio">${'0%'}</td>
//           <td class="stats__th stats__longest_streak_audio">${0}</td>
//         </tr>
//         <tr class="stats__game_sprint">
//           <th class="" role="cell" scope="row">Спринт</th>
//           <td class="stats__th stats__learned_word_sprint">${0}</td>
//           <td class="stats__th stats__accuracy_sprint">${'0%'}</td>
//           <td class="stats__th stats__longest_streak_sprint">${0}</td>
//         </tr>
//         <tr class="stats__game_all">
//           <th class="" role="cell" scope="row">Слова</th>
//           <td class="stats__th stats__learned_word_all">${0}</td>
//           <td class="stats__th stats__accuracy_all">${'0%'}</td>
//           <td class="stats__th"></td>
//         </tr>
//       </tbody>
//     </table>
//     </div>
//   `;

//   const statsContent = document.querySelector('.stats-content');

//   if (getLocalStorage('auth')) {
//     statsContent ? (statsContent.innerHTML = statistics) : '';
//   }
// };
// renderStatistics();
