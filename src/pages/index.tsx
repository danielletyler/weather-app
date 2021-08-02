import React, { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import ResponsiveBlock from "~components/shared/responsive-block"
import Home from "~components/home"

const IndexPage = () => {
    return (
        <Box>
            <ResponsiveBlock>
                <Box p={20}>
                    <Home />
                </Box>
            </ResponsiveBlock>
        </Box>
    )
}

export default IndexPage
