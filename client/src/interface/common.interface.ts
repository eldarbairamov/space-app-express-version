import React from "react";

export type TypedSetState<T> = React.Dispatch<React.SetStateAction<T>>

export type TypedOnClick<T> = React.MouseEvent<T>

export type TypedOnChange = React.ChangeEvent<HTMLInputElement>