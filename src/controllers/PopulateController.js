import axios from 'axios';

import Game from '../models/Game';

const maxPage = 10848;
// max 200 page
class PopulateController {
  async store(req, res) {
    for (let i = 9901; i <= 10100; i++) {
      axios({
        url: `https://api.rawg.io/api/games?ordering=name&page=${i}&page_size=40`,
        method: 'GET',
        headers: {
          'User-Agent': 'MyGameList',
        },
      }).then(
        (response) => {
          const arrayResult = response.data.results;
          arrayResult.map(async (result) => {
            const gameName = await result.name;
            const newGame = await Game.create({ game_name: gameName });
            console.log(newGame.game_name);
          });
        },
      ).catch((err) => {
        console.log(err);
      });
    }
  }
}

export default new PopulateController();
