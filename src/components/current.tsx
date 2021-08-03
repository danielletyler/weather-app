import React, { useState, useEffect } from "react"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import moment from "moment"
import WeatherIcon from "./icon"

const Current: React.FC<{
    day: string
    temp: string
    condition: string
    id: string
    feels_like: string
    humidity: string
}> = ({ day, temp, condition, id, feels_like, humidity }) => {
    const dateTimeString = moment.unix(parseInt(day)).format("MM-DD-YYYY")
    const finalDate = new Date(dateTimeString).toDateString().slice(0, 10)

    //get correct icon
    const id_mid = "" + id
    const id_string = id_mid.charAt(0)

    return (
        <Flex justify="center">
            <Flex direction="column" align="center">
                <Flex gridColumnGap={10} justify="center">
                    <Flex h="100%" mt={2}>
                        <WeatherIcon
                            id_mid={id_mid}
                            id_string={id_string}
                            color="black"
                        />
                    </Flex>
                    <Flex direction="column" justify="space-around">
                        <Text fontSize="50px">
                            {parseInt(temp).toFixed(0)}°
                        </Text>
                    </Flex>
                </Flex>
                <Text mb={4} fontSize="30px">
                    {condition}
                </Text>
                <Flex justify="center" gridColumnGap={10}>
                    <Text>Feels like: {parseInt(feels_like).toFixed(0)}° </Text>
                    <Text>Humidity: {humidity}%</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Current
