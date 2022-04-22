import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Store } from "redux";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import { RootState } from "../../redux/reducers";

interface ExtendedRenderOptions extends RenderOptions {
  initialState: Partial<RootState>;
  store?: Store<Partial<RootState>>;
}

export const renderWithRedux = (
  component: React.ReactElement,
  {
    initialState,
    store = configureStore<Partial<RootState>>([thunk])(initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {
    initialState: {},
  }
) => {
  return rtlRender(component, {
    wrapper: TestWrapper(store),
    ...renderOptions,
  });
};

const TestWrapper =
  (store: Store) =>
  ({ children }: { children?: React.ReactNode }) =>
    <Provider store={store}>{children}</Provider>;
