import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { MainLayout } from '@/components/layout/MainLayout'
import { BlankLayout } from '@/components/layout/BlankLayout'

const Home = lazy(() => import('@/routes/Home'))
const ModelsPage = lazy(() => import('@/routes/ModelsPage'))
const PricingPage = lazy(() => import('@/routes/PricingPage'))
const About = lazy(() => import('@/routes/About'))
const Contact = lazy(() => import('@/routes/Contact'))
const Privacy = lazy(() => import('@/routes/legal/Privacy'))
const Terms = lazy(() => import('@/routes/legal/Terms'))
const Kvkk = lazy(() => import('@/routes/legal/Kvkk'))
const Links = lazy(() => import('@/routes/Links'))
const NotFound = lazy(() => import('@/routes/NotFound'))

const Forum = lazy(() => import('@/routes/Forum'))
const ForumNewPost = lazy(() => import('@/routes/ForumNewPost'))
const ForumPost = lazy(() => import('@/routes/ForumPost'))

const Chat = lazy(() => import('@/routes/Chat'))

const Login = lazy(() => import('@/routes/auth/Login'))
const Register = lazy(() => import('@/routes/auth/Register'))
const VerifyEmail = lazy(() => import('@/routes/auth/VerifyEmail'))
const Forgot = lazy(() => import('@/routes/auth/Forgot'))
const Reset = lazy(() => import('@/routes/auth/Reset'))
const GoogleCallback = lazy(() => import('@/routes/auth/GoogleCallback'))

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loader2 className="h-5 w-5 animate-spin text-fg-muted" />
    </div>
  )
}

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{node}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: withSuspense(<Home />) },
      { path: '/modeller', element: withSuspense(<ModelsPage />) },
      { path: '/fiyatlandirma', element: withSuspense(<PricingPage />) },
      { path: '/hakkimizda', element: withSuspense(<About />) },
      { path: '/iletisim', element: withSuspense(<Contact />) },
      { path: '/gizlilik', element: withSuspense(<Privacy />) },
      { path: '/sartlar', element: withSuspense(<Terms />) },
      { path: '/kvkk', element: withSuspense(<Kvkk />) },
      { path: '/forum', element: withSuspense(<Forum />) },
      { path: '/forum/yeni', element: withSuspense(<ForumNewPost />) },
      { path: '/forum/:id', element: withSuspense(<ForumPost />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: '/sohbet', element: withSuspense(<Chat />) },
      { path: '/baglantilar', element: withSuspense(<Links />) },
      { path: '/giris', element: withSuspense(<Login />) },
      { path: '/kayit', element: withSuspense(<Register />) },
      { path: '/e-posta-dogrula', element: withSuspense(<VerifyEmail />) },
      { path: '/sifre-sifirla', element: withSuspense(<Forgot />) },
      { path: '/sifre-yenile', element: withSuspense(<Reset />) },
      { path: '/oauth/google', element: withSuspense(<GoogleCallback />) },
    ],
  },
])
