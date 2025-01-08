'use client';

import Header from '@/app/(components)/Header';
import { useGetUsersQuery } from '@/state/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'ID',
    flex: 1,
    headerClassName: 'bg-white',
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    headerClassName: 'bg-white',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    headerClassName: 'bg-white',
  },
];

export default function Users() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 30,
    page: 0,
  });

  const {
    data: users,
    isError,
    isLoading,
  } = useGetUsersQuery({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  if (isLoading) {
    return <div className='py-4'>Loading...</div>;
  }

  if (isError || !users) {
    return <div className='text-center text-red-500 py-4'>Failed to fetch users</div>;
  }

  return (
    <div className='flex flex-col'>
      <Header name='Inventory' />
      <DataGrid
        rows={users.data}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className='!bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 px-8'
        pagination
        paginationMode='server'
        rowCount={users.metadata.total_records}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
