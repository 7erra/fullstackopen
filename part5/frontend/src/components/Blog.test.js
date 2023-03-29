import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

let container
beforeEach(() => {
  const blog = {
    author: "University of Helsinki",
    title: "Fullstackopen",
    url: "fullstackopen.com",
    likes: 0,
  }
  container = render(<Blog blog={blog} />).container
})

test("Only title and author shown by default", () => {
  for (const elemClass of [".blog-url", ".blog-likes"]) {
    const element = container.querySelector(elemClass)
    expect(element).toHaveStyle("display: none")
  }
  for (const elemClass of [".blog-title", ".blog-author"]) {
    const element = container.querySelector(elemClass)
    expect(element).not.toHaveStyle("display: none")
  }
})

test("Show URL and likes when \"Show\" button is pressed", async () => {
  const user = userEvent.setup()
  const button = screen.getByText("View")
  await act(async () => {
    await user.click(button)
  })
  const element = container.querySelector(".blog-url")
  expect(element).not.toHaveStyle("display: none")
})
