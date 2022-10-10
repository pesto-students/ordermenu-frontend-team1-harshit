import { memo } from 'react';
import {
  Table, TableContainer, Tbody, Th, Thead, Tr
} from '@chakra-ui/react'
import { usePagination, useTable } from 'react-table'
import isEqual from 'lodash/isEqual'
import OrderRow from './OrderRow'

const OrderTable = ({ columns, data }) => {
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ data, columns }, usePagination)

  return (
    <TableContainer>
      <Table variant='simple' bg="gray.100">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column, index) => (
                <Th key={index} {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {
            rows.map((row, i) => {
              prepareRow(row)
              return (
                <OrderRow key={row.original._id} row={row} />
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

function compareProps(prevProps, nextProps) {
  return isEqual(prevProps, nextProps)
}

export default memo(OrderTable, compareProps)