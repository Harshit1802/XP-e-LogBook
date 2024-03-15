import IPlant from "../interfaces/plant.interface";
import Plant from "../schemas/plant.schema";

class CommonRepository {
    public async getPlant(): Promise<IPlant[]> {
        const getPlant = await Plant.find().sort({ timestamp: -1 });
        return getPlant;
    }
    public async findByPlantId(plantId: any): Promise<IPlant | null> {
        const plant = await Plant.findById(plantId);
        return plant;
    }
    public async findByPlantName(name: any): Promise<any> {
        const role = await Plant.find()
            .where({ name: name })
            .sort({ timestamp: -1 })
            .select('_id');
        return role;
    }
    public async createPlant(plant: IPlant): Promise<any> {
        const createPlant = new Plant(plant);
        const savedPlant = await createPlant.save();
        return savedPlant;
    }

    public async updatePlant(Plant: any, plantId: any): Promise<any> {
        const updatePlant = await Plant.findByIdAndUpdate(
            plantId,
            { $set: Plant },
            { upsert: true },
        ).select({});
        return updatePlant;
    }

    public async deletePlant(plantId: any): Promise<IPlant | null> {
        const deletePlant = await Plant.findByIdAndDelete(plantId);
        return deletePlant;
    }
}
export default CommonRepository;
