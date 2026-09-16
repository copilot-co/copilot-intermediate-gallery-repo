'use client';

import { useCallback, useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'gallery-favorite-photo-ids';

function readStoredFavorites(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }

  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) {
      return new Set();
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? new Set(parsed.filter((id): id is string => typeof id === 'string')) : new Set();
  } catch {
    // Ignore malformed or inaccessible storage and fall back to no favorites.
    return new Set();
  }
}

/**
 * Persists favorite photo IDs in localStorage and restores them on load.
 * Shared by GalleryGrid (to toggle favorites) and the /favorites page (to filter by them).
 */
export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavoriteIds(readStoredFavorites());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds, isLoaded]);

  const toggleFavorite = useCallback((photoId: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (photoId: string) => favoriteIds.has(photoId),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite, isLoaded };
}
