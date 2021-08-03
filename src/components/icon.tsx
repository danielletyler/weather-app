import React from "react"
import { Icon } from "@chakra-ui/react"
import {
    FaSnowflake,
    FaBan,
    FaCloudRain,
    FaCloudSunRain,
    FaCloudShowersHeavy,
    FaCloud,
    FaSun,
} from "react-icons/fa"
import { WiFog } from "react-icons/wi"

const WeatherIcon: React.FC<{
    id_mid: string
    id_string: string
    color: string
}> = ({ id_mid, id_string, color }) => {
    if (id_string == "8") {
        if (id_mid.trim() == "800")
            return <Icon fontSize="50px" color={color} as={FaSun} />
        else return <Icon fontSize="50px" color={color} as={FaCloud} />
    }
    if (id_string == "7")
        return <Icon fontSize="50px" color={color} as={WiFog} />
    if (id_string == "6")
        return <Icon fontSize="50px" color={color} as={FaSnowflake} />
    if (id_string == "5")
        return <Icon fontSize="50px" color={color} as={FaCloudRain} />
    if (id_string == "3")
        return <Icon fontSize="50px" color={color} as={FaCloudSunRain} />
    if (id_string == "2")
        return <Icon fontSize="50px" color={color} as={FaCloudShowersHeavy} />
    else return <Icon fontSize="50px" color={color} as={FaBan} />
}

export default WeatherIcon
