import { render, fireEvent } from "@testing-library/react";
import Project from "./Project";

describe("Project component", () => {
  const project = {
    _id: 1,
    title: "Test project",
    hw1Count: 0,
    hw2Count: 0,
  };
  const currentId = 1;
  const setCurrentId = jest.fn();

  test("renders project title", () => {
    const { getByText } = render(
      <Project project={project} currentId={currentId} setCurrentId={setCurrentId} />
    );
    expect(getByText("Test project")).toBeInTheDocument();
  });

  test("handles check-in", () => {
    const { getByTestId } = render(
      <Project project={project} currentId={currentId} setCurrentId={setCurrentId} />
    );
    const text1 = getByTestId("text1");
    const text2 = getByTestId("text2");
    const checkInButton = getByTestId("check-in-button");

    fireEvent.change(text1, { target: { value: "2" } });
    fireEvent.change(text2, { target: { value: "3" } });
    fireEvent.click(checkInButton);

    expect(setCurrentId).toHaveBeenCalled();
  });

  test("handles check-out", () => {
    const { getByTestId } = render(
      <Project project={project} currentId={currentId} setCurrentId={setCurrentId} />
    );
    const text1 = getByTestId("text1");
    const text2 = getByTestId("text2");
    const checkOutButton = getByTestId("check-out-button");

    fireEvent.change(text1, { target: { value: "2" } });
    fireEvent.change(text2, { target: { value: "3" } });
    fireEvent.click(checkOutButton);

    expect(setCurrentId).toHaveBeenCalled();
  });

  test("handles join project", () => {
    const { getByTestId } = render(
      <Project project={project} currentId={currentId} setCurrentId={setCurrentId} />
    );
    const joinButton = getByTestId("join-button");

    fireEvent.click(joinButton);

    expect(setCurrentId).toHaveBeenCalled();
  });

  test("handles leave project", () => {
    const { getByTestId } = render(
      <Project project={project} currentId={currentId} setCurrentId={setCurrentId} />
    );
    const leaveButton = getByTestId("leave-button");

    fireEvent.click(leaveButton);

    expect(setCurrentId).toHaveBeenCalled();
  });
});
