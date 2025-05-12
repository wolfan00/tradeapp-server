import React from "react"
import { Header, Box, H2 } from "@adminjs/design-system"
import CustomNavbar from "./CustomNavbar"

const CustomLayout = (props) => {
  return (
    <>
      <Header>
        <Box flex justifyContent="space-between" alignItems="center" px="xl" py="lg">
          <H2>Takascı Admin Panel</H2>
          <CustomNavbar />
        </Box>
      </Header>
      {props.children}
    </>
  )
}

export default CustomLayout
