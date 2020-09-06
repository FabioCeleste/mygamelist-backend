import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Game from '../models/Game';
import Picture from '../models/Picture';

const models = [User, Game, Picture];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

User.associate(connection.models);
Game.associate(connection.models);
Picture.associate(connection.models);
