import { syncModels } from "../models";
import sequelize from "../models/connection";
import { albumSeeder } from "./albumSeeder";
import { seriesSeeder } from "./seriesSeeder";


const seedDatabase = async () => {
    try {
        await syncModels();
        await sequelize.drop();
        await sequelize.sync({ force: true });    
        
        await albumSeeder();
        await seriesSeeder();
        
        console.log("Database seeded successfully");

    } catch (error) {
        console.error("Error in seedDatabase", error);
        throw error;
    }
}

seedDatabase();