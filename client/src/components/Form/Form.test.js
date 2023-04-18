describe("Form", () => {
    it("should render form elements correctly", () => {
      render(<Form />);
      expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Creator")).toBeInTheDocument();
      expect(screen.getByLabelText("Description")).toBeInTheDocument();
      expect(screen.getByLabelText("Tags")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });
  
    it("should call handleSubmit function when form is submitted", () => {
      const dispatchMock = jest.fn();
      jest.mock("react-redux", () => ({
        useDispatch: () => dispatchMock,
        useSelector: () => {},
      }));
  
      render(<Form />);
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(dispatchMock).toHaveBeenCalled();
    });
  
    it("should call clear function when clear button is clicked", () => {
      render(<Form />);
      const projectNameInput = screen.getByLabelText("Project Name");
      fireEvent.change(projectNameInput, { target: { value: "New Project" } });
      const clearButton = screen.getByRole("button", { name: "Clear" });
      fireEvent.click(clearButton);
      expect(projectNameInput).toHaveValue("");
    });
  });
  