import styled, { css } from "styled-components";

/* Define size variations for the button */
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;

    /* Media query for screens <= 1024px */
    @media (max-width: 1024px) {
      font-size: 1rem;
      padding: 0.3rem 0.6rem;
    }

    /* Media query for screens < 500px */
    @media (width < 500px) {
      font-size: 1rem;
      padding: 0.3rem 0.6rem;
    }
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;

    /* Media query for screens <= 1024px */
    @media (max-width: 1024px) {
      font-size: 1.2rem;
      padding: 1rem 1.4rem;
    }

    /* Media query for screens < 500px */
    @media (width < 500px) {
      font-size: 1rem;
      padding: 0.3rem 0.6rem;
    }
  `,
  large: css`
    font-weight: bold;
    padding: 1.2rem 2rem;
    border-radius: 0;

    /* Media query for screens <= 1024px */
    @media (max-width: 1024px) {
      font-size: 1.4rem;
      padding: 1rem 2rem;
    }

    /* Media query for screens < 500px */
    @media (width < 500px) {
      font-size: 1rem;
      padding:  8px;
    }
  `,
};

/* Define color variations for the button */
const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    border-radius: 0;
    width: 20rem;

    &:hover {
      background-color: var(--color-red-800);
    }

      @media (width < 500px) {
      width: 15rem;
    }

  `,
  cart: css`
    color: white;
    background-color: black;
    border-radius: 0;
    width: 20rem;
    transition: transform .15s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }

    @media (width < 500px) {
      width: 15rem;
    }
  `,
  
};

/* Styled button component */
const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  /* Apply size and variation styles based on props */
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

/* Default props for the button */
Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
