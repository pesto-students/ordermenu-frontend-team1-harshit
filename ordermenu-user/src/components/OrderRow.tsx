import React, { useState } from 'react'
import { Flex, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

import OrderDetailsModal from './OrderDetailsModal'

const OrderRow = ({ row }) => {
    const dispatch = useDispatch()
    const [isOrderOpen, setIsOrderOpen] = useState(false)

    return (
        <Tr {...row.getRowProps()} borderTopWidth={1} borderBottomWidth={1} bg={'white'}>
            {
                row.cells.map((cell, index) => {
                    return <Td key={index} {...cell.getCellProps()} cursor="pointer" onClick={() => setIsOrderOpen(true)}>{cell.render('Cell')}</Td>
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
                        </MenuList>
                    </Menu>
                </Flex>}
            </Td>
            <OrderDetailsModal order={row.original} isOrderOpen={isOrderOpen} setIsOrderOpen={setIsOrderOpen} />
        </Tr>
    )
}

export default OrderRow