'use client';

import { useCallback, useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'gallery-favorites';

export interface UseFavoritesResult {
  favoriteIds: Set<string>;
  isFavorite: (photoId: string) => boolean;
  toggleFavorite: (photoId: string) => void;
}

function parseFavoriteIds(value: string | null): Set<string> {
  if (!value) {
    return new Set<string>();
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return new Set<string>();
    }

    const validIds = parsed.filter((item): item is string => typeof item === 'string');
    return new Set(validIds);
  } catch {
    return new Set<string>();
  }
}

export function useFavorites(): UseFavoritesResult {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      setFavoriteIds(parseFavoriteIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY)));
    } catch {
      setFavoriteIds(new Set<string>());
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
    } catch {
      // Ignore localStorage write failures and keep in-memory state.
    }
  }, [favoriteIds, hasHydrated]);

  const isFavorite = useCallback((photoId: string) => favoriteIds.has(photoId), [favoriteIds]);

  const toggleFavorite = useCallback((photoId: string) => {
    setFavoriteIds((previousFavorites) => {
      const nextFavorites = new Set(previousFavorites);

      if (nextFavorites.has(photoId)) {
        nextFavorites.delete(photoId);
      } else {
        nextFavorites.add(photoId);
      }

      return nextFavorites;
    });
  }, []);

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  };
}
