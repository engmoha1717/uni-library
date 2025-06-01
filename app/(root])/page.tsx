import BookList from '@/components/BookList'
import BookOverOview from '@/components/BookOverOview'
import { sampleBooks } from '@/constants'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import React from 'react'

const Home = async() => {
  const results = await db.select().from(users)
   console.log(JSON.stringify(results , null , 2))
   
  return (
    <>
    <BookOverOview  userId='1'  {...sampleBooks[0]} />

    <BookList
    title="Latest Books"
    books={sampleBooks}
     containerClassName="mt-28"
    />

    </>
  )
}

export default Home 