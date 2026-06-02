import React from 'react'
import { NavBar } from '../components/v-navbar'
import { PostsCreator } from '../components/posts-creator'
import { PostsDisplay } from '../components/posts-display'

export const Home = ({ user, setUser }) => {
  return (
    <div className='flex justify-center h-screen'>
      <div id='home-display'>
        <PostsCreator></PostsCreator>
      </div>
    </div>
  )
}
