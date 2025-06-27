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

    const renderMenuItems = (items: any[]) =>
        items.map((item) =>
            item.items && item.items.length > 0 ? ( 
                <SubMenu
                    key={item.title}
                    label={
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {item.icon && <item.icon style={{ marginRight: 8 }} />}
                            {item.title}
                        </span>
                    }
                >
                    {renderMenuItems(item.items)}
                </SubMenu>
            ) : (
                <MenuItem
                    key={item.title}
                    component={<Link to={`${item.url}`} />}
                    icon={item.icon ? <item.icon /> : undefined}
                    active={location.pathname.includes(item.url)}
                >
                    {item.title}
                </MenuItem>
            )
        );

    return <>{renderMenuItems(items)}</>;
}