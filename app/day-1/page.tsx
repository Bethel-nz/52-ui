"use client"
import React from 'react'
import { Loader } from './_components'
import { useLoader } from './_components/LoaderContext'
import Navbar from './_components/navbar'

export default function Page() {
	const { isLoading } = useLoader()
	return (
		<div className='h-dvh flex flex-col justify-between bg-white'>
			<div>
				<Loader />
				{!isLoading && <Navbar />}
			</div>
			<h1 className='text-4xl font-bold px-96 text-black'>
				Sōga: A tapestry of elegance, where traditional grace meets contemporary flair on the runway of Japanese fashion
			</h1>
			<div />
			<div className='px-16  '>
				<div className='bg-gray-300 w-full h-96 rounded-t-lg'></div>
			</div>
		</div>
	)
}
