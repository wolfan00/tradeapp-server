import React from "react"
import { Button } from "@adminjs/design-system"

const CustomNavbar = () => {
  const goTo = (url) => {
    window.location.href = url
  }

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button onClick={() => goTo("/admin/resources/Product/actions/new")}>
        + Ürün Ekle
      </Button>

      <Button variant="danger" onClick={() => goTo("https://discord.gg/xyz")}>
        Discord
      </Button>
    </div>
  )
}

export default CustomNavbar
