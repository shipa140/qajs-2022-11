/**
 * функция вычисляет общую сумму баллов из объекта оценок.
 *
 * @param {Object} scores - Объект, содержащий имена и соответствующие им баллы.
 * @returns {number} Общая сумма баллов всех пользователей.
 *
 * @example
 * const scores = {
 *   Anna: 10,
 *   Olga: 1,
 *   Ivan: 5,
 * };
 * 
 * const total = getScore(scores);
 * console.log(total); 
 */


function getScore(scores) {
  let totalScore = 0;
  for (let score of Object.values(scores)) {
      totalScore += score;
  }
  return totalScore;
}
