"use client"
import { SignUp, useUser } from '@clerk/nextjs'
export const user = () => {
    const { user } = useUser()

    return { datauser : user }
}