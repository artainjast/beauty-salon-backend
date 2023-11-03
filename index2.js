const threeWeeksAgo = Math.floor(Date.now() / 1000) - 21 * 24 * 60 * 60;
const startTime = new Date(threeWeeksAgo * 1000).setHours(19, 0, 0, 0) / 1000;
const endTime = new Date(startTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000;
console.log(startTime);
console.log(endTime);
console.log((startTime + endTime) / 2);

// console.log(new Date().setHours(19, 0, 0, 0) / 1000);