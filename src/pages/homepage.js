import { useEffect , useState } from "react"
import "./homepage.css"
import HeadLine from "../component/headline/headline"
import {Container, Col, Row} from "react-bootstrap"
import DataList from "../component/dataList/dataList"

export default function HomePage(){
    const rapidApiKey = process.env.REACT_APP_API_KEY
    const [lat , setLat] = useState(51.5)
    const [lon , setlon] = useState(-0.13)

    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const currentDate = `${year}-${month}-${day}`
    const [skyDate , setSkyDate] = useState(currentDate)

    const [sunPositions , setSunPositions] = useState("")

    useEffect(() => {
        const url = `https://sunset-time-sunrise-time-by-city-rest-api.p.rapidapi.com/bycoordinates?lat=${lat}&lon=${lon}&date=${skyDate}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'sunset-time-sunrise-time-by-city-rest-api.p.rapidapi.com'
            }
        }

        const fetchData = async() => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setSunPositions(result)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()

    }, [skyDate])

    return(
        <>
            <HeadLine />
            <Container>
                <Row>
                    <Col>
                        <h1>
                            HomePage
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label 
                            htmlFor = "datePicker"
                        >
                            Choose a date:
                        </label>
                        <input 
                            type="date"
                            name = "datePicker"
                            value = {skyDate}
                            onChange = {(e) => setSkyDate(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>
                            Result:
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { sunPositions &&
                            <DataList 
                               data = { sunPositions }
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}