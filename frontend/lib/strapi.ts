// Strapi API configuration and types

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiImage {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

// Strapi v5 structure - flat data structure
export interface Category {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string | any; // Long description for category hero section (can be rich text)
  image?: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  services?: any[];
}

export interface Service {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration: string;
  isPopular?: boolean;
  image?: StrapiImage | null;
  category?: Category | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Article {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Gallery {
  id: number;
  documentId?: string;
  title?: string;
  slug: string;
  images: StrapiImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper function to get image URL for Strapi v5
export function getImageUrl(image: StrapiImage | undefined | null): string | null {
  try {
    if (!image || !image.url) return null;
    return `${STRAPI_URL}${image.url}`;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
}

/**
 * Converts Strapi v5 rich text structure to HTML
 */
export function renderRichText(richText: any): string {
  if (!richText) return '';
  
  // If it's already a string, return it
  if (typeof richText === 'string') {
    return richText;
  }
  
  // If it's an array (Strapi v5 rich text structure)
  if (Array.isArray(richText)) {
    return richText.map((block: any) => renderRichTextBlock(block)).join('');
  }
  
  // If it's an object with content property
  if (richText && typeof richText === 'object' && richText.content && Array.isArray(richText.content)) {
    return richText.content.map((block: any) => renderRichTextBlock(block)).join('');
  }
  
  return '';
}

function renderRichTextBlock(block: any): string {
  if (!block || typeof block !== 'object') return '';
  
  const { type, children, text } = block;
  
  // Handle text nodes
  if (type === 'text' || text !== undefined) {
    let content = text || '';
    
    // Apply formatting
    if (block.bold) content = `<strong>${content}</strong>`;
    if (block.italic) content = `<em>${content}</em>`;
    if (block.underline) content = `<u>${content}</u>`;
    if (block.strikethrough) content = `<s>${content}</s>`;
    if (block.code) content = `<code>${content}</code>`;
    
    return content;
  }
  
  // Handle block types
  if (children && Array.isArray(children)) {
    const childrenHtml = children.map((child: any) => renderRichTextBlock(child)).join('');
    
    switch (type) {
      case 'paragraph':
        return `<p>${childrenHtml}</p>`;
      case 'heading':
        const level = block.level || 1;
        return `<h${level}>${childrenHtml}</h${level}>`;
      case 'list':
        const listTag = block.format === 'ordered' ? 'ol' : 'ul';
        return `<${listTag}>${childrenHtml}</${listTag}>`;
      case 'list-item':
        return `<li>${childrenHtml}</li>`;
      case 'quote':
        return `<blockquote>${childrenHtml}</blockquote>`;
      case 'code':
        return `<pre><code>${childrenHtml}</code></pre>`;
      case 'link':
        const url = block.url || '#';
        const target = block.target ? ` target="${block.target}"` : '';
        return `<a href="${url}"${target}>${childrenHtml}</a>`;
      default:
        return childrenHtml;
    }
  }
  
  return '';
}

// API functions
export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = `${STRAPI_URL}/api/categories?populate=*&sort=name:asc`;
    console.log('Fetching categories from:', url);
    
    const response = await fetch(
      url,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    
    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text);
      return [];
    }
    
    const data = await response.json();
    
    // Strapi v5 returns data directly in data array
    const categories = Array.isArray(data.data) ? data.data : [];
    
    // Filter out invalid entries and ensure required fields exist
    return categories.filter((cat: any) => cat && cat.id && cat.name && cat.slug);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    // Try with publicationState to ensure we get published content
    const url = `${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate=*&publicationState=live`;
    console.log('Fetching category by slug:', slug, 'URL:', url);
    
    const response = await fetch(
      url,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch category:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Category response data:', JSON.stringify(data, null, 2));
    
    // Handle both array and single object responses
    let category = null;
    if (Array.isArray(data.data)) {
      category = data.data[0];
    } else if (data.data) {
      category = data.data;
    }
    
    console.log('Found category:', category ? { 
      id: category.id, 
      name: category.name, 
      slug: category.slug,
      hasLongDescription: !!category.longDescription,
      longDescriptionLength: category.longDescription?.length || 0
    } : 'null');
    
    if (category && category.id && category.name) {
      return category;
    }
    
    console.log('Category validation failed:', { 
      hasCategory: !!category, 
      hasId: !!category?.id, 
      hasName: !!category?.name 
    });
    
    return null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function fetchServicesByCategory(categorySlug: string): Promise<Service[]> {
  try {
    // First, get the category to get its ID
    const category = await fetchCategoryBySlug(categorySlug);
    if (!category) {
      console.log('Category not found for slug:', categorySlug);
      return [];
    }

    // Try fetching by category slug first
    let url = `${STRAPI_URL}/api/services?filters[category][slug][$eq]=${categorySlug}&populate=*&sort=isPopular:desc,name:asc`;
    console.log('Fetching services by category slug:', categorySlug, 'URL:', url);
    
    let response = await fetch(url, { next: { revalidate: 3600 } });
    let data = null;
    
    if (response.ok) {
      data = await response.json();
      const services = Array.isArray(data.data) ? data.data : [];
      if (services.length > 0) {
        console.log('Services found by slug:', services.length);
        return services.filter((service: any) => service && service.id && service.name);
      }
    }
    
    // If that doesn't work, try by category ID
    url = `${STRAPI_URL}/api/services?filters[category][id][$eq]=${category.id}&populate=*&sort=isPopular:desc,name:asc`;
    console.log('Trying to fetch services by category ID:', category.id, 'URL:', url);
    response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      console.error('Failed to fetch services:', response.status, response.statusText);
      return [];
    }
    
    data = await response.json();
    console.log('Services response data:', { 
      count: data.data?.length || 0,
      services: data.data?.map((s: any) => ({ id: s.id, name: s.name })) || []
    });
    
    const services = Array.isArray(data.data) ? data.data : [];
    const filtered = services.filter((service: any) => service && service.id && service.name);
    console.log('Filtered services count:', filtered.length);
    
    return filtered;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchAllServices(): Promise<Service[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/services?populate=*&sort=isPopular:desc,name:asc`,
    { next: { revalidate: 3600 } }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  
  const data = await response.json();
  return data.data || [];
}

export async function fetchArticles(): Promise<Article[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`,
    { next: { revalidate: 3600 } }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  
  const data = await response.json();
  return data.data || [];
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 3600 } }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  
  const data = await response.json();
  return data.data?.[0] || null;
}

export async function fetchGalleryBySlug(slug: string): Promise<Gallery | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/galleries?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch gallery:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    const gallery = data.data?.[0];
    
    // Strapi v5 structure - images is an array directly
    if (gallery && gallery.images && Array.isArray(gallery.images)) {
      return gallery;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return null;
  }
}

