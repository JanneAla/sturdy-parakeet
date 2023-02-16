import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLibrarySettings = () =>
  useAppSelector((state: RootState) => state.librarySettings);
  
export const useAuth = () =>
  useAppSelector((state: RootState) => state.igdbAuth);