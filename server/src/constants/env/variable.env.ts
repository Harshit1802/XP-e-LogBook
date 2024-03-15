import 'dotenv/config';
import validate from '../../validations/variable.validation';
//import validate from '../validations/variable.validation';



class Variable {
  public static readonly NODE_ENV: string = 'development'

  public static readonly PORT: number = Number(3000)!

  public static readonly DATABASE_URL: string = 'mongodb+srv://Harshitbhawsar110:xenpark@harshitbhawsar.o17jjht.mongodb.net/?retryWrites=true&w=majority'

  public static readonly JWT_SECRET: string = 'secret'

  public static readonly PASS_SECRET: string = 'secret'

  constructor() {
    this.initialise()
  }

  private initialise(): void {
    validate()
  }
}

export default Variable
