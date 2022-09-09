import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { memo, useMemo } from 'react'
import { useTable } from 'react-table'

const OrderTable = ({ orders }) => {

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'user.name'
    },
    {
      Header: 'Total Amount',
      accessor: 'totalBillAmount'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'Table Number',
      accessor: 'tableNumber'
    }
  ])

  const data = useMemo(() => orders, [orders])
  console.log("orderDetails => ", orders, columns)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ data, columns })


  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {
            rows.map((row, i) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {
                      return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    })
                  }
                </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default memo(OrderTable)