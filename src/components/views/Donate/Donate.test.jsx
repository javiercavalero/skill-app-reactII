import { render, screen } from "@testing-library/react"
import { Donate } from "./Donate";

describe("renderizado en donate", () => {
    it("renderiza un h1", () => {
    render(<Donate />) 

    expect(screen.getByRole("heading", { level:1, name:"Collaborate with the project" })).toBeInTheDocument()
   
})

it("renderiza un a", () => {

    render(<Donate />) 
expect(screen.getByRole("link")).toHaveAttribute("href", "https://mpago.la/2FHmR9W")

}) 
})

