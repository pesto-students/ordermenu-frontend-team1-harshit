import React, { memo } from 'react'
import {
  Table, TableContainer, Tbody, Td, Th, Thead, Tr, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tfoot,
  Flex,
  Text,
} from '@chakra-ui/react'
import { usePagination, useTable } from 'react-table'
import isEqual from 'lodash/isEqual'
import { FiMoreHorizontal, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { fetchAllOrders, updateOrderStatusAction } from '../../../store/orderSlice'
import { useDispatch } from 'react-redux'

const OrderTable = ({ limit, page, totalResults, totalPages, columns, data, status, partnerId }) => {
  const dispatch = useDispatch()

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ data, columns }, usePagination)

  const fetchNextPageOrders = () => {
    dispatch(fetchAllOrders({ partnerId, sortBy: '-createdAt', limit: '10', page: page + 1, status }))
  }
  const fetchPreviousPageOrders = () => {
    dispatch(fetchAllOrders({ partnerId, sortBy: '-createdAt', limit: '10', page: page - 1, status }))
  }


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
                <Tr {...row.getRowProps()} borderTopWidth={1} borderBottomWidth={1} bg={'white'}>
                  {
                    row.cells.map(cell => {
                      return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    })
                  }

                  <Td>
                    {row.original?.status !== "CANCELLED" && <Flex justify={"flex-end"}>
                      <Menu>
                        <MenuButton >
                          <FiMoreHorizontal />
                        </MenuButton>
                        <MenuList minWidth="10rem">
                          {
                            row.original?.status === "PENDING" ? <MenuItem onClick={() => dispatch(updateOrderStatusAction({ orderId: row?.original?._id, status: "ACCEPTED" }))}>Accept</MenuItem> : row.original?.status === "ACCEPTED" ? <MenuItem onClick={() => dispatch(updateOrderStatusAction({ orderId: row?.original?._id, status: "COMPLETED" }))}>Complete</MenuItem> : ""
                          }
                          {
                            row.original?.status === "COMPLETED" ? '' : <MenuItem color={'red'} onClick={() => dispatch(updateOrderStatusAction({ orderId: row?.original?._id, status: "CANCELLED" }))}>Cancel</MenuItem>
                          }
                        </MenuList>
                      </Menu>
                    </Flex>}

                  </Td>
                </Tr>
              )
            })
          }
        </Tbody>
        <Tfoot bg="white">
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th width="10rem">
              <Flex justify={"flex-end"} align="center" gap={2}>
                <Text>{1 + ((Number(page) - 1) * Number(limit))} - {Number(page) * Number(limit) < totalResults ? Number(page) * Number(limit) : totalResults}  of {totalResults}</Text>
                <Flex gap={1}>
                  <Button size="sm" onClick={fetchPreviousPageOrders} disabled={page === 1}>
                    <FiChevronLeft />
                  </Button>
                  <Button size="sm" onClick={fetchNextPageOrders} disabled={page === totalPages}>
                    <FiChevronRight />
                  </Button>
                </Flex>
              </Flex>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

function compareProps(prevProps, nextProps) {
  return isEqual(prevProps, nextProps)
}

export default memo(OrderTable, compareProps)