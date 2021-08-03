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
}> = ({ day, high, low, chance_of_rain }) => {
    const [b, setb] = useState("transparent")

    //date conversion
    const dateTimeString = moment.unix(parseInt(day)).format("MM-DD-YYYY")
    // console.log(dateTimeString)
    const finalDate = new Date(dateTimeString).toDateString().slice(0, 10)
    // console.log(format(new Date(), "MM-dd-yyyy"))

    useEffect(() => {
        if (dateTimeString == format(new Date(), "MM-dd-yyyy"))
            setb("1px solid white")
    }, [])

    return (
        <Box border={b} borderRadius="xl" p={4}>
            <Flex direction="column" gridRowGap={2}>
                <Text fontWeight={700} color="black">
                    {finalDate}
                </Text>
                <Flex gridColumnGap={2}>
                    <Text fontWeight={600}> {high} °F</Text>
                    <Text>{low} °F</Text>
                </Flex>
                <Flex gridColumnGap={1} justify="center">
                    <Icon
                        color="black"
                        mt={1}
                        fontSize="15px"
                        as={GiWaterDrop}
                    />
                    <Text>
                        {(parseFloat(chance_of_rain) * 100).toFixed(0)}%
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default DailyBox
