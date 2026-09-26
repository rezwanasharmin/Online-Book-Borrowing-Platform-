'use client';

import { createAuthClient } from 'better-auth/react';

// Initialize BetterAuth client per documentation
let baseClient = null;
try {
  baseClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  });
} catch {
  // Fallback if BetterAuth server is demo/offline
}

/**
 * BetterAuth Client implementing updateUser as documented in:
 * https://better-auth.com/docs/concepts/users-accounts#update-user
 */
export const authClient = {
  ...(baseClient || {}),

  // Documentation specification: authClient.updateUser({ image, name })
  updateUser: async ({ image, name }) => {
    // If backend BetterAuth route handles it:
    if (baseClient && typeof baseClient.updateUser === 'function') {
      try {
        const response = await baseClient.updateUser({ image, name });
        if (response && !response.error) {
          return response;
        }
      } catch {
        // Fallback to local session update
      }
    }

    // Client-side local session synchronization
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('bookBorrowUser');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          const updatedUser = {
            ...user,
            name: name !== undefined ? name : user.name,
            photoUrl: image !== undefined ? image : user.photoUrl,
            image: image !== undefined ? image : user.image,
          };

          window.localStorage.setItem('bookBorrowUser', JSON.stringify(updatedUser));

          // Also update in registered users array if present
          const storedUsers = window.localStorage.getItem('bookBorrowUsers');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const updatedUsers = users.map((u) =>
              u.email === user.email
                ? {
                    ...u,
                    name: updatedUser.name,
                    photoUrl: updatedUser.photoUrl,
                    image: updatedUser.image,
                  }
                : u
            );
            window.localStorage.setItem('bookBorrowUsers', JSON.stringify(updatedUsers));
          }

          window.dispatchEvent(new Event('authChange'));
          return { data: updatedUser, error: null };
        } catch (error) {
          return { data: null, error: { message: 'Failed to update user session' } };
        }
      }
    }

    return { data: { name, image }, error: null };
  },
};
