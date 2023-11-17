'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      label: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Ajout des rôles d'utilisateur et d'administrateur
    await queryInterface.bulkInsert('users_roles', [
      { label: 'Utilisateur', createdAt: new Date(), updatedAt: new Date() }, // ID automatique
      { label: 'Administrateur', createdAt: new Date(), updatedAt: new Date() } // ID automatique
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_roles');
  }
};
