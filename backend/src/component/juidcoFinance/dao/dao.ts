"use strict";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class Dao {
  constructor() {
   ///////////
  }

  add = async () => {
    try {
      const newArtist = await prisma.account_code.create({
        data: {},
      })
      return newArtist;
    } catch (error: any) {
      throw error;
    }
  };
}

export default Dao;
