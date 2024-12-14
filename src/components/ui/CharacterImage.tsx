import React from 'react';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

interface CharacterImageProps {
  publicId: string;
}

export function CharacterImage({ publicId }: CharacterImageProps) {
  return (
    <img
      src={getOptimizedImageUrl({ publicId })}
      alt="Character"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}