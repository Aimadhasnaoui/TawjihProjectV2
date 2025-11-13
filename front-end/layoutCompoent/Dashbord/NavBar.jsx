import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import Image from "next/image";
export default function NavBar() {
  return (
    <div className='bg-white w-[80%] rounded-md'>
        <div className='w-[40%]'>
            <Search></Search>
            <Input></Input>
        </div>
    </div>
  )
}
