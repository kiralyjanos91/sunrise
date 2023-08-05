import "./dataList.css"
import { Col , Row } from "react-bootstrap"

export default function DataList({data}){
    const lister = (orb,index) => {
        const liEls = Object.keys(data[orb]).map((key,i) => {
            const formattedKey = key.replace(/([A-Z])/g, ' $1')
            return (
                <li
                    key = {i}
                >
                    <p
                        className = "list-keys"
                    >
                        {`${formattedKey}:`}
                    </p>
                    <p>
                        {`${new Date(data[orb][key])}`}
                    </p>
                </li>
            )
        }) 
        return (
            <Col
                key = {index}
            >
                <p
                    className = "orb-name"
                >
                    {orb}:
                </p>
                <ul>
                    {liEls}
                </ul>    
            </Col>
        )
    }

    const positionsList = data ? 
        Object.keys(data).map((key,i) => {
            return (
                lister(key,i)
            )
        })
    :
        ""
    
    return(
        <Row> 
            { positionsList }
        </Row>
    )
}