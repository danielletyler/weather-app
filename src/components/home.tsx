import React, { useState, useEffect } from "react"
import { Box, Flex, Button, Text, Input, FormControl } from "@chakra-ui/react"
import DailyBox from "./daily-box"
import Current from "./current"
import ResponsiveBlock from "./shared/responsive-block"
import Rain from "~images/rain.jpg"
import Clouds from "~images/clouds.jpg"
import Clear from "~images/clear.jpg"
import Snowing from "~images/snowing.jpg"
import Storm from "~images/storm.jpg"
import Fog from "~images/fog.jpg"

const SevenDayForcast = () => {
    const [bgimage, setBgimage] = useState("")
    const [cityInput, setCityInput] = useState()
    const [cityDisplay, setCityDisplay] = useState("")
    const [data, setData] = useState<any>([])
    const [latData, setLatData] = useState<any>(30.45075)
    const [lonData, setLonData] = useState<any>(-91.154549)
    const [currentData, setCurrentData] = useState<any>([])
    const [currentWeather, setCurrentWeather] = useState<any>("")
    const [getImage, setGetImage] = useState(false)

    const Jsondata = require("../../data.json")
    const BigJsonData = require("../../city.list.json")

    useEffect(() => {
        for (var i = 0; i < BigJsonData.length; i++) {
            var data = BigJsonData[i]
            var dataCity = data.name
            var dataState = data.state
            var location = dataCity + ", " + dataState
            if (location == cityInput)
                return (
                    console.log("changed"),
                    setCityDisplay(data.name + ", " + data.state),
                    setLonData(BigJsonData[i].coord.lon),
                    setLatData(BigJsonData[i].coord.lat)
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
                    setGetImage(!getImage)
                },
                error => {
                    console.log(error)
                }
            )
    }, [cityDisplay])

    const id_mid = "" + currentWeather.id
    const id_string = id_mid.charAt(0)

    //get correct bg image
    useEffect(() => {
        if (id_string == "8") {
            if (id_mid == "800") return setBgimage(Clear)
            else return setBgimage(Clouds)
        }
        if (id_string == "7") return setBgimage(Fog)
        if (id_string == "6") return setBgimage(Snowing)
        if (id_string == "5") return setBgimage(Rain)
        if (id_string == "3") return setBgimage(Rain)
        if (id_string == "2") return setBgimage(Storm)
        else return setBgimage("default")
    }, [getImage])

    if (cityDisplay == "")
        return (
            <Box>
                <Flex justify="flex-start" m={10}>
                    <Input
                        color="white"
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
                <Flex justify="flex-start" mx={10} my={5}>
                    <Input
                        color="white"
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
                            <Box
                                backgroundImage={`url(${bgimage})`}
                                bgPosition="top"
                                bgSize="cover"
                                borderRadius="xl"
                                overflow="clip"
                            >
                                <Box
                                    mt={10}
                                    mb={20}
                                    py={7}
                                    bg="rgba(255, 255, 255, 0.30)"
                                >
                                    <Text
                                        color="black"
                                        align="center"
                                        fontSize="40px"
                                        mb={5}
                                    >
                                        {cityDisplay}
                                    </Text>
                                    <Current
                                        day={currentData.dt}
                                        temp={currentData.temp}
                                        condition={currentWeather.description}
                                        id={currentWeather.id}
                                        feels_like={currentData.feels_like}
                                        humidity={currentData.humidity}
                                        color="black"
                                    />
                                </Box>
                            </Box>
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
                                            color="white"
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
