import React, { useState, useEffect } from "react"
import { Box, Flex, Button, Text, Input, FormControl } from "@chakra-ui/react"
import DailyBox from "./daily-box"
import Current from "./current"
import ResponsiveBlock from "./shared/responsive-block"
import Rain from "~images/rain.jpg"
import Clouds from "~images/clouds.jpg"

const SevenDayForcast = () => {
    const [cityInput, setCityInput] = useState()
    const [cityDisplay, setCityDisplay] = useState("")
    const [data, setData] = useState<any>([])
    const [latData, setLatData] = useState<any>(30.45075)
    const [lonData, setLonData] = useState<any>(-91.154549)
    const [currentData, setCurrentData] = useState<any>([])
    const [currentWeather, setCurrentWeather] = useState<any>("")

    const Jsondata = require("../../data.json")

    useEffect(() => {
        for (var i = 0; i < Jsondata.length; i++) {
            var data = Jsondata[i]
            if (data.name == cityInput)
                return (
                    console.log("changed"),
                    setCityDisplay(data.name),
                    setLonData(Jsondata[i].coord.lon),
                    setLatData(Jsondata[i].coord.lat)
                )
        }
    }, [cityInput])

    //get forcast data
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latData}&lon=${lonData}&units=imperial&appid=539f07a626290bbc412db2236db4de1f`
        )
            .then(res => res.json())
            .then(
                result => {
                    setData(result.daily)
                },
                error => {
                    console.log(error)
                }
            )
    }, [cityDisplay])

    //get current data
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latData}&lon=${lonData}&units=imperial&appid=539f07a626290bbc412db2236db4de1f`
        )
            .then(res => res.json())
            .then(
                result => {
                    setCurrentData(result.current)
                    setCurrentWeather(result.current.weather[0])
                },
                error => {
                    console.log(error)
                }
            )
    }, [cityDisplay])

    if (cityDisplay == "")
        return (
            <Box>
                <Flex justify="flex-start" m={10}>
                    <Input
                        pr={20}
                        w="max-content"
                        placeholder="type city here"
                        onChange={(e: any) => {
                            setCityInput(e.target.value), console.log(cityInput)
                        }}
                        value={cityInput}
                    />
                </Flex>
            </Box>
        )
    else
        return (
            <Box>
                <Flex justify="flex-start" m={10}>
                    <Input
                        pr={20}
                        w="max-content"
                        placeholder="type city here"
                        onChange={(e: any) => {
                            setCityInput(e.target.value), console.log(cityInput)
                        }}
                        value={cityInput}
                    />
                </Flex>
                <ResponsiveBlock>
                    <Flex justify="center">
                        <Box>
                            <Text align="center" fontSize="40px" mb={10}>
                                {cityDisplay}
                            </Text>
                            <Current
                                day={currentData.dt}
                                temp={currentData.temp}
                                condition={currentWeather.description}
                                id={currentWeather.id}
                                feels_like={currentData.feels_like}
                                humidity={currentData.humidity}
                            />
                            <Text mt={4}>Daily:</Text>
                            <Flex
                                gridColumnGap={5}
                                direction={[
                                    "column",
                                    "column",
                                    "column",
                                    "row",
                                ]}
                            >
                                {data.map((item: any) => (
                                    <Box width="max-content" mt={4}>
                                        <DailyBox
                                            day={item.dt}
                                            high={parseInt(item.temp.max)
                                                .toFixed(0)
                                                .toString()}
                                            low={parseInt(item.temp.min)
                                                .toFixed(0)
                                                .toString()}
                                            chance_of_rain={item.pop}
                                        />
                                    </Box>
                                ))}
                            </Flex>
                            <Box align="center" py={20}></Box>
                        </Box>
                    </Flex>
                </ResponsiveBlock>
            </Box>
        )
}

export default SevenDayForcast
