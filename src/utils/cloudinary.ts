import { Cloudinary } from '@cloudinary/url-gen';

interface OptimizeImageOptions {
  publicId: string;
}

const cloudinary = new Cloudinary({
  cloud: { cloudName: 'dn7a1djp1' },
});

export function getOptimizedImageUrl({ publicId }: OptimizeImageOptions): string {
  if (!publicId) {
    console.error('Public ID is required for Cloudinary image optimization');
    return '';
  }

  return cloudinary
    .image(publicId)
    .quality('auto')
    .format('auto')
    .delivery('q_auto')
    .toURL();
}