import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from "lucide-react";

export function NavMaster({ masters } : { masters : {
    name: string;
    url: string;
    icon?: LucideIcon;
    items?: {
        name: string;
        url: string;
        icon?: LucideIcon;
    }[];
    }[] }) {
        const location = useLocation();

        const renderMasterItems = (masters: any[], level = 0) =>
        masters.map((master) =>
          master.items && master.items.length > 0 ? (
            <SubMenu
              key={master.name}
              label={
                <div className="flex items-center">
                  {master.icon && <master.icon className="h-4 w-4 mr-2 flex-shrink-0 overflow-hidden" />}
                  <span className="truncate">{master.name}</span>
                </div>
              }
              className={`${level > 0 ? 'pl-4' : ''}`}
            >
              {master.items.map((item: any) => (
                <MenuItem
                  key={item.name}
                  component={<Link to={`/${item.url}`} className="block w-full h-full overflow-hidden" />}
                  icon={item.icon ? <item.icon className="h-4 w-4 flex-shrink-0" /> : undefined}
                  active={location.pathname.includes(item.url)}
                  className={`${level > 0 ? 'pl-8' : 'pl-4'}`}
                >
                  <span className="truncate">{item.name}</span>
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={master.name}
              component={<Link to={`/${master.url}`} className="block w-full h-full overflow-hidden" />}
              icon={master.icon ? <master.icon className="h-4 w-4 flex-shrink-0" /> : undefined}
              active={location.pathname.includes(master.url)}
              className={`${level > 0 ? 'pl-8' : ''}`}
            >
              <span className="truncate">{master.name}</span>
            </MenuItem>
          )
        );

        return <>{renderMasterItems(masters)}</>;
}