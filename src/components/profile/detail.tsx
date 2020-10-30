import React, { useEffect } from 'react';
import { ProfileItemProps } from '@/pages/profile';
import { useSetState } from 'ahooks';

interface StateType {
  data: any;
}

export const ProfileDetail: React.FC<ProfileItemProps> = (props) => {
  const { loading, data } = props;

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};
