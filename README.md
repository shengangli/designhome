# Design Studio Website

A modern design studio website built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, minimal aesthetic with Japanese design influence
- **Responsive**: Fully responsive design that works on all devices  
- **Animations**: Smooth animations and transitions with Framer Motion
- **SEO Optimized**: Complete SEO setup with meta tags, sitemap, and robots.txt
- **Dynamic Content**: Easy-to-manage project content system
- **Performance**: Optimized for speed and Core Web Vitals

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Inter Font** for clean typography

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── work/[slug]/       # Dynamic project pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── ...
├── components/            # Reusable components
│   ├── Hero.tsx          # Landing page hero
│   ├── ThreePillars.tsx  # Feature highlights
│   ├── Navigation.tsx    # Site navigation
│   └── ...
├── lib/                  # Utilities and data
│   └── projects.ts       # Project data and functions
└── ...

content/
└── projects/             # Project content (JSON files)

public/
├── images/               # Project images
│   ├── project-name/     # Images for each project
│   └── ...
└── ...
```

## Adding New Projects

1. Create project data in `src/lib/projects.ts` or add a JSON file in `content/projects/`
2. Add project images to `public/images/[project-slug]/`
3. The project will automatically appear in the portfolio and be accessible via `/work/[project-slug]`

## Image Requirements

For best results, use images with these specifications:
- **Hero images**: 1200x800px (3:2 ratio)
- **Gallery images**: 800x600px (4:3 ratio)
- **Thumbnails**: 400x300px (4:3 ratio)

## Customization

### Colors
Update colors in `src/app/globals.css` and Tailwind config

### Typography  
Font configuration is in `src/app/layout.tsx`

### Content
- Update site metadata in `src/app/layout.tsx`
- Modify hero content in `src/components/Hero.tsx`
- Update company info in `src/components/Footer.tsx`

## Deployment

The site is optimized for deployment on Vercel:

1. Push to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## SEO Features

- Dynamic meta tags for all pages
- Open Graph and Twitter Card support
- Automatically generated sitemap
- Robots.txt configuration
- Structured data ready
- Image alt tags
- Proper heading hierarchy

## Performance Features

- Image optimization with Next.js Image component
- Font optimization with next/font
- Static generation for better performance
- Lazy loading for images and components

## Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
