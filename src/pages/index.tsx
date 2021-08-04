import React, { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import ResponsiveBlock from "~components/shared/responsive-block"
import SevenDayForcast from "~components/home"
import Nav from "~components/nav"

const IndexPage = () => {
    return (
        <Box h="100vh" bg="#2d3033">
            <Nav />
            <Box>
                <SevenDayForcast />
            </Box>
        </Box>
    )
}

export default IndexPage
