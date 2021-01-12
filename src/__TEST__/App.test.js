import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

import testCases from "./fixtures/test-cases";

testCases.forEach(([description, instructions, output]) => {
  test(`${description}`, async () => {
    render(<App timeout={0} />);

    userEvent.type(screen.getByTestId("instructions"), instructions);

    const logElem = screen.getByRole("log");
    expect(logElem).toHaveTextContent("idle");

    fireEvent.click(screen.getByText("SEND INSTRUCTIONS"));

    await waitFor(() => expect(logElem).toHaveTextContent("processing"));
    await waitFor(() => expect(logElem).toHaveTextContent("idle"), {
      timeout: 3000,
    });

    expect(screen.getByTestId("output")).toHaveValue(output);
  });
});
