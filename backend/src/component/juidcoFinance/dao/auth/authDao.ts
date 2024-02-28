import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import Middleware from "../../middleware/middleware";

const prisma = new PrismaClient();

class AuthDao {
  private middleware: Middleware;
  constructor() {
    this.middleware = new Middleware();
  }

  login = async (credentials: any) => {
    const { password, user_id, designation_id } = credentials;
    const employee = await prisma.employees.findFirst({
      where: { user_id, designation_id },
      select: {
        id: true,
        user_id: true,
        name: true,
        email: true,
        password: true,
        designation: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!employee) {
      return generateRes(employee);
    }

    if (employee.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...others } = employee;
      const token = this.middleware.jwtSign(others);

      return generateRes({ ...others, token });
    }
  };
}

export default AuthDao;
