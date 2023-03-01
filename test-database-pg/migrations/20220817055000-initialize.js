// @ts-check

const { Sequelize, sequelize } = require('../models')

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // 프로덕션 db의 경우 git 저장소의 commit이 위로 올라가게되더라도 배포와 db상태가 엇나갈 수 있는데,
    // alter query와 ORM의 sync를 사용하는 것은 매우 위험하기 때문에,
    // 프로덕션 db의 스키마 변경의 경우에는 항상 검증된 migration만 들어가서 CI나 요인을 통해 upquery를 실행 시켜서
    // 안전한 스키마 변경을 한다.
    await queryInterface.createTable('users', {
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
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   */
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users')
  },
}
