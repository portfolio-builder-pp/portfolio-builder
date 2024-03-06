import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  AccountBox,
  ContactMail,
  Article,
  HistoryEdu,
  AddBox,
  Web,
} from '@mui/icons-material';
import { To, useNavigate } from 'react-router-dom';
import { Fragment, ReactNode } from 'react';
import { UserDto, UserRole } from '@portfolio-builder/shared-types';
import { trpc } from '../../../../shared/trpc-query';

export const NavigationList = () => {
  const navigate = useNavigate();
  const userInfo = trpc.auth.userInfo.useQuery();

  if (userInfo.status !== 'success') return null;

  return (
    <List component="nav">
      {navigationListItems.map((item) =>
        item.roles &&
        !item.roles?.includes(
          (userInfo.data as unknown as UserDto).role
        ) ? null : (
          <Fragment key={typeof item.to === 'string' ? item.to : item.title}>
            <ListItemButton onClick={() => navigate(item.to)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </Fragment>
        )
      )}
    </List>
  );
};

interface NavigationListItem {
  title: string;
  to: To;
  icon: ReactNode;
  roles?: UserRole[];
}

const navigationListItems: NavigationListItem[] = [
  {
    icon: <Web />,
    title: 'Page',
    to: '/dashboard/page',
    roles: [UserRole.Admin, UserRole.Moderator],
  },
  {
    icon: <Article />,
    title: 'Blog',
    to: '/dashboard/blog',
    roles: [UserRole.Admin, UserRole.Moderator],
  },
  {
    icon: <ContactMail />,
    title: 'Contact Details',
    to: '/dashboard/contact',
    roles: [UserRole.Admin, UserRole.Moderator],
  },
  {
    icon: <HistoryEdu />,
    title: 'Portfolio',
    to: '/dashboard/portfolio',
    roles: [UserRole.Admin, UserRole.Moderator],
  },
  {
    icon: <AddBox />,
    title: 'Properties',
    to: '/dashboard/property',
    roles: [UserRole.Admin, UserRole.Moderator],
  },
  {
    icon: <AccountBox />,
    title: 'Users',
    to: '/dashboard/user',
    roles: [UserRole.Admin],
  },
];
