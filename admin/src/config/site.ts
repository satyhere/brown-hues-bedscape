export const siteConfig = {
  name: 'Brown Hues Bedscape',
  description: 'Admin panel for Brown Hues Bedscape',
  url: 'https://brownhues.in/admin',
  links: {
    mainSite: 'https://brownhues.in',
    github: 'https://github.com/satyhere/brown-hues-bedscape',
  },
};

export const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: 'Package',
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: 'Box',
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: 'Users',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'Settings',
  },
] as const;
