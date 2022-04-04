const { model, DataTypes } = require('sequalize');
//const bcrypt = require('bcrypt);
const sequelize = require('../config/connection');

// create the model/schema
 class Users extends Model {
   //check password
   checkPassword(loginPW) {
       return bcrypt.compareSync(loginPW, this.password);
   }
 }
     
  Users.init(
     {

         Donor_id: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
         },
         organ_name: {
             type: DataTypes.STRING,
             allowNull: false
         },

         biofluids_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purpose_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
         username: {
            type: DataTypes.STRING,
            allowNull: false                 
         },
         email: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true,
             validate: {
              isEmail: true
             }
         },
          password: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: {
             len: [4]
             }
         }
     },
     {
         hooks: {
             async beforeCreate(newUserData) {
             newUserData.password = await bcrypt.hash(newUserData.password, 10);
             return newUserData;
             },
    
             async beforeUpdate(updatedUserData) {
             updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
             return updatedUserData;
             }
         },
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'users'
      }    
            
 );  

module.exports = Users;
