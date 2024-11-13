'use client'
import { motion } from 'motion/react'

interface IphoneProps {
	backgroundColor?: string
	imageUrl?: string
}

export function Iphone({ backgroundColor = 'black', imageUrl }: IphoneProps) {
	return (
		<motion.div
			className="relative z-10 my-4 h-[868px] w-[428px]"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className={`relative z-30 h-[868px] w-[428px] rounded-[68px] border border-[#1B1721] ${backgroundColor} p-[19px] shadow-[inset_0_0_4px_2px_rgb(192,183,205),inset_0_0_0_6px_rgb(52,44,63)]`}>
				<div className="absolute top-[85px] left-0 z-20 h-[7px] w-5 bg-black/25" />
				<div className="absolute top-[85px] right-0 z-20 h-[7px] w-5 bg-black/25" />
				<div className="absolute bottom-[85px] left-0 z-20 h-[7px] w-5 bg-black/25" />
				<div className="absolute right-0 bottom-[85px] z-20 h-[7px] w-5 bg-black/25" />
				<div className="absolute top-0 right-[85px] z-20 h-5 w-[7px] bg-black/25" />
				<div className="absolute bottom-0 left-[85px] z-20 h-5 w-[7px] bg-black/25" />
				{/*  eslint-disable-next-line @next/next/no-img-element */}
				<img
					alt="iPhone screen"
					className="relative z-20 block h-full w-full rounded-[49px] bg-black bg-center bg-cover object-cover"
					src={imageUrl || "/day-3/default-screen.jpg"}
				/>
			</div>

			<div className="absolute top-[29px] left-1/2 z-40 ml-[-60px] flex h-[35px] w-[120px] items-center justify-end rounded-[20px] bg-black pr-4">
				<div
					className="size-2.5 rounded-full"
					style={{
						background:
							"radial-gradient(farthest-corner at 20% 20%,#6074bf 0,transparent 40%),radial-gradient(farthest-corner at 80% 80%,#513785 0,#24555e 20%,transparent 50%)",
					}}
				/>
			</div>
			<div className="absolute top-[115px] left-[-2px] h-[32px] w-[3px] rounded-[2px] bg-[#1B1721]" />
			<div className="absolute top-[200px] right-[-2px] h-[100px] w-[3px] rounded-[2px] bg-[#1B1721]" />
			<div className="absolute top-[180px] left-[-2px] h-[70px] w-[3px] rounded-[2px] bg-[#1B1721]" />
			<div className="absolute top-[270px] left-[-2px] h-[70px] w-[3px] rounded-[2px] bg-[#1B1721]" />
		</motion.div>
	)
} 