import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Game from '../models/Game';

const models = [User, Game];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

User.associate(connection.models);
Game.associate(connection.models);
