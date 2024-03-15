import Iplant from '../interfaces/plant.interface';
import IUser from '../interfaces/user.interface';
import CommonRepository from '../repositories/common.repository';
class CommonService {
    private commonRepository: CommonRepository;
    constructor() {
        this.commonRepository = new CommonRepository();
    }

    public async getplant() {
        const getplant = await this.commonRepository.getPlant();
        return getplant;
    }
    public async createplant(plant: Iplant): Promise<any> {
        const savedplant = await this.commonRepository.createPlant(plant);
        return savedplant;
    }
    public async findByPlantId(id: any): Promise<any> {
        const plant = await this.commonRepository.findByPlantId(id);
        return plant;
    }
    public async findByName(name: any): Promise<any> {
        const plant = await this.commonRepository.findByPlantName(name);
        return plant;
    }
    public async updateplant(plant: any, plantId: any): Promise<any> {
        const updateplant = await this.commonRepository.updatePlant(
            plant,
            plantId,
        );
        return updateplant;
    }

    public async deleteplant(plantId: any): Promise<any> {
        const deleteplant = await this.commonRepository.deletePlant(plantId);
        return deleteplant;
    }
}
export default CommonService;
