import React, { useState } from 'react';
import { Table, Divider, Radio } from 'antd';

const TableComponent = (props) => {
    const {selectionType = 'checkbox', data=[], columns = []} = props
  
  const rowSelection = {
    type: selectionType,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </div>
  );
};

export default TableComponent;
