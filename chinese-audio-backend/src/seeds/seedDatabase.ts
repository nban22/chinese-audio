import { syncModels } from "../models";
import sequelize from "../models/connection";
import { albumSeeder } from "../seeders/albumSeeder";


const seedDatabase = async () => {
    try {
        await syncModels();
        await sequelize.drop();
        await sequelize.sync({ force: true });    
        
        await albumSeeder();
        
        console.log("Database seeded successfully");

    } catch (error) {
        console.error("Error in seedDatabase", error);
        throw error;
    }
}

seedDatabase();