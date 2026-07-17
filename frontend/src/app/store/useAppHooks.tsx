import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

import { type TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;