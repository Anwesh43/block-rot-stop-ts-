import { useBlockRotStyle } from "./hooks"
import withContext from "./withContext"
interface BRSProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void, 
}
const BlockRotStop = (props : BRSProps) => {
    const {parentStyle, blockStyle} = useBlockRotStyle(props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {blockStyle()}>
            </div>
        </div>
    )
}

export default withContext(BlockRotStop)