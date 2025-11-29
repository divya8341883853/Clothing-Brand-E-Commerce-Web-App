import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Route = '/' | '/product' | '/cart' | '/checkout' | '/login' | '/register' | '/orders';

interface RouterContextType {
  currentRoute: Route;
  params: Record<string, string>;
  navigate: (route: Route, params?: Record<string, string>) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const Router = ({ children }: { children: ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<Route>('/');
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const [route, ...paramParts] = hash.split('?');
      setCurrentRoute(route as Route);

      if (paramParts.length > 0) {
        const searchParams = new URLSearchParams(paramParts.join('?'));
        const newParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          newParams[key] = value;
        });
        setParams(newParams);
      }
    }
  }, []);

  const navigate = (route: Route, newParams?: Record<string, string>) => {
    setCurrentRoute(route);
    setParams(newParams || {});

    let hash = route;
    if (newParams && Object.keys(newParams).length > 0) {
      const searchParams = new URLSearchParams(newParams);
      hash += '?' + searchParams.toString();
    }
    window.location.hash = hash;
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useNavigate must be used within Router');
  return context.navigate;
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within Router');
  return context;
};
