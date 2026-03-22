'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'Airplanes', // name of the table
      'file_url', // name of the new column
      {
        type: Sequelize.STRING, // data type (e.g., STRING, INTEGER, BOOLEAN)
        allowNull: true, // column options,
         after: 'capacity',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'Airplanes', // name of the table
      'file_url' // name of the column to remove
    );
  }
};
