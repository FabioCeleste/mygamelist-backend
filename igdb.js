const axios = require('axios');
// const maxPage = 10848;
// const testPage = 10;

// for (let i = 1; i <= testPage; i++) {
//   axios({
//     url: `https://api.rawg.io/api/games?ordering=name&page=${i}&page_size=40`,
//     method: 'GET',
//   }).then(
//     (response) => {
//       const arrayResult = response.data.results;
//       // console.log(arrayResult.length);
//       // arrayResult.map((result) => console.log(result.name));
//       const forLoop = async () => {
//         for (let ii = 1; ii <= arrayResult.length; ii++) {
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//           console.log(arrayResult[ii].name);
//         }
//       };
//       forLoop();
//     },

//   ).catch((err) => {
//     console.log(err);
//   });
// }

// axios({
//   url: 'https://api.rawg.io/api/games?ordering=name&page=10848&page_size=40',
//   method: 'GET',
// }).then(
//   (response) => {
//     const arrayResult = response.data.results;
//     // console.log(arrayResult.length);
//     arrayResult.map((result) => console.log(result.name));
//   },
// ).catch((err) => {
//   console.log(err);
// });

for (let i = 6; i <= 15; i++) {
  axios({
    url: 'https://api.rawg.io/api/games?ordering=name&page=5&page_size=40',
    method: 'GET',
  }).then(
    (response) => {
      const arrayResult = response.data.results;
      arrayResult.map(async (result) => {
        const gameName = await result.name;
        console.log(gameName);
      });
    },
  ).catch((err) => {
    console.log(err);
  });
}
