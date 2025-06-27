import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


export interface MovieAttributes {
  id?: number;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

class Movie extends Model<MovieAttributes> implements MovieAttributes {
  public id!: number;
  public year!: number;
  public title!: string;
  public studios!: string;
  public producers!: string;
  public winner!: boolean;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    winner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "movies",
    timestamps: false,
  }
);

export default Movie;