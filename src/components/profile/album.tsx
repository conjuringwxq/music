import React, { useMemo } from 'react';
import { ProfileItemProps, ViewFormat } from '@/pages/profile';

export const ProfileAlbum: React.FC<ProfileItemProps> = (props) => {
  const { data, loading, viewFormat } = props;

  const renderView = useMemo(() => {
    switch (viewFormat) {
      case ViewFormat.App:
        return 'App';
      case ViewFormat.List:
        return 'List';
      case ViewFormat.Table:
        return 'Table';
      // no default
    }
  }, [viewFormat]);

  return <>{renderView}</>;
};
