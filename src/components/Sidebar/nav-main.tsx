import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
            icon?: LucideIcon;
        }[];
    }[];
}) {
    const location = useLocation();

    const renderMenuItems = (items: any[], level = 0) =>
        items.map((item) =>
            item.items && item.items.length > 0 ? ( 
                <SubMenu
                    key={item.title}
                    label={
                        <div className="flex items-center">
                            {item.icon && <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />}
                            <span className="truncate">{item.title}</span>
                        </div>
                    }
                    className={`${level > 0 ? 'pl-4' : ''}`}
                >
                    {renderMenuItems(item.items, level + 1)}
                </SubMenu>
            ) : (
                <MenuItem
                    key={item.title}
                    component={<Link to={`${item.url}`} className="block w-full h-full overflow-hidden" />}
                    icon={item.icon ? <item.icon className="h-4 w-4 flex-shrink-0" /> : undefined}
                    active={location.pathname.includes(item.url)}
                    className={`${level > 0 ? 'pl-8' : ''}`}
                >
                    <span className="truncate">{item.title}</span>
                </MenuItem>
            )
        );

    return <>{renderMenuItems(items)}</>;
}