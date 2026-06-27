import React from 'react';
import { Dropdown, Menu as AntMenu, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

interface SessionListItemProps {
  session: { threadId: string; name: string; lastUpdated: number };
  onDelete: (threadId: string) => void;
}
