import { useEffect, useState, CSSProperties } from "react"

export const useAnimatedSale = (delay : number = 20, scGap : number = 0.01) => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    const [dir, setDir] = useState(1)
    return {
        scale, 
        start() {
            console.log("DIR", dir)
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (Math.abs(prev - scale) > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            setDir(d => d * -1)
                            return scale + dir 
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
    return [w, h]
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

export const useBlockRotStyle = (scale : number) => {
    const [w, h] = useDimension()
    const ds1 : number = divideScale(scale, 0, 2)
    const ds2 : number = divideScale(scale, 1, 2)
    const size : number = Math.min(w, h) / 10 
    const position = 'absolute'
    return {
        parentStyle() : CSSProperties {
            return {
                position, 
                left: `${w / 2}px`,
                top: `${h / 2}px`,
                transform: `rotate(${180 * ds2}deg)`
            }
        },
        blockStyle() : CSSProperties {
            const width = `${size}px`
            const height = `${size}px`
            const background = 'indigo'
            const top = `${-h / 2 + ((h * 0.5 - size) * ds1)}px`
            const left = `${-size}px`
            return {
                position, 
                top, 
                left, 
                width, 
                height, 
                background 
            }
        }
    }
}