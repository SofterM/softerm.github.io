import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // ให้โปรเจกต์ export เป็น static
  trailingSlash: true, // เพิ่ม / ท้าย URL สำหรับ GitHub Pages
};

export default nextConfig;
