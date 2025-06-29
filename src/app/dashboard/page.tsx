'use client'

import { useSession } from 'next-auth/react'
import { 
  MessageCircle, 
  MapPin, 
  CreditCard, 
  Users, 
  Calendar,
  Plus,
  Bell,
  TrendingUp,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

const quickActions = [
  {
    name: 'Nieuwe Chat',
    description: 'Start een groepsgesprek',
    href: '/chat',
    icon: MessageCircle,
    color: 'bg-blue-500',
  },
  {
    name: 'Locatie Delen',
    description: 'Deel je locatie met de groep',
    href: '/location',
    icon: MapPin,
    color: 'bg-green-500',
  },
  {
    name: 'Onkosten Toevoegen',
    description: 'Voeg een nieuwe uitgave toe',
    href: '/expenses/new',
    icon: CreditCard,
    color: 'bg-purple-500',
  },
  {
    name: 'Groep Uitnodigen',
    description: 'Nodig vrienden uit voor je groep',
    href: '/group/invite',
    icon: Users,
    color: 'bg-orange-500',
  },
]

const stats = [
  { name: 'Groepsleden', value: '8', change: '+2', changeType: 'positive' },
  { name: 'Gedeelde Locaties', value: '5', change: '+1', changeType: 'positive' },
  { name: 'Onkosten', value: '€127.50', change: '+€23.40', changeType: 'positive' },
  { name: 'Geplande Activiteiten', value: '12', change: '+3', changeType: 'positive' },
]

const recentActivity = [
  {
    id: 1,
    type: 'message',
    content: 'Jan heeft een bericht gestuurd in de groepschat',
    time: '2 minuten geleden',
    user: 'Jan',
  },
  {
    id: 2,
    type: 'location',
    content: 'Lisa heeft haar locatie gedeeld',
    time: '5 minuten geleden',
    user: 'Lisa',
  },
  {
    id: 3,
    type: 'expense',
    content: 'Mark heeft €15.50 toegevoegd voor lunch',
    time: '10 minuten geleden',
    user: 'Mark',
  },
  {
    id: 4,
    type: 'planning',
    content: 'Sarah heeft een artiest toegevoegd aan haar planning',
    time: '15 minuten geleden',
    user: 'Sarah',
  },
]

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welkom terug, {session?.user?.name?.split(' ')[0] || 'Gebruiker'}! 🐰
          </h1>
          <p className="text-purple-100">
            Klaar voor een geweldige festival ervaring met je groep?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Snelle Acties
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <div>
                    <span className={`rounded-lg inline-flex p-3 ${action.color} text-white ring-4 ring-white`}>
                      <action.icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <Plus className="h-6 w-6" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity and Upcoming Events */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recente Activiteit
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center ring-8 ring-white">
                              <span className="text-sm font-medium text-white">
                                {activity.user.charAt(0)}
                              </span>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.content}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={activity.time}>{activity.time}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Aankomende Events
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Down the Rabbit Hole 2024
                    </p>
                    <p className="text-sm text-gray-500">
                      28-30 juni • Beuningen
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Over 2 maanden
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Groepsvergadering
                    </p>
                    <p className="text-sm text-gray-500">
                      Volgende week • Locatie TBD
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Over 1 week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notificaties
              </h3>
              <button className="text-sm text-purple-600 hover:text-purple-500">
                Alles markeren als gelezen
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <Bell className="h-5 w-5 text-yellow-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nieuwe groepsuitnodiging
                  </p>
                  <p className="text-sm text-gray-500">
                    Jan heeft je uitgenodigd voor de groep &quot;Festival Crew&quot;
                  </p>
                </div>
                <button className="text-sm text-yellow-600 hover:text-yellow-500">
                  Bekijken
                </button>
              </div>
              
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Bell className="h-5 w-5 text-green-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Locatie gedeeld
                  </p>
                  <p className="text-sm text-gray-500">
                    Lisa heeft haar locatie gedeeld in de groep
                  </p>
                </div>
                <button className="text-sm text-green-600 hover:text-green-500">
                  Bekijken
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 