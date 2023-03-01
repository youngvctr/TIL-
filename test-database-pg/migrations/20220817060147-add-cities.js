module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize')} Sequelize
     */
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })

    await queryInterface.addColumn('users', 'cityId', {
      type: Sequelize.DataTypes.INTEGER,
      INTEGER,
      refrences: {
        model: 'cities',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize')} Sequelize
     */
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'cityId')
    await queryInterface.dropTable('cities')
  },
}
