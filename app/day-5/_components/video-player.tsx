'use client'
import { useEffect, useRef, useState } from "react"

interface VideoPlayerControlsProps {
	progress: number
	size?: number
	width?: number
	isPaused: boolean
	onPlayPause: () => void
}

function VideoPlayerControls({
	progress,
	size = 48,
	width = 3,
	isPaused,
	onPlayPause,
}: VideoPlayerControlsProps) {
	const center = size / 2
	const radius = center - width
	const dashArray = 2 * Math.PI * radius
	const dashOffset = dashArray * (1 - progress)

	return (
		<div className="flex relative justify-center items-center">
			<svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill="transparent"
					stroke="#aaaaaa"
					strokeWidth={width}
				/>
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill="transparent"
					stroke="#ffffff"
					strokeWidth={width}
					strokeDasharray={dashArray}
					strokeDashoffset={dashOffset}
					strokeLinecap="round"
				/>
			</svg>
			<button
				className="flex absolute justify-center items-center cursor-pointer group"
				onClick={onPlayPause}
			>
				<div className="fill-white group-hover:fill-[#aaaaaa] transition-colors duration-200">
					{isPaused ? (
						<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.13275 16.0002C2.51033 16.0002 2.83127 15.8492 3.20886 15.6321L14.2154 9.2698C14.9988 8.80726 15.2726 8.5052 15.2726 8.0049C15.2726 7.5046 14.9988 7.20254 14.2154 6.74944L3.20886 0.377746C2.83127 0.160637 2.51033 0.019043 2.13275 0.019043C1.43422 0.019043 1 0.547657 1 1.3689V14.6409C1 15.4621 1.43422 16.0002 2.13275 16.0002Z" />
						</svg>
					) : (
						<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.29883 15.9082H5.52539C6.375 15.9082 6.82422 15.459 6.82422 14.5996V1.29883C6.82422 0.410156 6.375 0 5.52539 0H3.29883C2.44922 0 2 0.449219 2 1.29883V14.5996C2 15.459 2.44922 15.9082 3.29883 15.9082ZM10.3984 15.9082H12.6152C13.4746 15.9082 13.9141 15.459 13.9141 14.5996V1.29883C13.9141 0.410156 13.4746 0 12.6152 0H10.3984C9.53906 0 9.08984 0.449219 9.08984 1.29883V14.5996C9.08984 15.459 9.53906 15.9082 10.3984 15.9082Z" />
						</svg>
					)}
				</div>
			</button>
		</div>
	)
}

export function VideoPlayer() {
	const [videoProgress, setVideoProgress] = useState<number>(0)
	const [videoDuration, setVideoDuration] = useState<number>()
	const [isPaused, setIsPaused] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = videoRef.current
		if (video) {
			setVideoDuration(video.duration)
		}
	}, [])

	useEffect(() => {
		if (isPaused) return
		const currentTime = videoRef.current?.currentTime
		if (videoDuration != null && currentTime != null) {
			const loadingTimeout = setTimeout(() => {
				if (videoProgress == currentTime / videoDuration) {
					setVideoProgress((prev) => prev + 0.000001)
				} else {
					setVideoProgress(currentTime / videoDuration)
				}
			}, 10)

			return () => {
				clearTimeout(loadingTimeout)
			}
		}
	}, [videoProgress, videoDuration, isPaused])

	const togglePlayPause = () => {
		const video = videoRef.current
		if (video) {
			setIsPaused(!video.paused)
			if (video.paused) {
				video.play()
			} else {
				video.pause()
			}
		}
	}

	return (
		<div className="overflow-hidden relative w-full rounded-2xl bg-neutral-900">
			<div className="absolute top-4 right-4 z-10">
				<VideoPlayerControls
					progress={videoProgress}
					isPaused={isPaused}
					onPlayPause={togglePlayPause}
				/>
			</div>
			<video
				className="w-full"
				ref={videoRef}
				loop
				muted
				autoPlay
				playsInline
			>
				<source src="/prism-reel.mp4" />
			</video>
		</div>
	)
} 