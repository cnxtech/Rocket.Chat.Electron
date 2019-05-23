/** @jsx jsx */
import { css, jsx } from '@emotion/core';


const buttonStyle = css`
	position: relative;
	display: flex;
	padding: 0 1.5rem;
	min-height: 2.5rem;
	cursor: pointer;
	transition: opacity 300ms, background-color 300ms, color 300ms;
	text-align: center;
	color: var(--color-dark-70);
	border-width: 2px;
	border-style: solid;
	border-color: var(--color-dark-70);
	border-radius: 2px;
	background-color: transparent;
	font-size: 1rem;
	font-weight: 600;
	align-items: center;
	justify-content: center;

	&:not([disabled]):hover {
		opacity: 0.6;
	}

	&:active,
	&:focus:hover {
		outline: none;
	}

	&:active {
		transform: translateY(2px);
		opacity: 0.9;
	}

	&:active::before {
		top: -2px;
	}

	&::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		content: "";
		cursor: pointer;
	}

	&:disabled {
		cursor: default;
		color: white;
		border: 0;
		border-color: var(--color-gray-light);
		background-color: var(--color-gray-light);
	}
`;

const primaryStyle = css`
	color: var(--color-white);
	border: 0;
	background-color: var(--color-blue);
`;

const secondaryStyle = css`
	color: var(--color-dark-medium);
	border: 0;
	border-color: var(--color-gray-medium);
	background-color: var(--color-gray-medium);
`;

const dangerStyle = css`
	color: var(--color-white);
	border: 0;
	background-color: var(--color-red);
`;

const smallStyle = css`
	min-height: 0;
	padding: 0;
	width: 2rem;
	height: 2rem;
	line-height: 1;
`;

export const Button = ({ children, primary, secondary, danger, small, ...props }) => (
	<button
		css={[
			buttonStyle,
			primary && primaryStyle,
			secondary && secondaryStyle,
			danger && dangerStyle,
			small && smallStyle,
		]}
		{...props}
	>
		{children}
	</button>
);
