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

        const renderMasterItems = (masters: any[]) =>
        masters.map((master) =>
          master.items && master.items.length > 0 ? (
            <SubMenu
              key={master.name}
              label={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {master.icon && <master.icon style={{ marginRight: 8 }} />}
                  {master.name}
                </span>
              }
            >
              {master.items.map((item: any) => (
                <MenuItem
                  key={item.name}
                  component={<Link to={`/${item.url}`} />}
                  icon={item.icon ? <item.icon /> : undefined}
                  active={location.pathname.includes(item.url)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={master.name}
              component={<Link to={`/${master.url}`} />}
              icon={master.icon ? <master.icon /> : undefined}
              active={location.pathname.includes(master.url)}
            >
              {master.name}
            </MenuItem>
          )
        );

        return <>{renderMasterItems(masters)}</>;
}