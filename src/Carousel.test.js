import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import '@testing-library/jest-dom/extend-expect'

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it('renders wihtout crashing' , () => {
  render(<Carousel />);
})

it('matches snapshot' , () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it('goes to previous image when the left arrow is clicked' , function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

     // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backwards to previous page when left arrow is clicked
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the first image to show , but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it('removes the left arrow button when on the first image and removes the righ arrow button when on the last image' , () => {
  const {queryByTestId , queryByAltText } = render(<Carousel />);

  const leftArrow = queryByTestId('left-arrow');
  const rightArrow = queryByTestId('right-arrow');

  // expect the first image to show, but the left arrow to not show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument();

  // go forward to second picture

  fireEvent.click(rightArrow);
  const leftArrow_two = queryByTestId('left-arrow');
  // expect both arrow buttons to show when on the second image
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(leftArrow_two).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();

  // go forward to last picture
  fireEvent.click(rightArrow);

  // expect the last image to show, but the right arrow to not show
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();

})