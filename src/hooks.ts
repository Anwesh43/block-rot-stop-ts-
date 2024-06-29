import { useEffect, useState } from "react"

export const useAnimatedSale = (delay : number = 20, scGap : number = 0.01) => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    const [dir, setDir] = useState(1);
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            setDir(dir => dir * -1)
                            return 0
                        }
                        return prev + scGap * dir  
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        const resizeListener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', resizeListener, false)
        return () => {
            window.removeEventListener('resize', resizeListener, false)
        }
    }, [])
}