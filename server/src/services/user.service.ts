
import IUser from '../interfaces/user.interface';
import UserRepository from '../repositories/user.repository';
import UserSecurity from '../security/user.security';

class UserService {
  private userRepository: UserRepository;
  private userSecurity: UserSecurity;

  constructor() {
    this.userRepository = new UserRepository();
    this.userSecurity = new UserSecurity();
  }

  public comparePassword(password: string, encryptedPassword: string): boolean {
    return this.userSecurity.comparePassword(password, encryptedPassword);
  }

  public async findAll(): Promise<any> {
    const users = await this.userRepository.findAll();
    return users;
  }

  public async findById(id: any): Promise<any> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  public async findbyRoleId(id: any): Promise<IUser> {
    const user = await this.userRepository.findbyRoleId(id);
    return user;
  }
  public async createUser(user: any): Promise<any> {
    const savedUser =   await this.userRepository.createUser(user);
    return savedUser;
  }

  public async updateUser(user: any, userId: any): Promise<any> {
    const updateUser = await this.userRepository.updateUser(user, userId);
    return updateUser;
  }

  public async updateAgencyUserDocument(docs: any, userId: any): Promise<any> {
    const updateUser = await this.userRepository.updateAgencyUserDocument(docs, userId);
    return updateUser;
  }

  public async deleteUser(userId: any): Promise<any> {
    const user = await this.userRepository.deleteUser(userId);
    return user;
  }
}

export default UserService;
