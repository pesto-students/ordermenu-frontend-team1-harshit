import React, { useState } from 'react'
import { Flex, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

import { updateOrderStatusAction } from '../../../store/orderSlice'
import OrderDetailsModal from './OrderDetailsModal'

const OrderRow = ({ row }) => {
    const dispatch = useDispatch()
    const [isOrderOpen, setIsOrderOpen] = useState(false)

    return (
        <Tr {...row.getRowProps()} borderTopWidth={1} borderBottomWidth={1} bg={'white'}>
            {
                row.cells.map(cell => {
                    return <Td {...cell.getCellProps()} cursor="pointer" onClick={() => setIsOrderOpen(true)}>{cell.render('Cell')}</Td>
                })
            }

            <Td>
                {row.original?.status !== "CANCELLED" && <Flex justify={"flex-end"}>
                    <Menu>
                        <MenuButton >
                            <FiMoreHorizontal />
                        </MenuButton>
                        <MenuList minWidth="10rem">
                            <MenuItem onClick={() => setIsOrderOpen(true)}>View</MenuItem>
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
            <OrderDetailsModal order={row.original} isOrderOpen={isOrderOpen} setIsOrderOpen={setIsOrderOpen} />
        </Tr>
    )
}

export default OrderRow