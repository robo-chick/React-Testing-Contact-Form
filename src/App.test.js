import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm';

test("renders App without crashing", () => {
 render(<App />);
});

test('finds input label', () => {
  const { getByText } = render(<ContactForm />);
  const form = getByText(/message/i);
  expect(form).toBeInTheDocument();
});

test('message field functionality', () => {
  const { getByTestId } = render(<ContactForm />);
  const message = getByTestId(/message/i);
  fireEvent.change(message, {target: {value: 'Hello'}});
  expect(message.value).toBe('Hello');
});

test('first name input field', () => {
  const { getByTestId } = render(<ContactForm />);
  const input = getByTestId(/firstname/i);
  fireEvent.change(input, {target: {value: 'Tasha'}});
  expect(input.value).toBe('Tasha');
});

test('submit button function', () => {
  const { getByTestId, getByRole } = render(<ContactForm />);
  const onSubmit = getByTestId(/submit/i);
  fireEvent.click(getByRole('submit'), onSubmit);
});

test('check first name maxLength', async () => {
  const { getByTestId, queryByText } = render(<ContactForm />);
  const firstName = getByTestId(/firstname/i);
  const error = queryByText(/error/i);

  fireEvent.change(firstName, {target: {value: 'tasha'}});

  await waitFor(() => {
    expect(queryByText(/error/i));
  })
});











