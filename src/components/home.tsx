import React, { useState, useEffect } from "react"
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import DailyBox from "./daily-box"

const Home = () => {
    const [loaded, setIsLoaded] = useState(false)
    const [error, setError] = useState("")
    const [city, setCity] = useState("Baton Rouge")
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=30.4515&lon=-91.1871&units=imperial&appid=539f07a626290bbc412db2236db4de1f"
        )
            .then(res => res.json())
            .then(
                result => {
                    setIsLoaded(true)
                    console.log("********")
                    console.log(result)
                    setData(result.daily)
                    console.log("********")
                },
                error => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    return (
        <Flex justify="center">
            <Box>
                <Text align="center" fontSize="30px">
                    Weather Forecast for {city}
                </Text>
                <Flex
                    gridColumnGap={5}
                    direction={["column", "column", "column", "row"]}
                >
                    {data.map(item => (
                        <Box width="max-content">
                            <DailyBox
                                day={item.dt}
                                high={item.temp.max}
                                low={item.temp.min}
                                chance_of_rain={item.pop}
                            />
                        </Box>
                    ))}
                </Flex>
                {/* <DailyBox
                    date={new Date().toDateString()}
                    high="90"
                    low="70"
                    chance_of_rain="100%"
                /> */}
            </Box>
        </Flex>
    )
}

export default Home
