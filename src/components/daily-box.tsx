import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/layout"
import moment from "moment"
import { format } from "date-fns"
import { useEffect } from "react"
import { GiWaterDrop } from "react-icons/gi"
import { Icon } from "@chakra-ui/react"

const DailyBox: React.FC<{
    day: string
    high: string
    low: string
    chance_of_rain: string
    color: string
}> = ({ day, high, low, chance_of_rain, color }) => {
    const [b, setb] = useState("transparent")

    //date conversion
    const dateTimeString = moment.unix(parseInt(day)).format("MM-DD-YYYY")
    // console.log(dateTimeString)
    const finalDate = new Date(dateTimeString).toDateString().slice(0, 10)
    // console.log(format(new Date(), "MM-dd-yyyy"))

    useEffect(() => {
        if (dateTimeString == format(new Date(), "MM-dd-yyyy"))
            setb("rgba(255, 255, 255, 0.25)")
    }, [])

    return (
        <Box bg={b} borderRadius="xl" p={4}>
            <Flex direction="column" gridRowGap={2}>
                <Text fontWeight={700} color={color}>
                    {finalDate}
                </Text>
                <Flex gridColumnGap={2}>
                    <Text color={color} fontWeight={600}>
                        {" "}
                        {high} °F
                    </Text>
                    <Text color={color}>{low} °F</Text>
                </Flex>
                <Flex gridColumnGap={1} justify="center">
                    <Icon
                        color={color}
                        mt={1}
                        fontSize="15px"
                        as={GiWaterDrop}
                    />
                    <Text color={color}>
                        {(parseFloat(chance_of_rain) * 100).toFixed(0)}%
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default DailyBox
