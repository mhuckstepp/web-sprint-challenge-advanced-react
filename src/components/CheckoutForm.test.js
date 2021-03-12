import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  //   render and find checkout form header in the document
  render(<CheckoutForm />);
  const header = screen.queryByText(/checkout form/i);
  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);
  //   Grab each input and button
  const fNameInp = screen.getByLabelText(/first name/i);
  const lNameInp = screen.getByLabelText(/last name/i);
  const addressInp = screen.getByLabelText(/address/i);
  const cityInp = screen.getByLabelText(/city/i);
  const stateInp = screen.getByLabelText(/state/i);
  const zipInp = screen.getByLabelText(/zip/i);
  const submitButton = screen.getByRole("button");
  //   Type each input and click button
  userEvent.type(fNameInp, "Maxie");
  userEvent.type(lNameInp, "Huckey");
  userEvent.type(addressInp, "1000 bead street");
  userEvent.type(cityInp, "SF");
  userEvent.type(stateInp, "CA");
  userEvent.type(zipInp, "94105");
  userEvent.click(submitButton);
  //   check success message exists
  const successMessage = await screen.getByText(/woo-hoo/i);
  expect(successMessage).toBeInTheDocument();
});
