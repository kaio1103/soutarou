import { Cloudinary } from '@cloudinary/url-gen';

// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: 'dn7a1djp1',
  images: {
    background: 'background1',
    character: 'character/jkcera3urnzfd3llunal',
  },
} as const;

// Create a single Cloudinary instance
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName,
  },
});

// Image optimization utility
export function getOptimizedImageUrl(publicId: string): string {
  return cloudinary
    .image(publicId)
    .quality('auto')
    .format('auto')
    .delivery('q_auto')
    .toURL();
}