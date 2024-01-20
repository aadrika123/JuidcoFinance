"use strict";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class Dao {
  constructor() {
   ///////////
  }

  add = async () => {
    try {
      const newArtist = await prisma.user.create({
        data: {
          name: 'Osinachi Kalu',
          email: 'sinach22122@sinachmusic.com',
        },
      })
      return newArtist;
    } catch (error: any) {
      throw error;
    }
  };
}

export default Dao;
