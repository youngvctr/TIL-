// @ts-check
const { dasherize } = require('i/lib/methods')
const { Sequelize, DataTypes } = require('sequelize')

async function main() {
  const sequelize = new Sequelize({
    database: 'climbing_portal',
    username: 'root',
    password: 'todayis220624!',
    dialect: 'postgres',
    host: 'localhost',
  })

  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  const City = sequelize.define(
    'city',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  User.belongsTo(City) // many to 1

  await sequelize.sync({
    force: true,
  })

  const newCity = await City.build({
    name: 'Seoul',
  }).save()

  console.log(newCity)

  await User.build({
    name: 'Coco',
    age: 20,
    cityId: newCity.getDataValue('id'),
  }).save()

  //await newUser.save()

  await sequelize.authenticate()
  await sequelize.close()
}

main()

// production 환경에서는 데이터를 통째로 날릴 수도 있기 때문에 좀 더 조심스러운 migration 방법을 사용해야 한다.
