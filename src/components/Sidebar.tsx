import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  CreditCard, 
  Server, 
  DollarSign,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../stores/auth';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Planos', href: '/plans', icon: Package },
  { name: 'Créditos', href: '/credits', icon: CreditCard },
  { name: 'Servidores', href: '/servers', icon: Server },
  { name: 'Financeiro', href: '/finance', icon: DollarSign },
];

export default function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold text-indigo-600">StreamCRM</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${isActive
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt=""
                />
                <div className="flex-1">
                  <div className="text-gray-900">{user?.name}</div>
                  <div className="text-gray-400 text-xs">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-2 w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                <LogOut className="h-6 w-6 shrink-0" />
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}