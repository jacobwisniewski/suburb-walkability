import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "../data-source";

dotenv.config();

export const initializeAppDataSource = async (): Promise<void> => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.error("Failed to initialize data source:", error);
    }
  }
};