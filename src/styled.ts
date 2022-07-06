// @ts-nocheck

// https://github.com/styled-components/styled-components/issues/3437#issuecomment-1103085056
import styled, { StyledInterface, css } from "styled-components";

const defaultStyled =
  typeof styled === "function" ? styled : (styled.default as StyledInterface);

export * from "styled-components";
export { defaultStyled as default, css };
