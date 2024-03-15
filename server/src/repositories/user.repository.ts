//import User from '@/models/user.model'
import IUser from '../interfaces/user.interface';
import User from '../schemas/user.schema';

class UserRepository {
  public async findAll(): Promise<any[]> {
    const users = await User.find().populate({ path: 'roles', select: 'name' }).sort({ "timestamp": -1 });
    return users;
  }

  public async findById(id: any): Promise<IUser | null> {
    const user = await User.findById(id).select('-password');
    return user;
  }

  public async findbyRoleId(id: any): Promise<any> {
    const user = await User.find().where({roles:id});
    return user;
  }
  public async findByUsername(username: string): Promise<IUser | null> {
    const user = await User.findOne({ username }).select('-password');
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).select('-password');
    return user;
  }

  public async findByPhone(phone: string): Promise<IUser | null> {
    const user = await User.findOne({ phone }).select('-password');
    return user;
  }

  public async findByIdWithPassword(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user;
  }

  public async findByUsernameWithPassword(
    username: string,
  ): Promise<IUser | null> {
    const user = await User.findOne({ username });
    return user;
  }

  public async findByEmailWithPassword(
    username: string,
  ): Promise<IUser | null> {
    //const user = await User.findOne({ email })
    const user = await User.findOne({
      $or: [
        { email: username },
        { username: username }
      ]
    });
    return user;
  }

  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<IUser | null> {
    const user = await User.findOne({ phone });
    return user;
  }


  public async createUser(user: any): Promise<IUser> {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  }

  public async updateUser(users: any, userId: any): Promise<any> {

    const updateUsers = await User.findByIdAndUpdate(
      userId,
      { $set: users },
      { "upsert": true }

    ).select({});
    return updateUsers;
  }

  public async updateAgencyUserDocument(documentId: string, userId: string): Promise<any> {
    const update = {};
    update["imageUpload"] = documentId;

    const updateAgencyUser = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { "upsert": true }

    ).select({});
    return updateAgencyUser;
  }

  public async deleteUser(userId: any): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(userId).exec();
    return user;
  }
}

export default UserRepository;
