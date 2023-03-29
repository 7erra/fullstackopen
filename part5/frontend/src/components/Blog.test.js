import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

const testBlog = {
  author: "University of Helsinki",
  title: "Fullstackopen",
  url: "fullstackopen.com",
  likes: 0,
}

test("Only title and author shown by default", () => {
  const container = render(<Blog blog={testBlog} />).container
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
  const container = render(<Blog blog={testBlog} />).container
  const user = userEvent.setup()
  const button = screen.getByText("View")
  await act(async () => {
    await user.click(button)
  })
  const element = container.querySelector(".blog-url")
  expect(element).not.toHaveStyle("display: none")
})

test("Call like twice", async () => {
  const mockHandler = jest.fn()
  const testContainer = render(<Blog blog={testBlog} fLike={mockHandler} />)
  const user = userEvent.setup()
  const button = testContainer.getByText("Like")
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test("Correct params on new blog", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog} />)
  const inputTitle = screen.getByPlaceholderText("title", { exact: false })
  const inputAuthor = screen.getByPlaceholderText("author", { exact: false })
  const inputURL = screen.getByPlaceholderText("URL", { exact: false })
  await act(async () => {
    await user.type(inputTitle, testBlog.title)
    await user.type(inputAuthor, testBlog.author)
    await user.type(inputURL, testBlog.url)
    const sendButton = screen.getByText("Add Blog")
    await user.click(sendButton)
  })
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(testBlog).toMatchObject(createBlog.mock.calls[0][0])

})
