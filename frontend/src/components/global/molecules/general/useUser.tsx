'use client'
import {useEffect, useState } from 'react';
import {User} from 'jflib';
import { useSelector } from 'react-redux';


export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  const userData = useSelector((state: any) => state?.user?.user?.userData);

  console.log("first", userData)
  useEffect(()=>{
    if (userData) {
      const newUser = new User(userData);
      setUser(newUser);
    }
  }, []);
  

  return user;
}