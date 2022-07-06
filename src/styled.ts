// @ts-nocheck
import styled, { StyledInterface, css } from "styled-components";

const defaultStyled =
  typeof styled === "function" ? styled : (styled.default as StyledInterface);

export * from "styled-components";
export { defaultStyled as default, css };
