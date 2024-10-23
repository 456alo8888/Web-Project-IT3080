// import mongoose, { mongo, Schema } from "mongoose";

// const adminSchema = new Schema({
//     username: { type: String, required: true, unique: true},
//     password: { type: String, required: true },
//     updateFeeAuthority: {type: Boolean, required: true},
//     createFeeAuthority: {type: Boolean, required: true},
//     updateResidentAuthority: {type: Boolean, required: true},
//     isRoot: {type: Boolean, default: false},
// });

// const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

// export default adminModel


module.exports = (sequelize , DataTypes)=>{
    const Admin = sequelize.define('admin' , {
        admin_id : 
        {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : 
        {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },  

        password : 
        {
            type : DataTypes.STRING,
            allowNull : false
        },
        update_fee_authority : 
        {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false
        },
        create_fee_authority : 
        {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false
        },

        update_resident_authority : 
        {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false
        },

        is_root : 
        {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false
        },

        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },

        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Admin;
};
