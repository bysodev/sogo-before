import {GiTomato, GiWheat, GiJellyBeans, GiBroccoli, GiGarlic, GiStarsStack} from 'react-icons/gi'
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
  } from "react-icons/md";
// 3.75rem
export const routes = [
    {
        name: 'Aprendizaje', 
        href: '/learn',
        links: ['/learn', '/learn/numbers', '/learn/vocals'],
        icon: MdOutlineSpaceDashboard,
    },
    {
        name: 'Lecciones', 
        href: '/lesson',
        links: ['/lesson', '/lesson/numbers', '/lesson/vocals'],
        icon: MdOutlineIntegrationInstructions,
    },
   
]