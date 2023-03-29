import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"

import Blog from "./Blog"

test("Only title and author shown by default", () => {
  const blog = {
    author: "University of Helsinki",
    title: "Fullstackopen",
    url: "fullstackopen.com",
    likes: 0,
  }
  const { container } = render(<Blog blog={blog} />)

  for (const elemClass of [".blog-url", ".blog-likes"]) {
    const element = container.querySelector(elemClass)
    expect(element).toHaveStyle("display: none")
  }
  for (const elemClass of [".blog-title", ".blog-author"]) {
    const element = container.querySelector(elemClass)
    expect(element).not.toHaveStyle("display: none")
  }
})
