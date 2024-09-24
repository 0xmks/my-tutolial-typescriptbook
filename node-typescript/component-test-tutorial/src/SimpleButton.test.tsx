import { render } from "@testing-library/react";
import { SimpleButton } from "./SimpleButton";
 
test("描画されてすぐはOFFと表示されている", () => {
  const view = render(<SimpleButton />);
  expect(view.container).toMatchSnapshot();
});