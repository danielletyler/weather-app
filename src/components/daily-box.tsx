import React from "react"
import { Box, Flex, Text } from "@chakra-ui/layout"
import moment from "moment"

const DailyBox: React.FC<{
    day: string
    high: string
    low: string
    chance_of_rain: string
}> = ({ day, high, low, chance_of_rain }) => {
    //date conversion
    const dateTimeString = moment.unix(parseInt(day)).format("MM-DD-YYYY")
    const finalDate = new Date(dateTimeString).toDateString()

    return (
        <Box>
            <Flex direction="column" gridRowGap={2}>
                <Text color="black">{finalDate}</Text>
                <Text>High: {high} °F</Text>
                <Text>Low: {low} °F</Text>
                <Text>
                    Rain: {(parseFloat(chance_of_rain) * 100).toFixed(0)}%
                </Text>
            </Flex>
        </Box>
    )
}

export default DailyBox
