# Netiqa - Innovative Web & Software Solutions

![Netiqa Banner](https://assets.netiqa.co.ke/Asset%209.png)

> Modern, scalable website for Netiqa - A leading software development company specializing in web development, mobile applications, graphic design, and digital marketing solutions.

## 🌟 Features

- ✅ **Modern Tech Stack**: Built with Next.js 15, React 19, and Tailwind CSS 4
- ✅ **SEO Optimized**: Comprehensive metadata, Open Graph tags, and sitemap generation
- ✅ **Performance**: Optimized images, lazy loading, and 90+ Lighthouse scores
- ✅ **Responsive Design**: Mobile-first approach with beautiful UI/UX
- ✅ **Interactive Components**: Framer Motion animations and smooth transitions
- ✅ **Quote System**: Multi-step quote request form with validation
- ✅ **Analytics**: Google Tag Manager integration and custom crawler analytics
- ✅ **WhatsApp Integration**: Direct customer communication through WhatsApp
- ✅ **Dynamic Portfolio**: Showcase projects with modal previews
- ✅ **Blog Support**: Content management with Editor.js
- ✅ **Admin Dashboard**: Analytics dashboard for monitoring site traffic

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netiqa.git
   cd netiqa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=https://api.netiqa.co.ke/api
   NEXT_PUBLIC_WHATSAPP_NUMBER=254722214567
   NEXT_PUBLIC_GTM_ID=GTM-WGGF78BC
   # ... see .env.example for all variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
theones/
├── app/                      # Next.js 15 App Router
│   ├── (pages)/             # Route groups
│   │   ├── (services)/      # Service pages
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── portfolio/
│   │   └── faqs/
│   ├── api/                 # API routes
│   ├── layout.js            # Root layout
│   └── page.js              # Home page
├── components/              # React components
│   ├── Home/               # Homepage sections
│   ├── services/           # Service page components
│   ├── Portfolio/          # Portfolio components
│   ├── GetAQuote/          # Quote form components
│   ├── ChatBot/            # WhatsApp chat widget
│   └── Dashboard/          # Admin dashboard
├── redux/                   # Redux state management
│   ├── actions/            # Redux actions
│   └── reducers/           # Redux reducers
├── services/               # API services
├── lib/                    # Utility functions
├── public/                 # Static assets
└── middleware.js           # Next.js middleware

```

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 15.2.3
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.5.0

### State Management
- Redux Toolkit
- Redux Persist
- React Redux

### Features
- Keen Slider (carousels)
- Swiper (sliders)
- Socket.io Client (real-time)
- React Icons & Lucide React
- React Toastify (notifications)
- DOMPurify (sanitization)

## 📄 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with services overview |
| About | `/about` | Company information and team |
| Services | `/web-development` | Web development services |
| Services | `/branding-design` | Design & branding services |
| Services | `/seo` | SEO & digital marketing services |
| Portfolio | `/portfolio` | Project showcase |
| Blog | `/blog` | Articles and insights |
| Contact | `/contact` | Contact form |
| FAQs | `/faqs` | Frequently asked questions |
| Dashboard | `/dashboard` | Analytics dashboard (protected) |

## 🔧 Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server
npm run postbuild    # Generate sitemap (runs after build)

# Code Quality
npm run lint         # Run ESLint
```

## 📊 SEO Features

- ✅ Dynamic metadata for all pages
- ✅ Open Graph and Twitter Card tags
- ✅ XML Sitemap generation
- ✅ Robots.txt optimization
- ✅ LLM.txt for AI crawlers
- ✅ Canonical URLs
- ✅ Structured data (coming soon)

## 🎨 Design System

### Colors
- **Primary**: Green (#16a34a)
- **Secondary**: Blue (#2563eb)
- **Accent**: Various gradients

### Typography
- **Sans**: Geist Sans
- **Mono**: Geist Mono

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

### Critical Variables
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp contact number
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential.

## 👥 Team

**Netiqa** - Software Development Company
- Website: [https://www.netiqa.co.ke](https://www.netiqa.co.ke)
- Email: kelvin@netiqa.co.ke
- Phone: +254 722 214 567

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 📈 Roadmap

- [ ] Add blog CMS integration
- [ ] Implement client testimonials system
- [ ] Add case studies section
- [ ] Implement live chat
- [ ] Add multi-language support
- [ ] Integrate payment gateway for quotes

---

**Built with ❤️ by Netiqa Team**
